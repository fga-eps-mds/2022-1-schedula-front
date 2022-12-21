import { memo, ReactElement } from "react"
import RenderIfVisible from "react-render-if-visible"
import { Fade, List, ListItem, ListProps } from "@chakra-ui/react"

import { ItemProps } from "@components/ListItem"
import { ListItemSkeleton } from "@components/ListItem/ListItemSkeleton"

interface ListViewProps<Data> extends ListProps {
  items: Data[] | undefined
  render: (item: Data) => ReactElement<ItemProps<Data>>
  isLoading: boolean
}

const typedMemo: <T>(Component: T) => T = memo

export const ListView = typedMemo(
  <Data,>({ items, render, isLoading, ...props }: ListViewProps<Data>) => {
    return (
      <List spacing={6} {...props}>
        {items &&
          items?.map((item, key) => (
            <RenderIfVisible defaultHeight={92 /* magic number */} key={key}>
              <Fade in>
                <ListItem>{render(item)}</ListItem>
              </Fade>
            </RenderIfVisible>
          ))}

        {isLoading &&
          Array.from({ length: 4 }, (_, key) => (
            <RenderIfVisible
              defaultHeight={92 /* magic number */}
              visibleOffset={0}
              key={key}
            >
              <ListItemSkeleton key={key} />
            </RenderIfVisible>
          ))}
      </List>
    )
  }
)
