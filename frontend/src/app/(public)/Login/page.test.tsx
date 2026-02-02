import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { redirect } from 'next/navigation';

import Login from './page';

import { getAuthUser } from '@/services/authService';

// Mock dependencies
jest.mock('@/services/authService', () => ({
  getAuthUser: jest.fn(),
}));

jest.mock('@/actions/authActions', () => ({
  loginUserAction: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

// Mock next/form since it might not be fully supported in JSDOM or might need special handling
jest.mock('next/form', () => {
  return function MockForm({ action, children, ...props }: { action: string | ((formData: FormData) => void | Promise<void>); children: React.ReactNode }) {
    return (
      <form action={action as string} {...props}>
        {children}
      </form>
    );
  };
});

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('redirects to /home if user is authenticated', async () => {
    // Arrange
    (getAuthUser as jest.Mock).mockResolvedValue({ id: '123', email: 'test@example.com' });

    // Act
    // Since Login is an async Server Component, we await it directly
    await Login();

    // Assert
    expect(redirect).toHaveBeenCalledWith('/home');
  });

  test('renders login form if user is not authenticated', async () => {
    // Arrange
    (getAuthUser as jest.Mock).mockResolvedValue(null);

    // Act
    const jsx = await Login();
    render(jsx);

    // Assert
    expect(screen.getByRole('heading', { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByText("I don't have an account")).toBeInTheDocument();
  });

  test('renders inputs with default values if env vars are set', async () => {
    // Arrange
    (getAuthUser as jest.Mock).mockResolvedValue(null);
    const originalEnv = process.env;
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_USER_EMAIL: 'default@example.com',
      NEXT_PUBLIC_USER_PASSWORD: 'password123',
    };

    // Act
    const jsx = await Login();
    render(jsx);

    // Assert
    expect(screen.getByLabelText(/email/i)).toHaveValue('default@example.com');
    // For password, we can check value if we want, though often hidden
    expect(screen.getByLabelText(/password/i)).toHaveValue('password123');

    // Cleanup
    process.env = originalEnv;
  });
});
