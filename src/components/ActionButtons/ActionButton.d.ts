type ReactElement = import("react").ReactElement

interface ActionButton<Item> {
  onClick: (() => void | Promise<void>) | ((item: Item) => void | Promise<void>)
  label?: string
}
