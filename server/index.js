const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const { questions } = require('./content');
const os = require('os');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://word-crush-game-vert.vercel.app"
        ],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Game State
let gameState = {
    status: 'LOBBY', // LOBBY, PLAYING, ENDED
    players: {}, // { socketId: { name: '...', score: 0 } }
    currentWord: null,
    startTime: null,
    winner: null,
    lobbyTimer: 30,
    lobbyInterval: null
};

// Helper to get local IP
const getLocalIp = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
};

const SERVER_IP = getLocalIp();

// Helper to broadcast state
const broadcastState = () => {
    // Create a copy and remove internal objects like intervals
    const { lobbyInterval, ...sanitizedState } = gameState;
    // Add server IP for client QR codes
    sanitizedState.serverIp = SERVER_IP;
    io.emit('gameState', sanitizedState);
};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Send initial state
    const { lobbyInterval, ...sanitizedState } = gameState;
    sanitizedState.serverIp = SERVER_IP;
    socket.emit('gameState', sanitizedState);

    // Join Game
    socket.on('join', (name) => {
        gameState.players[socket.id] = { name, score: 0 };
        broadcastState();
    });

    // Admin Controls
    socket.on('adminStartLobby', () => {
        gameState.status = 'LOBBY';
        gameState.winner = null;
        gameState.currentWord = null;
        gameState.lobbyTimer = 30;

        if (gameState.lobbyInterval) clearInterval(gameState.lobbyInterval);

        gameState.lobbyInterval = setInterval(() => {
            gameState.lobbyTimer--;
            if (gameState.lobbyTimer <= 0) {
                clearInterval(gameState.lobbyInterval);
                gameState.lobbyInterval = null;
                startGame();
            }
            broadcastState();
        }, 1000);

        broadcastState();
    });

    socket.on('adminReset', () => {
        gameState.status = 'LOBBY';
        gameState.players = {};
        gameState.winner = null;
        gameState.currentWord = null;
        if (gameState.lobbyInterval) clearInterval(gameState.lobbyInterval);
        gameState.lobbyTimer = 30;
        broadcastState();
    });

    // Player Actions
    socket.on('submitGuess', (guess) => {
        if (gameState.status !== 'PLAYING') return;

        // Check if guess is correct (simple check for now)
        if (gameState.currentWord && guess.toUpperCase() === gameState.currentWord.word.toUpperCase()) {
            gameState.winner = gameState.players[socket.id]?.name || 'Unknown';
            gameState.status = 'ENDED';
            io.emit('gameEnded', { winner: gameState.winner });
            broadcastState();
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        delete gameState.players[socket.id];
        broadcastState();
    });

    socket.on('requestState', () => {
        const { lobbyInterval, ...sanitizedState } = gameState;
        sanitizedState.serverIp = SERVER_IP;
        socket.emit('gameState', sanitizedState);
    });
});

const startGame = () => {
    gameState.status = 'PLAYING';
    // Pick a random question
    const randomIndex = Math.floor(Math.random() * questions.length);
    gameState.currentWord = questions[randomIndex];
    broadcastState();
};

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
