import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface DashbordOptionsProps {
  children: ReactNode;
  isActive?: boolean;
}

export const DashbordOptions = ({
  children,
  isActive,
}: DashbordOptionsProps) => {
  return (
    <Button
      bg={isActive == true ? 'primary' : 'white'}
      size='sm'
      w={260}>
      {' '}
      {children}{' '}
    </Button>
  );
};
