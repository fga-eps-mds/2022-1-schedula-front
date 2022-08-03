import { ReactNode } from 'react';
import { FiLayout } from 'react-icons/fi';
import {
  MdMonitor,
  MdOutlineCallToAction,
  MdOutlineDashboard,
  MdOutlineViewAgenda,
} from 'react-icons/md';
import {
  Box,
  Flex,
  Heading,
  Stack,
} from '@chakra-ui/react';

import { DashboardOptions } from '../components/DashboardOptions';

interface DefaultLayoutProps {
  children: ReactNode;
  Active: string;
}

const DefaultLayout = ({
  children,
  Active,
}: DefaultLayoutProps) => {
  return (
    <>
      <Flex fontFamily='Overpass ,sans-serif'>
        <Box padding={55}>
          <Flex
            align='center'
            justify='center'
            borderBottom='1px solid'
            width='340px'
            height='60px'
            borderColor='#777777'
          >
            <Heading
              width={210}
              height={51}
              margin='0 auto'
              textAlign='center'
            >
              <Box
                fontFamily='Overpass ,sans-serif'
                color='black'
              >
                Schedula
              </Box>
            </Heading>
          </Flex>

          <Stack
            spacing={7}
            direction='column'
            align='left'
            w={360}
            marginTop={10}
          >
            <DashboardOptions
              isActive={Active == 'dashboard'}
              title='Dashboard'
              icon={<MdOutlineDashboard />}
              goTo='teste'
            />

            <DashboardOptions
              isActive={Active == 'chamados'}
              title='Chamados'
              icon={<MdOutlineViewAgenda />}
              goTo='teste'
            />
            <DashboardOptions
              isActive={Active == 'registrarChamados'}
              title='Registrar Chamados'
              icon={<MdOutlineCallToAction />}
              goTo='teste'
            />
            <DashboardOptions
              isActive={Active == 'gerenciarTiposDeChamado'}
              title='Tipos  de Chamados'
              icon={<FiLayout />}
              goTo='ListaCategoria'
            />
            <DashboardOptions
              isActive={Active == 'tutoriais'}
              title='Tutoriais'
              icon={<MdMonitor />}
              goTo='teste'
            />
          </Stack>
        </Box>

        <Box w='100%'>{children}</Box>
      </Flex>
    </>
  );
};

// eslint-disable-next-line import/no-default-export -- It's a layout.
export default DefaultLayout;
