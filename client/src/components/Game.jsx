import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Game = ({ gameState, socket }) => {
    const [guess, setGuess] = useState('');
    const [shuffledLetters, setShuffledLetters] = useState([]);
    const [availableIndices, setAvailableIndices] = useState([]); // Indices of letters not yet used

    useEffect(() => {
        if (gameState.currentWord) {
            const word = gameState.currentWord.word.toUpperCase();
            // Create an array of letters with unique IDs to handle duplicate letters
            const letters = word.split('').map((char, index) => ({
                id: `${char}-${index}`,
                char: char
            }));

            // Shuffle
            for (let i = letters.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [letters[i], letters[j]] = [letters[j], letters[i]];
            }

            setShuffledLetters(letters);
            setAvailableIndices(letters.map((_, i) => i));
            setGuess('');
        }
    }, [gameState.currentWord]);

    const handleLetterClick = (index) => {
        if (!availableIndices.includes(index)) return;

        const letter = shuffledLetters[index];
        setGuess(prev => prev + letter.char);
        setAvailableIndices(prev => prev.filter(i => i !== index));
    };

    const handleBackspace = () => {
        if (guess.length === 0) return;

        const lastChar = guess[guess.length - 1];
        setGuess(prev => prev.slice(0, -1));

        // Find the index of the last used letter that matches this char
        // We need to be careful to restore the correct instance if there are duplicates
        // But for simplicity, restoring *any* matching unavailable letter is okay visually,
        // though strictly we should track the stack of indices.

        // Better approach: Track the stack of indices used.
    };

    // Let's refactor to track used indices stack for perfect backspacing
    const [usedIndicesStack, setUsedIndicesStack] = useState([]);

    const handleLetterClickWithStack = (index) => {
        if (usedIndicesStack.includes(index)) return;

        const letter = shuffledLetters[index];
        setGuess(prev => prev + letter.char);
        setUsedIndicesStack(prev => [...prev, index]);
    };

    const handleBackspaceWithStack = () => {
        if (usedIndicesStack.length === 0) return;

        const lastIndex = usedIndicesStack[usedIndicesStack.length - 1];
        setUsedIndicesStack(prev => prev.slice(0, -1));
        setGuess(prev => prev.slice(0, -1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('submitGuess', guess);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
            <div className="mb-8 text-center">
                <h2 className="text-xl text-gray-400 mb-2">Definition:</h2>
                <p className="text-2xl font-semibold max-w-lg">{gameState.currentWord?.definition}</p>
            </div>

            {/* Guess Display */}
            <div className="flex items-center gap-2 mb-8 min-h-[60px]">
                {guess.split('').map((char, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg"
                    >
                        {char}
                    </motion.div>
                ))}
                {guess.length === 0 && <span className="text-gray-600 italic">Tap letters to form word</span>}
            </div>

            {/* Letters Grid */}
            <div className="flex flex-wrap justify-center gap-3 max-w-md mb-8">
                {shuffledLetters.map((item, index) => {
                    const isUsed = usedIndicesStack.includes(index);
                    return (
                        <motion.button
                            key={item.id}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => !isUsed && handleLetterClickWithStack(index)}
                            disabled={isUsed}
                            className={`w-14 h-14 rounded-xl text-2xl font-bold shadow-md transition-all duration-200 
                                ${isUsed
                                    ? 'bg-gray-700 text-gray-500 opacity-50 cursor-default'
                                    : 'bg-white text-gray-900 hover:bg-gray-100 active:bg-gray-200'}`}
                        >
                            {item.char}
                        </motion.button>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="flex gap-4">
                <button
                    onClick={handleBackspaceWithStack}
                    disabled={guess.length === 0}
                    className="px-6 py-3 bg-red-500 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition"
                >
                    ⌫ Backspace
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={guess.length === 0}
                    className="px-6 py-3 bg-green-500 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition"
                >
                    Submit Guess
                </button>
            </div>
        </div>
    );
};

export default Game;
