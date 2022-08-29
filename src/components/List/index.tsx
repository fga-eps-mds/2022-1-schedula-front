import { ReactElement } from "react"
import { Fade, List, ListItem, ListProps } from "@chakra-ui/react"

import { ItemProps } from "@components/ListItem"
import { ListItemSkeleton } from "@components/ListItem/ListItemSkeleton"

interface ListViewProps<Data> extends ListProps {
  items: Data[] | undefined
  render: (item: Data) => ReactElement<ItemProps<Data>>
  isLoading: boolean
}

export const ListView = <Data,>({
  items,
  render,
  isLoading,
  ...props
}: ListViewProps<Data>) => {
  return (
    <List spacing={6} {...props}>
      {items?.map((item, key) => (
        <Fade in key={key}>
          <ListItem>{render(item)}</ListItem>
        </Fade>
      ))}

      {isLoading &&
        Array.from({ length: 4 }, (_, key) => <ListItemSkeleton key={key} />)}
    </List>
  )
}
