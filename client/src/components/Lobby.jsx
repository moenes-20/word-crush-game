import React from 'react';

const Lobby = ({ gameState, isPlayer }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-indigo-900 text-white p-4">
            <h1 className="text-4xl font-bold mb-8 animate-pulse">Waiting for Players...</h1>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full max-w-2xl text-center mb-8">
                <h2 className="text-2xl font-semibold mb-4">Time until start</h2>
                <div className="text-6xl font-mono font-bold text-yellow-400">
                    {gameState.lobbyTimer}s
                </div>
            </div>

            <div className="w-full max-w-2xl">
                <h3 className="text-xl mb-4 text-gray-300">Players Joined ({Object.keys(gameState.players).length})</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                    {Object.values(gameState.players).map((player, idx) => (
                        <div key={idx} className="bg-purple-600 px-4 py-2 rounded-full font-medium shadow-lg animate-bounce" style={{ animationDelay: `${idx * 0.1}s` }}>
                            {player.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Lobby;
