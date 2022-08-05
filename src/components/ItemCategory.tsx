import {
  Box,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { ModalCadType } from './ModalCadType';
import { ModalDelCategory } from './ModalDelCategory';
import { ModalEditCategory } from './ModalEditCategory';

type FormProps = {
  id: number;
  name: string;
  description: string;
};

interface CategoriesItemProps {
  id: number;
  name: string;
  description: string;
  active?: boolean;
  updatedAt?: Date;
  callBackEdit: (novaCategoria: FormProps) => void;
  callBackDel: (delid: number) => void;
}

export const ItemCategory = ({
  id,
  description,
  name,
  callBackEdit,
  callBackDel,
}: CategoriesItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box key={id} mt='2em'>
      <Flex w='100%'>
        <Box w='91%'>
          <Text fontSize='large'>{name}</Text>
          <Text noOfLines={1} w='85%' maxW={'50em'}>
            {description}
          </Text>
        </Box>
        <ModalCadType categoryId={2} />
        <ModalEditCategory
          id={id}
          name={name}
          description={description}
          callBackEdit={callBackEdit}
        />
        <ModalDelCategory
          name={name}
          id={id}
          callBackDel={callBackDel}
        />
      </Flex>
    </Box>
  );
};
