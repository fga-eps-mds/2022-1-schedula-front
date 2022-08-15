import { useCallback, useState } from 'react';
import { FaSyncAlt } from 'react-icons/fa';
import { IconButton, Tooltip } from '@chakra-ui/react';

interface RefreshButtonProps {
  refresh: () => Promise<unknown>;
}

export const RefreshButton = ({ refresh }: RefreshButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    refresh?.().finally(() => setIsLoading(false));
  }, [refresh]);

  return (
    <Tooltip
      label='Atualizar Dados'
      placement='top'
      bg='gray.100'
      color='black'
      hasArrow
      openDelay={250}
    >
      <IconButton
        icon={<FaSyncAlt />}
        aria-label='Atualizar Dados'
        variant='outline'
        onClick={handleRefresh}
        disabled={isLoading}
      />
    </Tooltip>
  );
};
