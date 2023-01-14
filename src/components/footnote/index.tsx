import { memo, useMemo } from 'react';
import { FaServer } from 'react-icons/fa';
import {
  Flex,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { ServicesStatus } from '@/components/footnote/service-status';

interface Releases {
  tag_name: string;
  name: string;
}

async function getData(endpoint: string) {
  const response = await api.get(endpoint);
  return response.data;
}

function Footnote() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data } = useQuery<Releases>(
    'users-service-version',
    () =>
      getData(
        'https://api.github.com/repos/fga-eps-mds/2022-2-schedula-front/releases'
      ),
    {
      enabled: !!import.meta.env.PROD,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const version = useMemo(
    () => (data as unknown as Releases[])?.[0]?.tag_name,
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
