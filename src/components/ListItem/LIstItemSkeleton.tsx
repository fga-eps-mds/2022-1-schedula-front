import { Flex, HStack, Skeleton, VStack } from "@chakra-ui/react"

export const ListItemSkeleton = () => {
  return (
    <VStack spacing={6}>
      {Array.from({ length: 4 }, (_, key) => (
        <Flex
          key={key}
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          pb={2}
          bg="white"
          borderRadius="md"
          padding={4}
          boxShadow="medium"
          height="92px"
        >
          <VStack spacing={2} alignItems="start">
            <Skeleton height="24px" w={175} />
            <Skeleton height="16px" w={280} />
          </VStack>
          <HStack spacing={4} alignSelf="end">
            <Skeleton height="40px" width="40px" alignSelf="end" />
            <Skeleton height="40px" width="40px" alignSelf="end" />
            <Skeleton height="40px" width="40px" alignSelf="end" />
          </HStack>
        </Flex>
      ))}
    </VStack>
  )
}
