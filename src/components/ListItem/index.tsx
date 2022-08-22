import React, { ReactElement } from "react"
import { Box, Fade, Flex } from "@chakra-ui/react"

import type { ActionsProps } from "@components/ListItem/ListItemActions"
import { Actions } from "@components/ListItem/ListItemActions"

export interface ListItemProps {
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
    <Fade in>
      <Flex
        w="100%"
        justifyContent="space-between"
        position="relative"
        bg="white"
        borderRadius="md"
        padding={5}
        boxShadow="medium"
      >
        <Box alignSelf="center">
          <Box fontWeight="medium" mb={1} position="relative" _before={Divider}>
            {title}
          </Box>
          <Box color="GrayText">{description}</Box>
        </Box>

        <Box alignSelf="end">{children}</Box>
      </Flex>
    </Fade>
  )
}

ListItem.Actions = Actions
