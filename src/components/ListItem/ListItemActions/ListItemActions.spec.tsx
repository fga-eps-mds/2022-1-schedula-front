import { fireEvent, render, waitFor } from "@testing-library/react"

import { Actions } from "./index"

const mockedProps = {
  itemName: "item name",
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onAdd: jest.fn()
}

describe("ListItemActions", () => {
  it("should render into the document", () => {
    render(
      <Actions
        itemName={mockedProps.itemName}
        onEdit={mockedProps.onEdit}
        onDelete={mockedProps.onDelete}
      />
    )
  })

  it("should invoke the onEdit callback", () => {
    const { getByRole } = render(
      <Actions
        itemName={mockedProps.itemName}
        onEdit={mockedProps.onEdit}
        onDelete={mockedProps.onDelete}
      />
    )

    const editButton = getByRole("button", { name: /edit/i })
    expect(editButton).toBeInTheDocument()
    expect(editButton).toBeVisible()

    fireEvent.click(editButton)

    expect(mockedProps.onEdit).toHaveBeenCalled()
  })

  it("should invoke the onDelete callback", async () => {
    const { getByRole, getByTestId, getByText } = render(
      <Actions
        itemName={mockedProps.itemName}
        onEdit={mockedProps.onEdit}
        onDelete={mockedProps.onDelete}
      />
    )

    const deleteButton = getByRole("button", { name: /delete/i })
    expect(deleteButton).toBeInTheDocument()
    expect(deleteButton).toBeVisible()

    fireEvent.click(deleteButton)

    const confirmationPopover = getByTestId("delete-confirmation-popover")
    expect(confirmationPopover).toBeInTheDocument()
    await waitFor(() => expect(confirmationPopover).toBeVisible())

    expect(getByText(mockedProps.itemName)).toBeInTheDocument()

    const confirmActionButton = getByRole("button", { name: /apagar/i })
    expect(confirmActionButton).toBeInTheDocument()
    expect(confirmActionButton).toBeVisible()

    fireEvent.click(confirmActionButton)

    expect(mockedProps.onDelete).toHaveBeenCalled()
  })

  it("should invoke the onAdd callback", () => {
    const { getByRole } = render(
      <Actions
        itemName={mockedProps.itemName}
        onEdit={mockedProps.onEdit}
        onDelete={mockedProps.onDelete}
        onAdd={mockedProps.onAdd}
      />
    )

    const addButton = getByRole("button", { name: /add/i })
    expect(addButton).toBeInTheDocument()
    expect(addButton).toBeVisible()

    fireEvent.click(addButton)

    expect(mockedProps.onAdd).toHaveBeenCalled()
  })
})
