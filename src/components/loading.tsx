import { ReactNode } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

interface LoadingProps {
  isLoading: boolean;
  children: ReactNode;
}

export const Loading = ({ isLoading, children }: LoadingProps) => {
  return (
    <>
      {isLoading ? (
        <Box
          w={'100%'}
          verticalAlign={'90px'}
          alignContent={'center'}
          justifyContent={'center'}
          alignItems={'center'}
          margin={'0 auto'}
          ml={5}
        >
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            mt={'30%'}
            ml={'40%'}
          />
        </Box>
      ) : (
        <Box>{children}</Box>
      )}
    </>
  );
};
