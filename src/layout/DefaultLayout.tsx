import { ReactNode } from "react"
import { Flex, Grid } from "@chakra-ui/react"

import { Footnote } from "@components/Footnote"
import { SideBar } from "@components/SideBar"

interface DefaultLayoutProps {
  children: ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Flex as="main" minHeight="100vh">
      <Grid
        width="100%"
        maxWidth="1440px"
        margin="0 auto"
        templateColumns="auto minmax(0, 1fr)"
        gap={12}
        px="12"
        py="16"
      >
        <SideBar />
        <Flex flexDirection="column">{children}</Flex>
      </Grid>

      <Footnote />
    </Flex>
  )
}
