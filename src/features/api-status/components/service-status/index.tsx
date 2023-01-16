import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
} from '@chakra-ui/react';
import { StatusLine } from '@/features/api-status/components/status-line';
import { useAPIStatus } from '@/features/api-status/hooks/use-api-status';
import { useReleaseData } from '@/features/api-status/hooks/use-release-data';

interface ServicesStatusProps {
  isOpen: boolean;
  onClose: () => void;
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
