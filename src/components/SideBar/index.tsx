import { FaRegUser } from 'react-icons/fa';
import { RiLogoutCircleFill } from 'react-icons/ri';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';

import { routes } from '@routes';

import { SideBarItem } from './SidebarItem/SideBarItem';

export const SideBar = () => {
  return (
    <Flex
      flexDirection='column'
      gap={2}
      width={230}
      height='100%'
      maxHeight='calc(100vh - 8rem)' // 4rem padding 2x
      position='sticky'
      top={16}
    >
      <Heading margin='0 auto' textAlign='center' fontWeight={'medium'}>
        Schedula
      </Heading>
      <Divider />
      <Flex flexDirection={'column'} gap={3}>
        {routes.map((route) => (
          <SideBarItem key={route.label} {...route} />
        ))}
      </Flex>

      <Box marginTop={'auto'}>
        <Divider marginBottom={2} />
        <Flex gap={2} justifyContent={'space-between'} alignItems={'center'}>
          <FaRegUser size={25} />
          <Text maxWidth={140} noOfLines={1}>
            Nome de user
          </Text>
          <RiLogoutCircleFill size={25} />
        </Flex>
      </Box>
    </Flex>
  );
};
