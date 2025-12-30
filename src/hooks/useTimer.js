import { useState, useEffect, useRef } from 'react';

const useTimer = (initialTime, onComplete) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning && !isPaused && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        setIsPaused(false);
                        if (onComplete) onComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, isPaused, timeLeft, onComplete]);

    const start = () => {
        setIsRunning(true);
        setIsPaused(false);
    };

    const pause = () => {
        setIsPaused(true);
    };

    const resume = () => {
        setIsPaused(false);
    };

    const reset = (newTime) => {
        setIsRunning(false);
        setIsPaused(false);
        setTimeLeft(newTime || initialTime);
    };

    const progress = ((initialTime - timeLeft) / initialTime) * 100;

    return {
        timeLeft,
        isRunning,
        isPaused,
        progress,
        start,
        pause,
        resume,
        reset,
    };
};

export default useTimer;
