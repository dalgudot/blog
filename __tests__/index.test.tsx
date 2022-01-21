import { render, screen } from '@testing-library/react';
import TestPage from '../src/pages/test-page';

describe('Home', () => {
  it('renders a heading', () => {
    render(<TestPage />);

    const heading = screen.getByRole('heading', {
      name: /test/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
