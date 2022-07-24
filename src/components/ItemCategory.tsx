import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { VscAdd } from 'react-icons/vsc';

interface categoriesItem {
  id: number;
  name: string;
  description: string;
  active?: boolean;
  updatedAt?: Date;
  link: string;
}

export const ItemCategory = ({
  id,
  description,
  name,
  link,
}: categoriesItem) => {
  return (
    <Box key={id} mt='2em'>
      <Flex w='100%'>
        <Box w='90%'>
          <Text fontSize='large'>{name}</Text>
          <Text noOfLines={1}>{description}</Text>
        </Box>
        <Box m='0 auto' mt='1em' fontSize={'xl'}>
          <Link href={link}>
            <VscAdd color='#405866' />
          </Link>
        </Box>
        <Box m='0 auto' mt='1em' fontSize={'xl'}>
          <Link href={link}>
            <BiEditAlt />
          </Link>
        </Box>
        <Box m='0 auto' mt='1em' fontSize={'xl'}>
          <Link href={link}>
            <RiDeleteBin6Line />
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};
