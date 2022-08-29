import { render, waitFor } from "@testing-library/react"

import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { EditButton } from "@components/ActionButtons/EditButton"

import { Item } from "./index"

const callback = jest.fn((item) => item)
const mockedProps = {
  item: {
    title: "item name",
    description: "item desc"
  }
}

describe("Item", () => {
  it("should render with the passed props", async () => {
    const { getByText } = render(
      <Item
        title={mockedProps.item.title}
        description={mockedProps.item.description}
      />
    )

    const title = getByText(mockedProps.item.title)
    const description = getByText(mockedProps.item.description)

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    await waitFor(() => expect(title).toBeVisible())
    await waitFor(() => expect(description).toBeVisible())
  })

  it("should have actions", async () => {
    const { getByRole } = render(
      <Item
        title={mockedProps.item.title}
        description={mockedProps.item.description}
      >
        <Item.Actions item={mockedProps.item}>
          <EditButton onClick={callback} />
          <DeleteButton onClick={callback} />
        </Item.Actions>
      </Item>
    )

    const actionsBar = getByRole("menubar")
    expect(actionsBar).toBeInTheDocument()
    await waitFor(() => expect(actionsBar).toBeVisible())
  })
})
