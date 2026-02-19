import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { redirect } from 'next/navigation';


import { getActById } from '@/lib/db/acts';
import { getUserTree } from '@/lib/db/users';
import { getAuthUser } from '@/services/authService';

import Act from './page';

// Mock dependencies
jest.mock('@/services/authService', () => ({
  getAuthUser: jest.fn()
}));

jest.mock('@/lib/db/acts', () => ({
  getActById: jest.fn()
}));

jest.mock('@/lib/db/users', () => ({
  getUserTree: jest.fn()
}));

jest.mock('@/actions/actActions', () => ({
  deleteActAction: jest.fn(),
  putActAction: jest.fn()
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn().mockImplementation(() => { throw new Error('NEXT_REDIRECT'); })
}));

// Mock child components
jest.mock('@/components/ActsList', () => ({
  ActsList: () => <div data-testid="acts-list">ActsList Component</div>,
}));

jest.mock('@/components/CreateSetForm', () => ({
  CreateSetForm: () => <div data-testid="create-set-form">CreateSetForm Component</div>,
}));

jest.mock('@/components/Footer', () => ({
  Footer: () => <div data-testid="footer">Footer Component</div>,
}));

jest.mock('@/components/SetPanelsList', () => ({
  SetPanelsList: () => <div data-testid="set-panels-list">SetPanelsList Component</div>,
}));

jest.mock('@/components/TopNav', () => ({
  TopNav: () => <div data-testid="top-nav">TopNav Component</div>,
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

describe('Act Page', () => {
  const mockAct = {
    id: 'act-123',
    name: 'Test Act',
  };

  const mockUser = {
    id: 'user-123',
    name: 'Test User',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('redirects to /login if user is not authenticated', async () => {
    // Arrange
    (getAuthUser as jest.Mock).mockResolvedValue({ status: 'unauthenticated' });
    const params = Promise.resolve({ actId: 'act-123' });

    // Act & Assert
    await expect(Act({ params })).rejects.toThrow('NEXT_REDIRECT');
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  test('throws error if actId is missing', async () => {
    // Arrange
    (getAuthUser as jest.Mock).mockResolvedValue({ status: 'authenticated', user: mockUser });
    (getUserTree as jest.Mock).mockResolvedValue({ acts: [] });
    const params = Promise.resolve({ actId: "" });

    // Act & Assert
    await expect(Act({ params })).rejects.toThrow("Act must have an ID");
  });

  test('renders act details and sub-components when authenticated', async () => {
    // Arrange
    (getAuthUser as jest.Mock).mockResolvedValue({ status: 'authenticated', user: mockUser });
    (getUserTree as jest.Mock).mockResolvedValue({ acts: [mockAct] });
    (getActById as jest.Mock).mockResolvedValue(mockAct);
    const params = Promise.resolve({ actId: 'act-123' });

    // Act
    const jsx = await Act({ params });
    render(jsx);

    // Assert
    expect(getUserTree).toHaveBeenCalledWith(mockUser.id);

    // Check act-specific content rendered by the page (layout components are not rendered here)
    expect(screen.getByTestId('create-set-form')).toBeInTheDocument();
    expect(screen.getByTestId('set-panels-list')).toBeInTheDocument();
  });
});
