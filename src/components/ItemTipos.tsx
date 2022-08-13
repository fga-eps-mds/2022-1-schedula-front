import { Box, Divider, Flex, Text } from '@chakra-ui/react';

import { ModalDelTipos } from './ModalDelTipos';
import { ModalEditTipos } from './ModalEditTipos';

type FormProps = {
  id: number;
  name: string;
  description: string;
};

interface TiposItemProps {
  id: number;
  name: string;
  description: string;
  active?: boolean;
  updatedAt?: Date;
  category_id: string | string[];
  callBackEdit: (novoTipo: FormProps) => void;
  callBackDel: (delid: number) => void;
}

export const ItemTipos = ({
  id,
  description,
  name,
  category_id,
  callBackEdit,
  callBackDel,
}: TiposItemProps) => {
  return (
    <Box key={id} mt='2em'>
      <Flex w='100%'>
        <Box w='91%'>
          <Text fontSize='large'>{name}</Text>
          <Text noOfLines={1} w='85%' maxW={'50em'}>
            {description}
          </Text>
          <Divider orientation='horizontal' />
        </Box>
        <ModalEditTipos
          id={id}
          name={name}
          description={description}
          callBackEdit={callBackEdit}
          category_id={category_id}
        />
        <ModalDelTipos name={name} id={id} callBackDel={callBackDel} />
      </Flex>
    </Box>
  );
};
