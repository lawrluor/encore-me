import Home from "./page";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  })
}));

describe("Home elements render", () => {
  test("Headings", () => {
    render(<Home />);
    let el = screen.getByRole('heading', { level: 1 });
    expect(el).toBeInTheDocument();

    el = screen.getByRole('heading', { level: 2 });
    expect(el).toBeInTheDocument();
  })
})

describe('Home buttons', () => {
  test('Sign Out', () => {
    user.setup();

    render(<Home />);
    let el = screen.getByRole('button', { name: 'Sign Out' });
    user.click(el);

    expect(localStorage.getItem('token')).toBeNull();
  })
})