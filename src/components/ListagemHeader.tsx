import { ReactNode } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

import { CommonData } from '../services/DataType';

interface ListagemHeaderProps {
  header: string;
  underHeader: string;
  children: ReactNode;
  addList?: (data: CommonData) => void;
  editList?: (data: CommonData) => void;
  delList?: (delid: number) => void;
}

export const ListagemHeader = ({ ...List }: ListagemHeaderProps) => {
  return (
    <>
      <Box w='100%'>
        <Box width='100%' display='flex' fontFamily='Overpass ,sans-serif'>
          <Flex align='center' justify='left' w='100%' h='5%' mr={10} mt='2%'>
            <Heading
              margin='0 auto'
              marginLeft={0}
              size='lg'
              textAlign='center'
              fontFamily='Overpass ,sans-serif'
            >
              {List.header}
            </Heading>
            <Box alignSelf={'flex-end'}>{List.children}</Box>
          </Flex>
        </Box>
        <Box mt='1em' mb='3em'>
          <Box>{List.underHeader}</Box>
        </Box>
      </Box>
    </>
  );
};
