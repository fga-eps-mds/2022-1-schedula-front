import { memo, useMemo } from "react"
import { FaServer } from "react-icons/fa"
import {
  Flex,
  IconButton,
  Text,
  Tooltip,
  useDisclosure
} from "@chakra-ui/react"
import { SWRConfig } from "swr"

import { ServicesStatus } from "@components/Footnote/ServicesStatus"
import { useRequest } from "@hooks/useRequest"
import { Service } from "@services"

type Releases = {
  tag_name: string
  name: string
}

const GithubService = new Service(
  "https://api.github.com",
  "/repos/fga-eps-mds"
)

export const Footnote = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data } = useRequest<Releases[]>(
    process.env.NODE_ENV !== "development"
      ? GithubService.get({
          url: GithubService?.newUrl("/2022-1-schedula-front/releases"),
          withCredentials: false
        })
      : null,
    {
      revalidateIfStale: false
    }
  )

  const version = useMemo(
    () => (data as unknown as Releases[])?.[0]?.tag_name,
    [data]
  )

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
          {version || "dev"}
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

      <SWRConfig
        value={{
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: true
        }}
      >
        <ServicesStatus isOpen={isOpen} onClose={onClose} />
      </SWRConfig>
    </>
  )
})

Footnote.displayName = "Footnote"
