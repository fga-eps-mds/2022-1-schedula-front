import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import { EditButton } from '.';

describe('EditButton', () => {
  it('has the correct aria-label', () => {
    render(<EditButton label="Usuário" onClick={() => {}} />);
    expect(screen.getByLabelText('Editar Usuário')).toBeInTheDocument();
  });

  it('should be able to call EditButton onClick function', async () => {
    const mock = vi.fn();

    render(<EditButton onClick={mock} />);

    screen.getByRole('button').click();

    expect(mock).toHaveBeenCalled();
  });
});
