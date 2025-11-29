import React from 'react';
import { motion } from 'framer-motion';

const Winner = ({ winner }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 text-white p-4">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="text-center"
            >
                <motion.h1
                    className="text-6xl font-bold mb-8"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    🎉 Winner! 🎉
                </motion.h1>

                <motion.div
                    className="bg-white/20 backdrop-blur-md rounded-2xl p-12 shadow-2xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <h2 className="text-4xl font-bold mb-4">Congratulations!</h2>
                    <p className="text-5xl font-mono font-bold text-yellow-300">{winner}</p>
                </motion.div>

                <motion.div
                    className="mt-12 text-2xl"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    Waiting for next round...
                </motion.div>
            </motion.div>

            {/* Confetti effect */}
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: -20,
                            opacity: 1
                        }}
                        animate={{
                            y: window.innerHeight + 20,
                            opacity: 0
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Winner;
