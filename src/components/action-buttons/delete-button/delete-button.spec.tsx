import { screen, render } from '@testing-library/react';
import { DeleteButton } from '.';

describe('DeleteButton', () => {
  it('has the correct aria-label', () => {
    render(<DeleteButton label="usuário" onClick={() => {}} />);
    expect(screen.getByText('Excluir usuário')).toBeInTheDocument();
  });

  it('should be able to call DeleteButton onClick function', async () => {
    render(<DeleteButton label="usuário" onClick={() => {}} />);

    const button = screen.getByText('Excluir usuário');

    expect(button).toBeInTheDocument();
  });
});
