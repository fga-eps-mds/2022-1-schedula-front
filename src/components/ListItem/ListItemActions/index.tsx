import { Children, cloneElement, ReactElement } from "react"
import { HStack } from "@chakra-ui/react"

export interface ActionsProps<Data> {
  item: Data
  children:
    | ReactElement<ActionButton<Data>>
    | ReactElement<ActionButton<Data>>[]
    | null
}

export const Actions = <Data,>({ children, item }: ActionsProps<Data>) => {
  return (
    <HStack spacing={4} role="menubar">
      {Children.map(
        children,
        (child) =>
          child &&
          cloneElement(child, {
            onClick: child?.props?.onClick?.bind?.(null, item)
          })
      )}
    </HStack>
  )
}
