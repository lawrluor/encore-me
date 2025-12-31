import { Greet } from './Greet';
import { render, screen } from '@testing-library/react';

describe('Greet', () => {
  test('has greetings text', () => {
    render(<Greet />);
    const el = screen.getByText('Greetings User');
    expect(el).toBeInTheDocument();
  });

  test('has name text from prop', () => {
    const username = "Lawrence";
    render(<Greet name={username} />);
    const el = screen.getByText(`Greetings ${username}`);
    expect(el).toBeInTheDocument();
  })
});
