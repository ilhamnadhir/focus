import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Energy required to reach each level (cumulative thresholds)
// Level 0 → 1: 100, 1→2: 250, 2→3: 500, ..., 9→10: 5000 (cumulative)
export const LEVEL_THRESHOLDS = [
    0,      // Level 0 (start)
    100,    // Level 1
    350,    // Level 2
    750,    // Level 3
    1400,   // Level 4
    2300,   // Level 5
    3500,   // Level 6
    5000,   // Level 7
    7000,   // Level 8
    9500,   // Level 9
    12500,  // Level 10 (max)
];

// Energy earned per minute of focused work
const ENERGY_PER_MINUTE = 4;

const EnergyContext = createContext(null);

export const EnergyProvider = ({ children }) => {
    const { user } = useAuth();

    const storageKey = user ? `treeEnergy_${user.uid}` : 'treeEnergy_guest';

    const [totalEnergy, setTotalEnergy] = useState(() => {
        try {
            return parseInt(localStorage.getItem(storageKey) || '0', 10);
        } catch {
            return 0;
        }
    });

    // Reload from storage when user changes
    useEffect(() => {
        try {
            const stored = parseInt(localStorage.getItem(storageKey) || '0', 10);
            setTotalEnergy(stored);
        } catch {
            setTotalEnergy(0);
        }
    }, [storageKey]);

    // Persist whenever energy changes
    useEffect(() => {
        try {
            localStorage.setItem(storageKey, String(totalEnergy));
        } catch {
            // ignore
        }
    }, [storageKey, totalEnergy]);

    const currentLevel = LEVEL_THRESHOLDS.reduce((lvl, threshold, idx) => {
        return totalEnergy >= threshold ? idx : lvl;
    }, 0);

    const nextLevelThreshold = LEVEL_THRESHOLDS[currentLevel + 1] ?? null;
    const progressToNextLevel = nextLevelThreshold
        ? ((totalEnergy - LEVEL_THRESHOLDS[currentLevel]) /
           (nextLevelThreshold - LEVEL_THRESHOLDS[currentLevel])) * 100
        : 100;

    /**
     * Award energy for a completed focus session.
     * @param {number} durationSeconds  — length of the focus session in seconds
     */
    const awardEnergy = useCallback((durationSeconds) => {
        const earned = Math.round((durationSeconds / 60) * ENERGY_PER_MINUTE);
        setTotalEnergy((prev) => Math.min(prev + earned, LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]));
        return earned;
    }, []);

    return (
        <EnergyContext.Provider value={{
            totalEnergy,
            currentLevel,
            nextLevelThreshold,
            progressToNextLevel,
            awardEnergy,
            LEVEL_THRESHOLDS,
        }}>
            {children}
        </EnergyContext.Provider>
    );
};

export const useEnergy = () => {
    const ctx = useContext(EnergyContext);
    if (!ctx) throw new Error('useEnergy must be used inside EnergyProvider');
    return ctx;
};
