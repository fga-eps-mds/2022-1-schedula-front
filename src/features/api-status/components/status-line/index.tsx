import { Badge, Box, Flex, Skeleton, Text } from '@chakra-ui/react';

interface StatusLineProps {
  serviceName: string;
  status: boolean;
  version: string;
  isLoadingStatus: boolean;
  isLoadingVersion: boolean;
}

export function StatusLine({
  serviceName,
  status,
  version,
  isLoadingStatus,
  isLoadingVersion,
}: StatusLineProps) {
  return (
    <Flex gap={2}>
      <Skeleton isLoaded={!isLoadingStatus}>
        <Badge
          fontSize="sm"
          variant="subtle"
          colorScheme={status ? 'green' : 'red'}
        >
          {status ? 'ON' : 'OFF'}
        </Badge>
      </Skeleton>

      <Text>{serviceName}</Text>

      {import.meta.env.PROD && (
        <Skeleton isLoaded={!isLoadingVersion}>
          <Badge
            variant="outline"
            textTransform="lowercase"
            fontWeight="medium"
          >
            {version || 'Not Released'}
          </Badge>
        </Skeleton>
      )}

      {import.meta.env.DEV && (
        <Box ml="auto">
          <Badge colorScheme="pink" variant="outline" textTransform="lowercase">
            dev
          </Badge>
        </Box>
      )}
    </Flex>
  );
}
