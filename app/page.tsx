'use client';

import { useUser } from './shared/hooks/useUser';
import { UserForm } from './components/user-form/UserForm';
import { Betting } from './components/betting/Betting';
import { BTCPrice } from './components/btc-price/BtcPrice';
import {
    GAME_STEP,
    useGameLoopContext,
} from './shared/contexts/GameLoopContext';

export default function Home() {
    const { setCurrentUser } = useUser();
    const { step, setStep } = useGameLoopContext();

    function handleOnSetUser(user: string) {
        setCurrentUser(user);
        setStep(GAME_STEP.WAIT_BET);
    }

    return (
        <main className="flex min-h-screen flex-col items-left p-24">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-16">
                Can you guess future BTC price? <br />
                Place your bets!
            </h1>
            <div className="flex mb-16">
                <span>$</span>
                <BTCPrice />
            </div>
            {step === GAME_STEP.WAIT_USER ? (
                <UserForm onSubmit={handleOnSetUser} />
            ) : (
                <Betting />
            )}
        </main>
    );
}
