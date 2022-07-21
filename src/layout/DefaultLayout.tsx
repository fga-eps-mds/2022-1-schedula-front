import { Flex, Heading, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
import {
  MdMonitor,
  MdOutlineDashboard,
  MdOutlineViewAgenda,
} from 'react-icons/md';

import { DashboardOptions } from '../styles/components/DashboardOptions';

interface DefaultLayoutProps {
  children: ReactNode;
  isActive1?: boolean;
  isActive2?: boolean;
  isActive3?: boolean;
  isActive4?: boolean;
  isActive5?: boolean;
}

const DefaultLayout = ({
  children,
  isActive1,
  isActive2,
  isActive3,
  isActive4,
  isActive5,
}: DefaultLayoutProps) => {
  const MenuHeadStyle = {
    borderBottom: '1px solid',
    width: '360px',
    height: '60px',
    borderColor: '#777777',
  };

  const divStyle = {
    // textAlign: 'left',
    width: '100%',
    display: 'flex',
    fontSize: 'large',
    alignItem: 'center',
  };

  const buttonTextStyle = {
    // marginLeft: '9px',
    // top: '5px',
    // display: 'flex',
    // margin: '0 auto',
  };

  const iconStyle = {
    // fontSize: 'xx-large',
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
            spacing={7}
            direction='column'
            align='left'
            w={360}
            marginTop={10}>
            <DashboardOptions isActive={isActive1}>
              <div style={divStyle}>
                <div style={iconStyle}>
                  <MdOutlineDashboard />
                </div>{' '}
                <div style={buttonTextStyle}>Dashboard</div>
              </div>
            </DashboardOptions>
            <DashboardOptions isActive={isActive2}>
              <div style={divStyle}>
                <MdOutlineViewAgenda /> <div>Chamados</div>
              </div>
            </DashboardOptions>
            <DashboardOptions isActive={isActive3}>
              <div style={divStyle}>
                <BsReverseLayoutTextWindowReverse />{' '}
                <div>Registrar Chamados</div>
              </div>
            </DashboardOptions>
            <DashboardOptions isActive={isActive4}>
              <div style={divStyle}>
                <MdOutlineDashboard />{' '}
                <h1 style={{ textAlign: 'left' }}>
                  {' '}
                  Gerenciar Tipos
                  <p />
                  de Chamados
                </h1>
              </div>
            </DashboardOptions>
            <DashboardOptions isActive={isActive5}>
              <div style={divStyle}>
                <MdMonitor /> <div>Tutoriais</div>
              </div>
            </DashboardOptions>
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
