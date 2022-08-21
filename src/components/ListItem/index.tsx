import React, { ReactElement } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

import type { ActionsProps } from "@components/ListItem/ListItemActions"
import { Actions } from "@components/ListItem/ListItemActions"

type ListItemProps = {
  title: string | JSX.Element
  description: string | JSX.Element
  children?: ReactElement<ActionsProps>
}

export const Divider = {
  content: "''",
  position: "absolute",
  bottom: "0",
  width: "300px",
  height: "1px",
  backgroundColor: "#e6e6e6"
}

export const ListItem = ({ title, description, children }: ListItemProps) => {
  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      bg="white"
      borderRadius="md"
      padding={5}
      boxShadow="medium"
    >
      <Box>
        <Text fontWeight="medium" mb={1} position="relative" _before={Divider}>
          {title}
        </Text>
        <Text color="GrayText">{description}</Text>
      </Box>

      <Box alignSelf="end">{children}</Box>
    </Flex>
  )
}

ListItem.Actions = Actions
