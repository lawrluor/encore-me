import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { redirect } from 'next/navigation';

import Home from './page';

import { getAuthUser } from '@/services/authService';

// Mock dependencies
jest.mock('@/services/authService', () => ({
  getAuthUser: jest.fn()
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}));

// Mock child components to isolate the page test
jest.mock('@/components/ActsList', () => ({
  ActsList: () => <div data-testid="acts-list">ActsList Component</div>
}));

jest.mock('@/components/Footer', () => ({
  Footer: () => <div data-testid="footer">Footer Component</div>
}));

jest.mock('@/components/LastPerformance', () => ({
  LastPerformance: () => <div data-testid="last-performance">LastPerformance Component</div>
}));

jest.mock('@/components/TopNav', () => ({
  TopNav: () => <div data-testid="top-nav">TopNav Component</div>
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('redirects if user is not authenticated', async () => {
    // Arrange
    (getAuthUser as jest.Mock).mockResolvedValue(null);

    // Act
    await Home();

    // Assert
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  test('renders dashboard layout if user is authenticated', async () => {
    (getAuthUser as jest.Mock).mockResolvedValue({ id: '123', name: 'Test User' });

    const jsx = await Home();
    render(jsx);

    expect(screen.getByTestId('top-nav')).toBeInTheDocument();
    expect(screen.getByTestId('acts-list')).toBeInTheDocument();
    expect(screen.getByTestId('last-performance')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });
});
