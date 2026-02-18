import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from './page';

// Mock child components to isolate the page test
jest.mock('@/components/LastPerformance', () => ({
  LastPerformance: () => <div data-testid="last-performance">LastPerformance Component</div>
}));

describe('Home Page', () => {
  test('renders LastPerformance component', async () => {
    const jsx = await Home();
    render(jsx);

    expect(screen.getByTestId('last-performance')).toBeInTheDocument();
  });
});
