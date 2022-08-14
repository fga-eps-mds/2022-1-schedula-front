import { ReactNode } from 'react';
import { Flex, Grid } from '@chakra-ui/react';

import { SideBar } from '@components/SideBar';

interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <main>
      <Grid
        maxWidth='1440px'
        margin='0 auto'
        minHeight={'100vh'}
        templateColumns='auto minmax(0, 1fr)'
        gap={12}
        px='12'
        py='8'
      >
        <SideBar />
        <Flex flexDirection='column' paddingBottom={12}>
          {children}
        </Flex>
      </Grid>
    </main>
  );
};
