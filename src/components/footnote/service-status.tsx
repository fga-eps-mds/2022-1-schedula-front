import {
  Badge,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAPIStatus } from '@/hooks/use-api-status';
import { useReleaseData } from '@/hooks/use-release-data';

interface ServicesStatusProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StatusLineProps {
  serviceName: string;
  status: boolean;
  version: string;
  isLoadingStatus: boolean;
  isLoadingVersion: boolean;
}

function StatusLine({
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

export function ServicesStatus({ isOpen, onClose }: ServicesStatusProps) {
  const {
    usuariosStatus,
    chamadosStatus,
    localidadesStatus,
    isLoadingChamadosStatus,
    isLoadingUsuariosStatus,
    isLoadingLocalidadesStatus,
  } = useAPIStatus();
  const {
    isLoadingUserVersion,
    isLoadingChamadosVersion,
    isLoadingLocalidadesVersion,
    apiVersions,
  } = useReleaseData();

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay bg="blackAlpha.500" backdropFilter="blur(8px)" />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Status dos Serviços</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          <VStack spacing={3} align="stretch" mt={2} divider={<Divider />}>
            <StatusLine
              serviceName="Usuários"
              status={usuariosStatus}
              version={apiVersions?.usuarios}
              isLoadingStatus={isLoadingUsuariosStatus}
              isLoadingVersion={isLoadingUserVersion}
            />

            <StatusLine
              serviceName="Chamados"
              status={chamadosStatus}
              version={apiVersions?.chamados}
              isLoadingStatus={isLoadingChamadosStatus}
              isLoadingVersion={isLoadingChamadosVersion}
            />

            <StatusLine
              serviceName="Localidades"
              status={localidadesStatus}
              version={apiVersions?.localidades}
              isLoadingStatus={isLoadingLocalidadesStatus}
              isLoadingVersion={isLoadingLocalidadesVersion}
            />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
