import { Flex, HStack, Skeleton, VStack } from '@chakra-ui/react';

import { Divider } from '@components/ListItem';

export const ListItemSkeleton = () => {
  return (
    <VStack spacing={8}>
      {Array.from({ length: 5 }, (_, key) => (
        <Flex
          w='100%'
          position='relative'
          justifyContent='space-between'
          _after={Divider}
          pb={2}
          key={key}
        >
          <VStack spacing={2} alignItems='start'>
            <Skeleton height='18px' w={175} />
            <Skeleton height='12px' w={280} />
          </VStack>
          <HStack spacing={4}>
            <Skeleton height='40px' width='40px' alignSelf='end' />
            <Skeleton height='40px' width='40px' alignSelf='end' />
            <Skeleton height='40px' width='40px' alignSelf='end' />
          </HStack>
        </Flex>
      ))}
    </VStack>
  );
};
