import { Flex, Heading, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { MdOutlineDashboard } from 'react-icons/md';

import { DashbordOptions } from '../styles/components/DashbordOptions';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({
  children,
}: DefaultLayoutProps) => {
  const MenuHeadStyle = {
    // boxSizing: 'border-box',
    borderBottom: '1px solid',
    width: '360px',
    height: '60px',
    borderColor: '#777777',
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          Background-color='#E5E5E5'
          style={{ margin: '55px' }}>
          <Flex
            align='center'
            justify='center'
            style={MenuHeadStyle}>
            <Heading
              width={210}
              height={51}
              margin='0 auto'
              size='xl'
              textAlign='center'>
              Schedula
            </Heading>
          </Flex>

          <Stack
            spacing={4}
            direction='column'
            align='left'
            w={360}>
            <DashbordOptions isActive>
              <MdOutlineDashboard /> Dashboard
            </DashbordOptions>
            <DashbordOptions>Chamados</DashbordOptions>
            <DashbordOptions>
              Registrar Chamados
            </DashbordOptions>
            <DashbordOptions>
              Gerenciar Tipos De Chamados
            </DashbordOptions>
            <DashbordOptions>Tutoriais</DashbordOptions>
          </Stack>
        </div>

        <main style={{ width: '100%' }}>{children}</main>
      </div>

      {/* <footer style = {{bottom: '100%'}}>
            Hello World
        </footer> */}
    </>
  );
};

export default DefaultLayout;
