import { screen, render } from '@testing-library/react';
import { RefreshButton } from '.';

describe('RefreshButton', () => {
  it('has the correct aria-label', () => {
    render(
      <RefreshButton
        refresh={() =>
          new Promise((resolve) => {
            resolve('success');
          })
        }
      />
    );

    expect(screen.getByLabelText('Atualizar Dados')).toBeInTheDocument();
  });
});
