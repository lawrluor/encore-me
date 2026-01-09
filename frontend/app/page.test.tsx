import Home from "./page";
import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";

import { AuthProvider } from './context/AuthProvider';

global.fetch = jest.fn(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: ['data1', 'data2'] })
  })
})

jest.mock('next/navigation', () => ({
  usePathname: () => {
    return '/home'
  },
  useRouter: () => {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn()
    }
  }
}));

describe("Home elements render", () => {
  test("Headings", async () => {
    render(<AuthProvider><Home /></AuthProvider>);

    const el = screen.getByRole('heading', { name: 'ACTS', level: 2 });
    expect(el).toBeInTheDocument();

    expect(screen.queryByText('Loading...')).toBeInTheDocument();

    // Wait for the async effect in useGetActs to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  })
})

describe('Home buttons', () => {
  test('Sign Out', async () => {
    user.setup();

    render(<AuthProvider><Home /></AuthProvider>);
    const el = screen.getByRole('button', { name: 'Sign Out' });
    await user.click(el);

    expect(localStorage.getItem('token')).toBeNull();
  })
})