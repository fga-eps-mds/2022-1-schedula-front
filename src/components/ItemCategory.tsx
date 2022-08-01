import Link from 'next/link';
import { VscAdd } from 'react-icons/vsc';
import { Box, Flex, Text } from '@chakra-ui/react';

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
  return (
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
        >
          <Link href={'/teste'}>
            <VscAdd color='#405866' />
          </Link>
        </Box>
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
