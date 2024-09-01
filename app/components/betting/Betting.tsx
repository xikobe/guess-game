'use client';

import { useUser } from '@/app/shared/hooks/useUser';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useGameLoopContext } from '@/app/shared/contexts/GameLoopContext';
import { useState } from 'react';

export const Betting = (): JSX.Element => {
    const { currentUser, currentScore } = useUser();
    const { makeBet } = useGameLoopContext();
    const [isLoading, setIsLoading] = useState({ up: false, down: false });

    async function handleOnClick(guess: 'up' | 'down') {
        setIsLoading({ ...isLoading, [guess]: true });
        await makeBet(guess);
        setIsLoading({ ...isLoading, [guess]: false });
    }

    return (
        <div className="flex-col" data-testid="betting">
            <div className="mb-8">
                <p className="text-4xl">
                    Hello {currentUser}, your score is:{' '}
                    <span className="text-purple-800 font-extrabold">
                        {currentScore}
                    </span>{' '}
                </p>
            </div>
            <div className="mb-4">
                <p className="text-4xl">{"What's your bet?"}</p>
            </div>
            <div className="flex">
                <div className="mr-8">
                    <Button
                        className="bg-green-500 hover:bg-green-400"
                        onClick={() => handleOnClick('up')}
                    >
                        {isLoading.up ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        To the moon 🚀
                    </Button>
                </div>
                <div>
                    <Button
                        className="bg-red-500 hover:bg-red-400"
                        onClick={() => handleOnClick('down')}
                    >
                        {isLoading.down ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Going down 🍔
                    </Button>
                </div>
            </div>
        </div>
    );
};
