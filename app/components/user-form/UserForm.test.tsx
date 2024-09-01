import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserForm } from './UserForm';
import { vi } from 'vitest';
import { useUser } from '@/app/shared/hooks/useUser';

// Mock useUser hook
vi.mock('@/app/shared/hooks/useUser', () => ({
    useUser: vi.fn(),
}));

describe('UserForm', () => {
    it('should render "Sign up to play" button initially', () => {
        (useUser as vi.Mock).mockReturnValue({ currentUser: null });

        render(<UserForm onSubmit={vi.fn()} />);

        const button = screen.getByText('Sign up to play');
        expect(button).toBeInTheDocument();
    });

    it('should show the form when "Sign up to play" button is clicked', async () => {
        (useUser as vi.Mock).mockReturnValue({ currentUser: null });

        render(<UserForm onSubmit={vi.fn()} />);

        const button = screen.getByText('Sign up to play');
        await userEvent.click(button);

        const form = screen.getByTestId('wait-user');
        expect(form).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Satoshi')).toBeInTheDocument();
    });

    it('should call onSubmit with correct username when form is submitted', async () => {
        (useUser as vi.Mock).mockReturnValue({ currentUser: null });

        const mockOnSubmit = vi.fn();
        render(<UserForm onSubmit={mockOnSubmit} />);

        await userEvent.click(screen.getByText('Sign up to play'));

        const input = screen.getByPlaceholderText('Satoshi');
        await userEvent.type(input, 'testUser');

        const submitButton = screen.getByText('Sign up');
        await userEvent.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalledWith('testUser');
    });
});
