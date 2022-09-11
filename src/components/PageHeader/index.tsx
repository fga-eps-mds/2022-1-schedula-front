import { memo } from "react"
import { Box, Flex, Heading } from "@chakra-ui/react"

interface PageHeaderProps {
  title: string
  subtitle?: string | JSX.Element
  children?: React.ReactNode
}

export const PageHeader = memo(
  ({ title, subtitle, children }: PageHeaderProps) => {
    return (
      <Flex justifyContent="space-between" marginBottom={8}>
        <Box>
          <Heading>{title}</Heading>
          {subtitle}
        </Box>

        <Box>{children}</Box>
      </Flex>
    )
  },
  (prevProps, nextProps) =>
    prevProps.title === nextProps.title &&
    prevProps.subtitle === nextProps.subtitle
)

PageHeader.displayName = "PageHeader"
