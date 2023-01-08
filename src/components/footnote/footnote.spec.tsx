import { screen, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Footnote from '.';

describe('Footnote', () => {
  it('Footnote is visible', () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Footnote />
      </QueryClientProvider>
    );

    expect(screen.getByText('dev')).toBeInTheDocument();
  });
});
