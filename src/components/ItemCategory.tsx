import { Box, Flex, Text } from '@chakra-ui/react';

import { BiEditAlt } from 'react-icons/bi';

import Link from 'next/link';

import { RiDeleteBin6Line } from 'react-icons/ri';

import { VscAdd } from 'react-icons/vsc';

interface CategoriesItem {
  id: number;
  name: string;
  description: string;
  active?: boolean;
  updatedAt?: Date;
  linkEdit: string;
  linkDel: string;
  linkAdd: string;
}

export const ItemCategory = ({
  id,
  description,
  name,
  linkEdit,
  linkDel,
  linkAdd,
}: CategoriesItem) => {

  const hover = {
    boxShadow: 'dark-lg'
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
          _hover={hover}>
          <Link href={linkAdd}>
            <VscAdd color='#405866' />
          </Link>
        </Box>
        <Box
          m='0 auto'
          mt='1em'
          fontSize={'xl'}
          _hover={hover}>
          <Link href={linkEdit}>
            <BiEditAlt />
          </Link>
        </Box>
        <Box
          m='0 auto'
          mt='1em'
          fontSize={'xl'}
          _hover={hover}>
          <Link href={linkDel}>
            <RiDeleteBin6Line />
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};
