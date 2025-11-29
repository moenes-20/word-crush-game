import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import QRCode from 'qrcode';
import Lobby from '../components/Lobby';
import Winner from '../components/Winner';

const Admin = () => {
    const socket = useSocket();
    const [gameState, setGameState] = useState(null);
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    useEffect(() => {
        if (socket) {
            socket.emit('requestState');
        }
    }, [socket]);

    const startLobby = () => {
        socket.emit('adminStartLobby');
    };

    const resetGame = () => {
        socket.emit('adminReset');
    };

    if (!socket) return <div>Connecting...</div>;
    if (!gameState) return <div>Waiting for server state...</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                <div className="space-x-4">
                    <button onClick={startLobby} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Start Lobby</button>
                    <button onClick={resetGame} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Reset Game</button>
                </div>
            </header>

            <main className="flex-1 p-8 flex gap-8">
                {/* Sidebar with QR and Status */}
                <div className="w-1/3 bg-white p-6 rounded-xl shadow-lg h-fit">
                    <h2 className="text-lg font-semibold mb-4">Join Game</h2>
                    {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="w-full mb-4" />}
                    <p className="text-center text-gray-600 break-all mb-2">{window.location.href.replace('/admin', '')}</p>
                    <p className="text-xs text-red-500 text-center">
                        IMPORTANT: If playing on mobile, make sure this URL uses your computer's IP address (e.g. 192.168.x.x), NOT "localhost".
                    </p>

                    <div className="mt-8">
                        <h3 className="font-bold mb-2">Game Status: <span className="text-blue-600">{gameState.status}</span></h3>
                        <h3 className="font-bold mb-2">Players: {Object.keys(gameState.players).length}</h3>
                    </div>
                </div>

                {/* Live View */}
                <div className="flex-1 bg-gray-800 rounded-xl overflow-hidden shadow-2xl relative">
                    <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">Live View</div>

                    {/* Render the appropriate screen based on state */}
                    <div className="h-full transform scale-90 origin-top">
                        {gameState.status === 'LOBBY' && <Lobby gameState={gameState} isPlayer={false} />}
                        {gameState.status === 'PLAYING' && (
                            <div className="flex flex-col items-center justify-center h-full text-white">
                                <h2 className="text-3xl mb-8">Current Word: <span className="text-yellow-400 font-mono blur-md hover:blur-none transition-all duration-300 cursor-pointer">{gameState.currentWord?.word}</span></h2>
                                <p className="text-xl max-w-2xl text-center bg-gray-700 p-6 rounded">{gameState.currentWord?.definition}</p>
                            </div>
                        )}
                        {gameState.status === 'ENDED' && <Winner winner={gameState.winner} />}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Admin;
