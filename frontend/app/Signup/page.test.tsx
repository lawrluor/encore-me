import Signup from './page';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

describe('Elements rendered', () => {
  test('Heading', () => {
    render(<Signup />);
    const el = screen.getByRole('heading');
    expect(el).toBeInTheDocument();
  })
})


describe('Switch Signup to Login', () => {
  test('Elements exist', () => {
    render(<Signup />);

    // Initial states
    const pageTitle = screen.getByRole('heading');
    expect(pageTitle).toBeInTheDocument();

    const switchPageTypeButton = screen.getByText('I already have an account');
    expect(switchPageTypeButton).toBeInTheDocument();
  })

  test('renders Login title text after one click on button', async () => {
    render(<Signup />);

    user.setup();

    const switchPageTypeButton = screen.getByRole('button', { name: 'I already have an account' });
    await user.click(switchPageTypeButton);

    const pageTitle = screen.getByRole('heading', { level: 1 });
    expect(pageTitle).toHaveTextContent("Log In");
  })

  test('renders Login title text after a double click on button', async () => {
    render(<Signup />);

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

