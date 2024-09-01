'use client';

import { useEffect, createContext, useState, useContext } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { USE_USER_QUERY_KEY, useUser } from '../hooks/useUser';
import { useBTCPrice } from '@/app/components/btc-price/hooks/useBTCPrice';
import { resolveGuess, submitGuess } from '@/lib/api';

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
    betWon: boolean | null;
    resolveBet: () => void;
    restart: () => void;
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
    const [betWon, setIsBetWon] = useState<boolean | null>(null);
    const [step, setStep] = useState<GAME_STEP | null>();
    const { currentUser, currentScore } = useUser();
    const { data: btcPrice } = useBTCPrice();

    const makeBet = async (guess: 'up' | 'down') => {
        await submitGuess(currentUser, guess);

        setStep(GAME_STEP.WAIT_RESULT);
    };

    const restart = () => {
        setStep(GAME_STEP.WAIT_BET);
    };

    const resolveBet = async () => {
        const QUERY_KEY = USE_USER_QUERY_KEY;
        const response = await resolveGuess(currentUser);

        setIsBetWon(response.user.score > currentScore);

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
        if (!bet.inProgress && step !== GAME_STEP.SHOW_RESULT) {
            setStep(GAME_STEP.WAIT_BET);
        } else {
            setStep(GAME_STEP.WAIT_RESULT);
        }
        setIsLoaded(true);
    };

    useEffect(() => {
        if (btcPrice && !step) {
            checkUser();
        }
    }, [btcPrice, currentUser]);

    if (!isLoaded) {
        return 'Loading ...';
    }

    return (
        <GameLoopContext.Provider
            value={{
                betWon,
                step,
                setStep,
                isLoading: !isLoaded,
                makeBet,
                resolveBet,
                restart,
            }}
        >
            {children}
        </GameLoopContext.Provider>
    );
};

export { GameLoopProvider, GameLoopContext };
