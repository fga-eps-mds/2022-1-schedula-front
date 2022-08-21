import { ReactElement } from "react"
import { StackProps, VStack } from "@chakra-ui/react"

import { ListItemProps } from "@components/ListItem"
import { ListItemSkeleton } from "@components/ListItem/LIstItemSkeleton"

interface ListProps extends StackProps {
  isLoading: boolean
  children:
    | ReactElement<ListItemProps>[]
    | ReactElement<ListItemProps>
    | undefined
}

export const List = ({ children, isLoading, ...props }: ListProps) => {
  return (
    <VStack align="stretch" spacing={6} {...props}>
      {children}
      {isLoading && <ListItemSkeleton />}
    </VStack>
  )
}
