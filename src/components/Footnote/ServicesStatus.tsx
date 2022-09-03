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
  VStack
} from "@chakra-ui/react"

import { useServicesData } from "@components/Footnote/useServicesData"

interface ServicesStatusProps {
  isOpen: boolean
  onClose: () => void
}

interface StatusLineProps {
  serviceName: string
  status: boolean
  version: string
  isLoadingStatus: boolean
  isLoadingVersion: boolean
}

const StatusLine = ({
  serviceName,
  status,
  version,
  isLoadingStatus,
  isLoadingVersion
}: StatusLineProps) => {
  return (
    <Flex gap={2}>
      <Skeleton isLoaded={!isLoadingStatus}>
        <Badge
          fontSize="sm"
          variant="subtle"
          colorScheme={status ? "green" : "red"}
        >
          {status ? "ON" : "OFF"}
        </Badge>
      </Skeleton>

      <Text>{serviceName}</Text>

      {process.env.NODE_ENV === "production" && (
        <Skeleton isLoaded={!isLoadingVersion}>
          <Badge
            variant="outline"
            textTransform="lowercase"
            fontWeight="medium"
          >
            {version || "Not Released"}
          </Badge>
        </Skeleton>
      )}

      {process.env.NODE_ENV === "development" && (
        <Box ml="auto">
          <Badge colorScheme="pink" variant="outline" textTransform="lowercase">
            dev
          </Badge>
        </Box>
      )}
    </Flex>
  )
}

export const ServicesStatus = ({ isOpen, onClose }: ServicesStatusProps) => {
  const {
    usuariosStatus,
    chamadosStatus,
    localidadesStatus,
    isLoadingChamadosStatus,
    isLoadingUsuariosStatus,
    isLoadingLocalidadesStatus,
    isLoadingUserVersion,
    isLoadingChamadosVersion,
    isLoadingLocalidadesVersion,
    apiVersions
  } = useServicesData()

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay
        bg="blackAlpha.400"
        backdropFilter="blur(8px) hue-rotate(10deg)"
      />
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
  )
}
