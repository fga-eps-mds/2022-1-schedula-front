import {
  Badge,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Skeleton,
  Text,
  VStack
} from "@chakra-ui/react"

import { useRequest } from "@hooks/useRequest"
import { detalhadorApi, localidadesApi, usuariosApi } from "@services/api"
import { serviceStatus } from "@services/request"

interface ServicesStatusProps {
  isOpen: boolean
  onClose: () => void
}

export const ServicesStatus = ({ isOpen, onClose }: ServicesStatusProps) => {
  const {
    data: chamadosStatus,
    isLoading: isLoadingChamadosStatus,
    error: errorChamados
  } = useRequest<ServiceStatus>(
    serviceStatus(detalhadorApi.defaults.baseURL as string),
    detalhadorApi
  )

  const {
    data: usuariosStatus,
    isLoading: isLoadingUsuariosStatus,
    error: errorUsuarios
  } = useRequest<ServiceStatus>(
    serviceStatus(usuariosApi.defaults.baseURL as string),
    usuariosApi
  )

  const {
    data: localidadesStatus,
    isLoading: isLoadingLocalidadesStatus,
    error: errorLocalidades
  } = useRequest<ServiceStatus>(
    serviceStatus(localidadesApi.defaults.baseURL as string),
    localidadesApi
  )

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="sm">
      <DrawerOverlay
        bg="blackAlpha.400"
        backdropFilter="blur(8px) hue-rotate(10deg)"
      />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Status dos Serviços</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          <VStack spacing={3} align="stretch" mt={2} divider={<Divider />}>
            <HStack spacing={2}>
              <Skeleton isLoaded={!isLoadingUsuariosStatus}>
                <Badge
                  fontSize="sm"
                  variant="subtle"
                  colorScheme={errorUsuarios ? "red" : "green"}
                >
                  {errorUsuarios ? "OFF" : "ON"}
                </Badge>
              </Skeleton>
              <Text>Usuários</Text>
            </HStack>

            <HStack spacing={2}>
              <Skeleton isLoaded={!isLoadingChamadosStatus}>
                <Badge
                  fontSize="sm"
                  variant="subtle"
                  colorScheme={errorChamados ? "red" : "green"}
                >
                  {errorChamados ? "OFF" : "ON"}
                </Badge>
              </Skeleton>
              <Text>Chamados</Text>
            </HStack>

            <HStack spacing={2}>
              <Skeleton isLoaded={!isLoadingLocalidadesStatus}>
                <Badge
                  fontSize="sm"
                  variant="subtle"
                  colorScheme={errorLocalidades ? "red" : "green"}
                >
                  {errorLocalidades ? "OFF" : "ON"}
                </Badge>
              </Skeleton>
              <Text>Localidades</Text>
            </HStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
