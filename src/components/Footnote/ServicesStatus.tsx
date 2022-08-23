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

import { useServicesData } from "@components/Footnote/useServicesData"

interface ServicesStatusProps {
  isOpen: boolean
  onClose: () => void
}

export const ServicesStatus = ({ isOpen, onClose }: ServicesStatusProps) => {
  const {
    errorUsuarios,
    errorChamados,
    errorLocalidades,
    isLoadingChamadosStatus,
    isLoadingUsuariosStatus,
    isLoadingLocalidadesStatus,
    apiVersions
  } = useServicesData()

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
              <Text>
                Usuários{" "}
                <Badge textTransform="lowercase" ml={1}>
                  {apiVersions?.usuarios}
                </Badge>
              </Text>
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
              <Text>
                Chamados{" "}
                <Badge textTransform="lowercase" ml={1}>
                  {apiVersions?.chamados}
                </Badge>
              </Text>
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
              <Text>
                Localidades{" "}
                <Badge textTransform="lowercase" ml={1}>
                  {apiVersions?.localidades || "Not Released"}
                </Badge>
              </Text>
            </HStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
