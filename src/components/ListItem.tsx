import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { VscAdd } from 'react-icons/vsc';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';

import { CommonData } from '../services/DataType';

import { ListIcon } from './ListIcon';

interface ListItemProps {
  id: number;
  name: string;
  description: string;
  noAdd?: boolean;
  callBackEdit: (data: CommonData) => void;
  callBackDel: (delid: number) => void;
}

export const ListItem = ({
  id,
  description,
  name,
  noAdd,
  callBackEdit,
  callBackDel,
}: ListItemProps) => {
  return (
    <>
      <Box key={id} mt='2em'>
        <Flex w='100%'>
          <Box w='91%'>
            <Text fontSize='large'>{name}</Text>
            <Text noOfLines={1} w='85%' maxW={'50em'}>
              {description}
            </Text>
          </Box>
          <ListIcon noAdd={noAdd} type='Add'>
            <VscAdd color='#405866' />
          </ListIcon>
          <ListIcon type='Edit'>
            <BiEditAlt />
          </ListIcon>
          <ListIcon type='Delete'>
            <RiDeleteBin6Line />
          </ListIcon>
        </Flex>
      </Box>
      <Divider mt={'1vh'} orientation='horizontal' />
    </>
  );
};
