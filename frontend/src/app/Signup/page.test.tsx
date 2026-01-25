import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { AuthProvider } from '../../context/AuthProvider';

import Signup from './page';

jest.mock('next/navigation', () => ({
  usePathname: () => {
    return '/'
  },
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  })
}));

describe('Elements rendered', () => {
  test('Heading', () => {
    render(<AuthProvider><Signup /></AuthProvider>);
    const el = screen.getByRole('heading');
    expect(el).toBeInTheDocument();
  })
})

describe('Switch Signup to Login', () => {
  test('Elements exist', () => {
    render(<AuthProvider><Signup /></AuthProvider>);

    // Initial states
    const pageTitle = screen.getByRole('heading');
    expect(pageTitle).toBeInTheDocument();

    const switchPageTypeButton = screen.getByText('I already have an account');
    expect(switchPageTypeButton).toBeInTheDocument();
  })

  test('renders Login title text after one click on button', async () => {
    render(<AuthProvider><Signup /></AuthProvider>);

    user.setup();

    const switchPageTypeButton = screen.getByRole('button', { name: 'I already have an account' });
    await user.click(switchPageTypeButton);

    const pageTitle = screen.getByRole('heading', { level: 1 });
    expect(pageTitle).toHaveTextContent("Log In");
  })

  test.skip('renders Login title text after a double click on button', async () => {
    render(<AuthProvider><Signup /></AuthProvider>);

    user.setup();

    const pageTitle = screen.getByRole('heading', { level: 1 });
    expect(pageTitle).toBeInTheDocument();

    const switchPageButton = screen.getByRole('button', { name: 'I already have an account' });
    expect(switchPageButton).toBeInTheDocument();

    await user.click(switchPageButton);
    await user.click(switchPageButton);

    const loginText = screen.getByRole('heading', { level: 1 });
    expect(loginText).toHaveTextContent('Log In');
  })
})

