import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    useGameLoopContext,
    GameLoopProvider,
    GAME_STEP,
} from './GameLoopContext';
import { useUser } from '@/app/shared/hooks/useUser';
import { useBTCPrice } from '@/app/components/btc-price/hooks/useBTCPrice';
import { submitGuess, resolveGuess } from '@/lib/api';

// Mock the necessary modules and hooks
vi.mock('@/app/shared/hooks/useUser');
vi.mock('@/app/components/btc-price/hooks/useBTCPrice');
vi.mock('@/lib/api');

describe('GameLoopContext', () => {
    // Mock values for the hooks
    const mockCurrentUser = 'testUser';
    const mockCurrentScore = 10;
    const mockBTCPrice = 30000;

    beforeEach(() => {
        // Reset mocks before each test
        (useUser as vi.Mock).mockReturnValue({
            currentUser: mockCurrentUser,
            currentScore: mockCurrentScore,
        });

        (useBTCPrice as vi.Mock).mockReturnValue({
            data: mockBTCPrice,
        });

        (submitGuess as vi.Mock).mockResolvedValue({});
        (resolveGuess as vi.Mock).mockResolvedValue({
            user: { score: 11 },
            inProgress: false,
        });
    });

    it('should initialize with WAIT_USER step if no user is found', async () => {
        (useUser as vi.Mock).mockReturnValueOnce({ currentUser: null });

        const { result } = renderHook(() => useGameLoopContext(), {
            wrapper: GameLoopProvider,
        });

        expect(result.current.step).toBe(GAME_STEP.WAIT_USER);
    });

    it('should transition to WAIT_BET when user is available', async () => {
        const { result, waitForValueToChange } = renderHook(
            () => useGameLoopContext(),
            {
                wrapper: GameLoopProvider,
            }
        );

        await waitForValueToChange(() => result.current?.step);

        expect(result.current.step).toBe(GAME_STEP.WAIT_BET);
    });

    it('should transition to WAIT_RESULT step after making a bet', async () => {
        const { result, waitForValueToChange } = renderHook(
            () => useGameLoopContext(),
            {
                wrapper: GameLoopProvider,
            }
        );

        await waitForValueToChange(() => result.current?.step);

        await result.current.makeBet('up');

        expect(result.current.step).toBe(GAME_STEP.WAIT_RESULT);
    });

    it('should resolve bet and update betWon state correctly', async () => {
        const { result, waitForValueToChange } = renderHook(
            () => useGameLoopContext(),
            {
                wrapper: GameLoopProvider,
            }
        );

        await waitForValueToChange(() => result.current?.step);

        await result.current.resolveBet();

        expect(result.current.betWon).toBe(true); // Assuming the mock score is greater than the current score
        expect(result.current.step).toBe(GAME_STEP.SHOW_RESULT);
    });

    it('should restart the game and transition to WAIT_BET step', async () => {
        const { result, waitForValueToChange } = renderHook(
            () => useGameLoopContext(),
            {
                wrapper: GameLoopProvider,
            }
        );

        await waitForValueToChange(() => result.current?.step);

        act(() => {
            result.current.restart();
        });

        expect(result.current.step).toBe(GAME_STEP.WAIT_BET);
    });

    it('should handle in-progress bet correctly', async () => {
        (resolveGuess as vi.Mock).mockResolvedValueOnce({
            user: { score: mockCurrentScore },
            inProgress: true,
        });

        const { result, waitForValueToChange } = renderHook(
            () => useGameLoopContext(),
            {
                wrapper: GameLoopProvider,
            }
        );

        await waitForValueToChange(() => result.current?.step);

        expect(result.current.step).toBe(GAME_STEP.WAIT_RESULT);
    });

    it('should handle no in-progress bet and transition to WAIT_BET', async () => {
        (resolveGuess as vi.Mock).mockResolvedValueOnce({
            user: { score: mockCurrentScore },
            inProgress: false,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useGameLoopContext(),
            {
                wrapper: GameLoopProvider,
            }
        );

        await waitForNextUpdate();

        expect(result.current.step).toBe(GAME_STEP.WAIT_BET);
    });
});
