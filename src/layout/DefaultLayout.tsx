import { Flex, Heading, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FiLayout } from 'react-icons/fi';
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
    fontSize: 'medium',
    alignItem: 'center',
  };

  const buttonTextStyle = {
    marginLeft: '12px',
    display: 'flex',
    marginTop: '3%',
  };

  const iconStyle = {
    fontSize: 'xx-large',
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
        }}>
        <div
          style={{
            margin: '55px',
          }}>
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
                <div style={buttonTextStyle}>
                  <div>Dashboard</div>
                </div>
              </div>
            </DashboardOptions>
            <DashboardOptions isActive={isActive2}>
              <div style={divStyle}>
                <div style={iconStyle}>
                  <MdOutlineViewAgenda />{' '}
                </div>{' '}
                <div style={buttonTextStyle}>
                  <div>Chamados</div>
                </div>
              </div>
            </DashboardOptions>
            <DashboardOptions isActive={isActive3}>
              <div style={divStyle}>
                <div style={iconStyle}>
                  <FiLayout />{' '}
                </div>{' '}
                <div style={buttonTextStyle}>
                  <div>Registrar Chamados</div>
                </div>
              </div>
            </DashboardOptions>
            <DashboardOptions isActive={isActive4}>
              <div style={divStyle}>
                <div style={iconStyle}>
                  <MdOutlineViewAgenda />{' '}
                </div>{' '}
                <h1
                  style={{
                    textAlign: 'left',
                    marginLeft: '12px',
                  }}>
                  Gerenciar Tipos
                  <p />
                  de Chamados
                </h1>
              </div>
            </DashboardOptions>
            <DashboardOptions isActive={isActive5}>
              <div style={divStyle}>
                <div style={iconStyle}>
                  <MdMonitor />{' '}
                </div>{' '}
                <div style={buttonTextStyle}>
                  <div>Tutoriais</div>
                </div>
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
