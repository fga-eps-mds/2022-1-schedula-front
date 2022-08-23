import { ReactElement } from "react"
import { StackProps, VStack } from "@chakra-ui/react"

import { ListItemProps } from "@components/ListItem"
import { ListItemSkeleton } from "@components/ListItem/LIstItemSkeleton"

interface ListProps<Data> extends StackProps {
  isLoading: boolean
  children:
    | ReactElement<ListItemProps<Data>>
    | ReactElement<ListItemProps<Data>>[]
    | undefined
}

export const List = <Data,>({
  children,
  isLoading,
  ...props
}: ListProps<Data>) => {
  return (
    <VStack align="stretch" spacing={6} {...props}>
      {children}
      {isLoading && <ListItemSkeleton />}
    </VStack>
  )
}
