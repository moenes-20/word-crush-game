import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import Lobby from '../components/Lobby';
import Game from '../components/Game';
import Winner from '../components/Winner';

const Player = () => {
    const socket = useSocket();
    const [name, setName] = useState('');
    const [joined, setJoined] = useState(false);
    const [gameState, setGameState] = useState(null);

    useEffect(() => {
        if (!socket) return;

        socket.on('gameState', (state) => {
            setGameState(state);
        });

        // Request state in case we missed the initial packet
        socket.emit('requestState');

        return () => {
            socket.off('gameState');
        };
    }, [socket]);

    useEffect(() => {
        if (!gameState && socket) {
            const interval = setInterval(() => {
                socket.emit('requestState');
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [gameState, socket]);

    const handleJoin = (e) => {
        e.preventDefault();
        if (name.trim() && socket) {
            socket.emit('join', name);
            setJoined(true);
        }
    };

    if (!socket) return <div className="flex items-center justify-center h-screen text-white bg-gray-900">Connecting...</div>;

    if (!joined) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Words Crush</h1>
                    <form onSubmit={handleJoin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Enter your name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                                placeholder="Student Name"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                        >
                            Join Game
                        </button>
                    </form>
                </div>
            </div>
        );
    }



    if (!gameState) return (
        <div className="flex flex-col items-center justify-center h-screen text-white bg-gray-900 gap-4">
            <p>Waiting for server...</p>
            <button
                onClick={() => socket?.emit('requestState')}
                className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition"
            >
                Retry Connection
            </button>
        </div>
    );

    if (gameState.status === 'LOBBY') {
        return <Lobby gameState={gameState} isPlayer={true} />;
    }

    if (gameState.status === 'PLAYING') {
        return <Game gameState={gameState} socket={socket} />;
    }

    if (gameState.status === 'ENDED') {
        return <Winner winner={gameState.winner} />;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
            <h2 className="text-xl text-red-500 font-bold mb-4">Error: Unknown Game Status</h2>
            <pre className="bg-gray-800 p-4 rounded text-xs overflow-auto max-w-full">
                {JSON.stringify(gameState, null, 2)}
            </pre>
            <div className="fixed bottom-2 right-2 opacity-50 hover:opacity-100">
                <a href="/admin" className="text-xs text-white underline">Admin</a>
            </div>
        </div>
    );
};

export default Player;
