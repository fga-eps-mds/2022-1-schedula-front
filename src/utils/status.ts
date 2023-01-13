import { CHAMADO_STATUS } from '@/constants/chamados';

export const statusColor = (
  status: keyof typeof CHAMADO_STATUS | undefined
) => {
  switch (status) {
    case 'pending':
      return 'yellow.500';

    case 'in_progress':
      return 'blue.400';

    case 'not_solved':
      return 'gray.400';

    case 'solved':
      return 'green.400';

    case 'outsourced':
      return 'purple.300';

    default:
      return 'red';
  }
};
