type ReactElement = import("react").ReactElement

interface ActionButton<Item> {
  onClick: (item: Item) => void | Promise<void>
  label?: string
}
