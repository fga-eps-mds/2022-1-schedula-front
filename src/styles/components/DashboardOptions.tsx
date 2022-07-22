import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface DashboardOptionsProps {
  children: ReactNode;
  isActive?: boolean;
}

export const DashboardOptions = ({
  children,
  isActive,
}: DashboardOptionsProps) => {
  return (
    <Button
      bg={isActive == true ? 'primary' : 'white'}
      color={isActive == true ? 'white' : 'black'}
      size='sm'
      w='235px'
      h='48px'
      _hover={{ bg: 'primary', color: 'white' }}>
      {children}
    </Button>
  );
};
