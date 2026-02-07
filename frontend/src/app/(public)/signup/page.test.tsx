import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { redirect } from 'next/navigation';

import Signup from './page';

import { getAuthUser } from '@/services/authService';

// Mock dependencies
jest.mock('@/services/authService', () => ({
  getAuthUser: jest.fn(),
}));

jest.mock('@/actions/authActions', () => ({
  signupUserAction: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

// Mock next/form
jest.mock('next/form', () => {
  return function MockForm({ action, children, ...props }: { action: string | ((formData: FormData) => void | Promise<void>); children: React.ReactNode }) {
    return (
      <form action={action as string} {...props}>
        {children}
      </form>
    );
  };
});

describe('Signup Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('redirects to /home if user is authenticated', async () => {
    // Arrange
    (getAuthUser as jest.Mock).mockResolvedValue({ id: '123', email: 'test@example.com' });

    // Act
    await Signup();

    // Assert
    expect(redirect).toHaveBeenCalledWith('/home');
  });

  test('renders signup form if user is not authenticated', async () => {
    // Arrange
    (getAuthUser as jest.Mock).mockResolvedValue(null);

    // Act
    const jsx = await Signup();
    render(jsx);

    // Assert
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();

    // Inputs
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

    // Button
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();

    // Link
    expect(screen.getByText("I already have an account")).toBeInTheDocument();
  });
});
