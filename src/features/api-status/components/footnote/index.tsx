import { memo, useMemo } from 'react';
import { FaServer } from 'react-icons/fa';
import {
  Flex,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { ServicesStatus } from '@/features/api-status/components/service-status';
import { useGetReleaseVersion } from '@/features/api-status/api/get-release-version';
import { Release } from '@/features/api-status/types';

function Footnote() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data } = useGetReleaseVersion();

  const version = useMemo(
    () => (data as unknown as Release[])?.[0]?.tag_name,
    [data]
  );

  return (
    <>
      <Flex
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        bottom="0"
        right={0}
        px={2}
      >
        <Text fontSize="xs" color="GrayText" p={1}>
          {version || 'dev'}
        </Text>
        <Tooltip
          label="Status dos Serviços"
          placement="left-start"
          bg="yellow.300"
          color="black"
          openDelay={250}
          hasArrow
        >
          <IconButton
            minWidth="fit-content"
            variant="link"
            icon={<FaServer />}
            aria-label="Status"
            onClick={onOpen}
            size="md"
          />
        </Tooltip>
      </Flex>

      <ServicesStatus isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default memo(Footnote);
