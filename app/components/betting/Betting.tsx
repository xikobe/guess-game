'use client';

import { useUser } from '@/app/shared/hooks/useUser';
import { Button } from '@/components/ui/button';
// import { useBTCPrice } from '../btc-price/hooks/useBTCPrice';
import {
    GAME_STEP,
    useGameLoopContext,
} from '@/app/shared/contexts/GameLoopContext';
import { Countdown } from './Countdown';

export const Betting = (): JSX.Element => {
    const { currentUser, currentScore } = useUser();
    // const { data: btcPrice } = useBTCPrice();
    const { step, makeBet } = useGameLoopContext();

    async function handleOnClick(guess: 'up' | 'down') {
        makeBet(guess);
    }

    if (step === GAME_STEP.WAIT_RESULT) {
        return (
            <div>
                {/* <p className="text-2xl mb-2">You're betting the the price will be {
          currentGuess === 'up' ? <span className="font-extrabold text-green-500">higher</span> : <span className="font-extrabold text-red-500">lower</span>
        } than <span className="font-extrabold">${currentBetPrice}</span>!</p> */}
                <Countdown />
            </div>
        );
    }

    return (
        <div className="flex-col">
            <div className="mb-4">
                <p className="text-4xl">
                    Hello {currentUser}, your score is:{' '}
                    <span className="text-purple-800 font-extrabold">
                        {currentScore}
                    </span>{' '}
                </p>
            </div>
            <div className="flex">
                <div className="mr-8">
                    <Button
                        className="bg-green-500 hover:bg-green-400"
                        onClick={() => handleOnClick('up')}
                    >
                        Go up
                    </Button>
                </div>
                <div>
                    <Button
                        variant="destructive"
                        onClick={() => handleOnClick('down')}
                    >
                        Go down
                    </Button>
                </div>
            </div>
        </div>
    );
};
