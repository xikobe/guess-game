'use client';

import { fetchStatus } from '@/lib/api';
import { useGameLoopContext } from '@/app/shared/contexts/GameLoopContext';
import { useUser } from '@/app/shared/hooks/useUser';
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

export const Countdown = (): JSX.Element => {
    const { resolveBet } = useGameLoopContext();
    const { currentUser } = useUser();
    const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
    const [guessTime, setGuessTime] = useState(null);

    useEffect(() => {
        // Fetch the user's current bet status, including guessTime
        const fetchBettingStatus = async () => {
            try {
                const response = await fetchStatus(currentUser);

                setGuessTime(response.guessTime);
            } catch (error) {
                console.error('Error fetching betting status:', error);
            }
        };

        if (currentUser) fetchBettingStatus();
    }, [currentUser]);

    useEffect(() => {
        if (guessTime) {
            const interval = setInterval(() => {
                calculateTimeLeft(guessTime);
            }, 1000);

            // Cleanup interval on component unmount
            return () => clearInterval(interval);
        }
    }, [guessTime]);

    const calculateTimeLeft = (guessTime: number) => {
        const currentTime = Date.now();
        const timePassed = Math.floor((currentTime - guessTime) / 1000);
        const timeLeft = 60 - timePassed;

        if (timeLeft > 0) {
            setSecondsLeft(timeLeft);
        } else {
            setSecondsLeft(0);
            resolveBet();
        }
    };

    return (
        <div>
            {secondsLeft !== null && (
                <>
                    <Progress value={(secondsLeft / 60) * 100} />
                    <p>{`Result in: ${secondsLeft} seconds`}</p>
                </>
            )}
        </div>
    );
};
