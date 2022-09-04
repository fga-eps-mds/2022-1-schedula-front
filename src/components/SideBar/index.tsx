import { useSession } from "next-auth/react"
import { FaRegUser } from "react-icons/fa"
import { RiLogoutCircleFill } from "react-icons/ri"
import { Box, Divider, Flex, Heading, Text, VStack } from "@chakra-ui/react"

import { routes } from "@routes"

import { SideBarItem } from "./SidebarItem/SideBarItem"

export const SideBar = () => {
  const session = useSession()

  return (
    <Flex
      flexDirection="column"
      gap={2}
      width={"fit-content"}
      height="100%"
      maxHeight="calc(100vh - 8rem)" // 4rem padding 2x
      position="sticky"
      top={16}
    >
      <Heading margin="0 auto" textAlign="center" fontWeight="hairline">
        Schedula
      </Heading>
      <Divider />

      <VStack spacing={4} align="stretch">
        {routes.map((route) => (
          <SideBarItem key={route.label} {...route} />
        ))}
      </VStack>

      <Box marginTop="auto">
        <Divider marginBottom={2} />
        <Flex gap={2} justifyContent={"space-between"} alignItems={"center"}>
          <FaRegUser size={25} />
          <Text maxWidth={140} noOfLines={1}>
            {session.data?.user?.name ?? "Nome do user"}
          </Text>
          <RiLogoutCircleFill size={25} />
        </Flex>
      </Box>
    </Flex>
  )
}
