import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import { AddButton } from '.';

describe('AddButton', () => {
  it('has the correct aria-label', () => {
    render(<AddButton label="Adicionar" onClick={() => {}} />);
    expect(screen.getByLabelText('Adicionar')).toBeInTheDocument();
  });

  it('should be able to call AddButton onClick function', async () => {
    const mock = vi.fn();

    render(<AddButton label="Adicionar" onClick={mock} />);

    screen.getByRole('button').click();

    expect(mock).toHaveBeenCalled();
  });
});
