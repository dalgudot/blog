import { render, screen } from '@testing-library/react';
import TestPage from '../src/pages/test-page';

describe('PostList', () => {
  it('renders a heading', () => {
    render(<TestPage />);

    const heading = screen.getByRole('heading', {
      name: /Test!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
