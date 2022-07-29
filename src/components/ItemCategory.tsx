import Link from 'next/link';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { VscAdd } from 'react-icons/vsc';
import { Box, Flex, Text } from '@chakra-ui/react';

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
}

export const ItemCategory = ({
  id,
  description,
  name,
  callBackEdit,
}: CategoriesItemProps) => {
  function callBack(categoria: FormProps) {
    callBackEdit(categoria);
  }

  return (
    <Box key={id} mt='2em'>
      <Flex w='100%'>
        <Box w='90%'>
          <Text fontSize='large'>{name}</Text>
          <Text noOfLines={1}>{description}</Text>
        </Box>
        <Box
          m='0 auto'
          mt='1em'
          fontSize={'xl'}
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- its necessary since _hover NEEDS a css style object
          _hover={{ boxShadow: 'dark-lg' }}
        >
          <Link href={'../pages/teste.tsx'}>
            <VscAdd color='#405866' />
          </Link>
        </Box>
        <ModalEditCategory
          id={id}
          name={name}
          description={description}
          callBackEdit={callBack}
        />
        <Box
          m='0 auto'
          mt='1em'
          fontSize={'xl'}
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- its necessary since _hover NEEDS a css style object
          _hover={{ boxShadow: 'dark-lg' }}
        >
          <Link href={'../pages/teste.tsx'}>
            <RiDeleteBin6Line />
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};
