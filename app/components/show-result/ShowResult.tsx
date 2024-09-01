import { useGameLoopContext } from '@/app/shared/contexts/GameLoopContext';
import { useUser } from '@/app/shared/hooks/useUser';
import { Button } from '@/components/ui/button';

export const ShowResult = () => {
    const { betWon, restart } = useGameLoopContext();
    const { currentScore } = useUser();

    return (
        <div data-testid="show-result">
            <div>
                <p className="text-4xl font-black mb-8">
                    {betWon
                        ? "Congrats! Here's your prize 💰"
                        : 'Better luck next time, 1 point lost!'}
                </p>
                <p className="mb-4 text-4xl">
                    Your score is {currentScore} points
                </p>
                <div>
                    <Button onClick={restart}>Try again!</Button>
                </div>
            </div>
        </div>
    );
};
