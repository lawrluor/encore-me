import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { redirect } from 'next/navigation';

import { getAct } from '../../../../services/actService';
import { getAuthUser } from '../../../../services/authService';

import Act from './page';

// Mock dependencies
jest.mock('../../../../services/authService', () => ({
  getAuthUser: jest.fn()
}));

jest.mock('../../../../services/actService', () => ({
  getAct: jest.fn()
}));

jest.mock('../../../../actions/actActions', () => ({
  deleteActAction: jest.fn(),
  putActAction: jest.fn()
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}));

// Mock child components
jest.mock('../../../../components/ActsList', () => ({
  ActsList: () => <div data-testid="acts-list">ActsList Component</div>,
}));

jest.mock('../../../../components/CreateSetForm', () => ({
  CreateSetForm: () => <div data-testid="create-set-form">CreateSetForm Component</div>,
}));

jest.mock('../../../../components/Footer', () => ({
  Footer: () => <div data-testid="footer">Footer Component</div>,
}));

jest.mock('../../../../components/SetPanelsList', () => ({
  SetPanelsList: () => <div data-testid="set-panels-list">SetPanelsList Component</div>,
}));

jest.mock('../../../../components/TopNav', () => ({
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

  test('redirects to /Login if user is not authenticated', async () => {
    // Arrange
    (getAuthUser as jest.Mock).mockResolvedValue(null);
    const params = Promise.resolve({ actId: 'act-123' });

    // Act
    await Act({ params });

    // Assert
    expect(redirect).toHaveBeenCalledWith('/Login');
  });

  test('throws error if actId is missing', async () => {
    // Arrange
    (getAuthUser as jest.Mock).mockResolvedValue(mockUser);
    const params = Promise.resolve({});

    // Act & Assert
    await expect(Act({ params })).rejects.toThrow("Act must have an ID");
  });

  test('renders act details and sub-components when authenticated', async () => {
    // Arrange
    (getAuthUser as jest.Mock).mockResolvedValue(mockUser);
    (getAct as jest.Mock).mockResolvedValue(mockAct);
    const params = Promise.resolve({ actId: 'act-123' });

    // Act
    const jsx = await Act({ params });
    render(jsx);

    // Assert
    expect(getAct).toHaveBeenCalledWith('act-123');

    // Check main layout components
    expect(screen.getByTestId('top-nav')).toBeInTheDocument();
    expect(screen.getByTestId('acts-list')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    // Check act specific content
    expect(screen.getByDisplayValue('Test Act')).toBeInTheDocument();
    expect(screen.getByTestId('create-set-form')).toBeInTheDocument();
    expect(screen.getByTestId('set-panels-list')).toBeInTheDocument();

    // Check delete button exists (by SVG or role if possible, simplified here by class or containment)
    // The delete button contains an SVG. We can look for the button.
    const deleteBtn = screen.getByRole('button'); // There might be multiple buttons, but currently only one in the main section besides hidden inputs
    expect(deleteBtn).toBeInTheDocument();
  });
});
