import { VscAdd } from 'react-icons/vsc';
import { Box, Divider, Flex, Text, useDisclosure } from '@chakra-ui/react';

import { CommonData } from './DataType';
import { ModalCadType } from './ModalCadType';
import { ModalDelCategory } from './ModalDelCategory';
import { ModalEditCategory } from './ModalEditCategory';

interface ListItemProps {
  id: number;
  name: string;
  description: string;
  active?: boolean;
  updatedAt?: Date;
  callBackEdit: (data: CommonData) => void;
  callBackDel: (delid: number) => void;
}

export const ListItem = ({
  id,
  description,
  name,
  callBackEdit,
  callBackDel,
}: ListItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

          <Box
            m='0 auto'
            mt='1em'
            maxH={'20px'}
            fontSize={'xl'}
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- its necessary since _hover NEEDS a css style object
            _hover={{ boxShadow: 'dark-lg' }}
            onClick={onOpen}
          >
            <VscAdd color='#405866' />
          </Box>
          <ModalCadType onClose={onClose} isOpen={isOpen} categoryId={2} />
          <ModalEditCategory
            id={id}
            name={name}
            description={description}
            callBackEdit={callBackEdit}
          />
          <ModalDelCategory name={name} id={id} callBackDel={callBackDel} />
        </Flex>
      </Box>
      <Divider mt={'1vh'} orientation='horizontal' />
    </>
  );
};
