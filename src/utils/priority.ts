import { ThemingProps } from '@chakra-ui/react';
import { CHAMADO_PRIORITY } from '@/constants/chamados';

export const priorityColorMap = (
  priority: keyof typeof CHAMADO_PRIORITY | undefined
): ThemingProps['colorScheme'] => {
  switch (priority) {
    case 'low':
      return 'blackAlpha';

    case 'normal':
      return 'gray';

    case 'high':
      return 'yellow';

    case 'urgent':
      return 'red';

    default:
      return 'white';
  }
};
