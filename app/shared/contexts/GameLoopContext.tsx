'use client';

import { useEffect, createContext, useState, useContext } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { useUser } from '../hooks/useUser';
import { useBTCPrice } from '@/app/components/btc-price/hooks/useBTCPrice';
import { resolveGuess, submitGuess } from '@/lib/query/api';

const queryClient = new QueryClient();

export enum GAME_STEP {
    'WAIT_USER' = 'WAIT_USER',
    'WAIT_BET' = 'WAIT_BET',
    'WAIT_RESULT' = 'WAIT_RESULT',
    'SHOW_RESULT' = 'SHOW_RESULT',
}

type Step = GAME_STEP | null | undefined;
type GameLoopContextProps = {
    isLoading: boolean;
    step: Step;
    setStep: (step: Step) => void;
    makeBet: (guess: 'up' | 'down') => void;
    resolveBet: () => void;
};

const GameLoopContext = createContext<GameLoopContextProps>(
    {} as GameLoopContextProps
);

export const useGameLoopContext = () => useContext(GameLoopContext);

type GameLoopProviderProps = {
    children: React.ReactNode;
};

const GameLoopProvider = ({ children }: GameLoopProviderProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [step, setStep] = useState<GAME_STEP | null>();
    const { currentUser } = useUser();
    const { data: btcPrice } = useBTCPrice();

    const makeBet = async (guess: 'up' | 'down') => {
        await submitGuess(currentUser, guess);

        setStep(GAME_STEP.WAIT_RESULT);
    };

    const resolveBet = async () => {
        const QUERY_KEY = 'user_score';
        await resolveGuess(currentUser);
        queryClient.removeQueries({ queryKey: [QUERY_KEY] });

        setStep(GAME_STEP.SHOW_RESULT);
    };

    const checkUser = async () => {
        if (!currentUser) {
            setStep(GAME_STEP.WAIT_USER);
            setIsLoaded(true);
        } else {
            checkInProgressBet();
        }
    };

    const checkInProgressBet = async () => {
        const bet = await resolveGuess(currentUser);
        if (!bet.inProgress) {
            setStep(GAME_STEP.WAIT_BET);
        } else {
            setStep(GAME_STEP.WAIT_RESULT);
        }
        setIsLoaded(true);
    };

    useEffect(() => {
        if (btcPrice) {
            checkUser();
        }
    }, [btcPrice, currentUser]);

    if (!isLoaded) {
        return 'Loading dudes...';
    }

    return (
        <GameLoopContext.Provider
            value={{ step, setStep, isLoading: !isLoaded, makeBet, resolveBet }}
        >
            {children}
        </GameLoopContext.Provider>
    );
};

export { GameLoopProvider, GameLoopContext };
