import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from './page';
import { useUser } from '@/app/shared/hooks/useUser';
import { useBTCPrice } from '@/app/components/btc-price/hooks/useBTCPrice';
import {
    useGameLoopContext,
    GAME_STEP,
} from './shared/contexts/GameLoopContext';

// Mock the useUser and useGameLoopContext hooks
vi.mock('@/app/shared/hooks/useUser');
vi.mock('@/app/shared/contexts/GameLoopContext');
vi.mock('@/app/components/btc-price/hooks/useBTCPrice');

describe('Home Component', () => {
    // Mock functions to be used in the hooks
    const mockSetCurrentUser = vi.fn();
    const mockSetStep = vi.fn();

    beforeEach(() => {
        // Reset mocks before each test
        mockSetCurrentUser.mockClear();
        mockSetStep.mockClear();

        // Mock implementation of the hooks
        (useUser as vi.Mock).mockReturnValue({
            setCurrentUser: mockSetCurrentUser,
        });
        (useBTCPrice as vi.Mock).mockReturnValue({
            data: 50000,
        });
        (useGameLoopContext as vi.Mock).mockReturnValue({
            step: GAME_STEP.WAIT_USER,
            setStep: mockSetStep,
        });
    });

    it('renders the title correctly', () => {
        render(<Home />);
        const titleElement = screen.getByText(
            /Can you guess future BTC price?/i
        );
        expect(titleElement).toBeInTheDocument();
    });

    it('renders the BTCPrice component', () => {
        render(<Home />);
        const btcPriceElement = screen.getByText(/\$/); // Assumes BTCPrice renders a "$" somewhere
        expect(btcPriceElement).toBeInTheDocument();
    });

    it('renders UserForm when step is WAIT_USER', () => {
        render(<Home />);
        const userFormElement = screen.getByTestId('wait-user'); // Assumes UserForm has role="form"
        expect(userFormElement).toBeInTheDocument();
    });

    it('renders the Betting component when step is WAIT_BET', () => {
        (useGameLoopContext as vi.Mock).mockReturnValue({
            step: GAME_STEP.WAIT_BET,
            setStep: mockSetStep,
        });

        render(<Home />);
        const bettingElement = screen.getByTestId('betting');
        expect(bettingElement).toBeInTheDocument();
    });

    it('renders the WaitingResult component when step is WAIT_RESULT', () => {
        (useUser as vi.Mock).mockReturnValue({
            currentGuess: 123,
        });

        (useGameLoopContext as vi.Mock).mockReturnValue({
            step: GAME_STEP.WAIT_RESULT,
            setStep: mockSetStep,
        });

        render(<Home />);
        const waitingResultElement = screen.getByTestId('wait-result');
        expect(waitingResultElement).toBeInTheDocument();
    });

    it('renders the ShowResult component when step is SHOW_RESULT', () => {
        (useGameLoopContext as vi.Mock).mockReturnValue({
            step: GAME_STEP.SHOW_RESULT,
            setStep: mockSetStep,
        });

        render(<Home />);
        const showResultElement = screen.getByTestId('show-result');
        expect(showResultElement).toBeInTheDocument();
    });
});
