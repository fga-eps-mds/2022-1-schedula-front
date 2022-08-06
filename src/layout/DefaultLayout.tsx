import { ReactNode } from 'react';
import { Box, Grid } from '@chakra-ui/react';

import { SideBar } from '@components/SideBar';

interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Grid
        minHeight={'100vh'}
        templateColumns='auto minmax(0, 1fr)'
        gap={4}
        px='12'
        py='4'
      >
        <Box>
          <SideBar />
        </Box>
        <Box>{children}</Box>
      </Grid>
    </>
  );
};
