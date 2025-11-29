import React from 'react';
import { motion } from 'framer-motion';

const Winner = ({ winner }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent z-0"></div>

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="z-10 text-center"
            >
                <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">
                    CONGRATULATIONS!
                </h1>

                <div className="relative inline-block mt-8">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 2, -2, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-6xl md:text-8xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500"
                        style={{ WebkitTextStroke: '2px white' }}
                    >
                        {winner}
                    </motion.div>

                    {/* Flame particles (simplified CSS/Motion) */}
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bottom-0 left-1/2 w-4 h-4 bg-orange-500 rounded-full blur-sm"
                            animate={{
                                y: -100 - Math.random() * 100,
                                x: (Math.random() - 0.5) * 100,
                                opacity: [1, 0],
                                scale: [1, 0]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 1 + Math.random(),
                                delay: Math.random() * 0.5
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Winner;
