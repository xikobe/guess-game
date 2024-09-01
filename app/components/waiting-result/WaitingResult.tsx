import { useUser } from '@/app/shared/hooks/useUser';
import { Countdown } from './Countdown';

export const WaitingResult = (): JSX.Element | null => {
    const { currentGuess, guessPrice } = useUser();

    if (!currentGuess) {
        return null;
    }

    return (
        <div data-testid="wait-result">
            <p className="text-2xl mb-4">
                {"You're betting the the price will be "}
                {currentGuess === 'up' ? (
                    <span className="font-extrabold text-green-500">
                        higher
                    </span>
                ) : (
                    <span className="font-extrabold text-red-500">lower</span>
                )}{' '}
                than <span className="font-extrabold">${guessPrice}</span>!
            </p>
            <Countdown />
        </div>
    );
};
