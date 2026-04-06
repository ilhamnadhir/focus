import React from 'react';
import { motion } from 'framer-motion';
import { useEnergy, LEVEL_THRESHOLDS } from '../contexts/EnergyContext';

const Garden = () => {
    const { totalEnergy, currentLevel, nextLevelThreshold, progressToNextLevel } = useEnergy();

    const energyForNextLevel   = nextLevelThreshold ? nextLevelThreshold - LEVEL_THRESHOLDS[currentLevel] : 0;
    const energyInCurrentLevel = totalEnergy - LEVEL_THRESHOLDS[currentLevel];

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-start overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0a0f1e 0%, #0d1a2f 55%, #112240 100%)' }}
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center pt-10 pb-4 z-10 relative"
            >
                <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
                    🌳 Your Growth Tree
                </h1>
                <p className="text-blue-200/70 text-lg">
                    Focus sessions nurture your tree. Keep going!
                </p>
            </motion.div>

            {/* Tree area */}
            <div className="relative w-full flex-1 flex flex-col items-center justify-center" style={{ minHeight: '55vh' }}>

                {/* Ambient ground glow */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                        width: '60%',
                        height: '200px',
                        background: 'radial-gradient(ellipse at center bottom, rgba(100,200,120,0.18) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                    }}
                />

                {/* Tree image */}
                <motion.div
                    key={currentLevel}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="relative z-10 flex flex-col items-center"
                >
                    <img
                        src={`/assets/${currentLevel}.png`}
                        alt={`Tree Level ${currentLevel}`}
                        style={{
                            maxHeight: '52vh',
                            maxWidth: '88vw',
                            objectFit: 'contain',
                            filter: `
                                drop-shadow(0 0 40px rgba(120,220,140,0.30))
                                drop-shadow(0 30px 60px rgba(0,0,0,0.6))
                                brightness(1.1)
                                saturate(1.2)
                            `,
                        }}
                    />

                    {/* Level badge */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.35 }}
                        className="absolute -top-4 right-2 text-white text-sm font-bold px-4 py-1 rounded-full shadow-xl"
                        style={{ background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)' }}
                    >
                        Level {currentLevel}
                    </motion.div>
                </motion.div>
            </div>

            {/* Energy stats card */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative z-10 w-full max-w-2xl px-6 pb-10"
            >
                <div
                    className="rounded-2xl p-6 space-y-4"
                    style={{
                        background: 'rgba(15,25,50,0.80)',
                        border: '1px solid rgba(100,150,255,0.18)',
                        backdropFilter: 'blur(16px)',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                    }}
                >
                    {/* Energy numbers */}
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-xs text-blue-300/60 uppercase tracking-wider mb-1">Total Energy</div>
                            <div className="text-3xl font-bold text-amber-400">
                                {totalEnergy.toLocaleString()} ⚡
                            </div>
                        </div>
                        {currentLevel < 10 ? (
                            <div className="text-right">
                                <div className="text-xs text-blue-300/60 uppercase tracking-wider mb-1">Next Level</div>
                                <div className="text-2xl font-bold text-white">
                                    {energyInCurrentLevel.toLocaleString()} / {energyForNextLevel.toLocaleString()}
                                </div>
                            </div>
                        ) : (
                            <div className="text-right">
                                <div className="text-2xl font-bold text-emerald-400">✨ Fully Grown!</div>
                            </div>
                        )}
                    </div>

                    {/* Progress bar */}
                    {currentLevel < 10 && (
                        <div>
                            <div className="flex justify-between text-xs text-blue-300/50 mb-1.5">
                                <span>Lvl {currentLevel}</span>
                                <span>Lvl {currentLevel + 1}</span>
                            </div>
                            <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: 'linear-gradient(90deg, #ff6b6b, #ffa040, #ffe066)' }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressToNextLevel}%` }}
                                    transition={{ duration: 1.2, ease: 'easeOut' }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Level milestone grid */}
                    <div className="grid grid-cols-5 gap-2 pt-1">
                        {LEVEL_THRESHOLDS.slice(1).map((threshold, idx) => {
                            const lvl    = idx + 1;
                            const reached = currentLevel >= lvl;
                            return (
                                <div
                                    key={lvl}
                                    className={`text-center p-2 rounded-xl text-xs font-semibold transition-all ${
                                        reached ? 'text-white shadow-lg' : 'text-blue-300/40'
                                    }`}
                                    style={reached
                                        ? { background: 'linear-gradient(135deg, #ff6b6b88, #ff8e5388)', border: '1px solid rgba(255,140,100,0.4)' }
                                        : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(100,150,255,0.1)' }
                                    }
                                >
                                    <div>Lv {lvl}</div>
                                    <div className="opacity-70">
                                        {threshold >= 1000
                                            ? `${(threshold / 1000).toFixed(threshold < 10000 ? 1 : 0)}k`
                                            : threshold}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Garden;
