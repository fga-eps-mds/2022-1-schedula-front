import { fireEvent, render, waitFor } from "@testing-library/react"

import { Actions } from "./index"

const mockedProps = {
  itemName: "item",
  onEdit: () => {
    return
  },
  onDelete: async () => {
    return
  },
  onAdd: () => {
    return
  }
}

describe("ListItemActions", () => {
  it("should render into the document", () => {
    render(
      <Actions
        itemName={mockedProps.itemName}
        onEdit={mockedProps.onEdit}
        onDelete={mockedProps.onDelete}
        onAdd={mockedProps.onAdd}
      />
    )
  })

  it("should render the all actions", () => {
    const { getByLabelText } = render(
      <Actions
        itemName={mockedProps.itemName}
        onEdit={mockedProps.onEdit}
        onDelete={mockedProps.onDelete}
        onAdd={mockedProps.onAdd}
      />
    )
    // add action
    const addButton = getByLabelText("Add")

    expect(addButton).toBeInTheDocument()
    expect(addButton).toBeVisible()

    // edit action
    const editButton = getByLabelText("Edit")

    expect(editButton).toBeInTheDocument()
    expect(editButton).toBeVisible()

    // delete action
    const deleteButton = getByLabelText("Delete")

    expect(deleteButton).toBeInTheDocument()
    expect(deleteButton).toBeVisible()
  })

  it("should not show the add button if onAddProp is not defined", () => {
    const { queryByLabelText } = render(
      <Actions
        itemName={mockedProps.itemName}
        onEdit={mockedProps.onEdit}
        onDelete={mockedProps.onDelete}
      />
    )

    expect(queryByLabelText(`Add`)).toBeNull()
  })

  it("should show a popover when delete action is used", async () => {
    const { getByLabelText, getByTestId } = render(
      <Actions
        itemName={mockedProps.itemName}
        onEdit={mockedProps.onEdit}
        onDelete={mockedProps.onDelete}
        onAdd={mockedProps.onAdd}
      />
    )

    const deleteConfirmationPopover = getByTestId("delete-confirmation-popover")

    //"Should be in the document but not visible yet"
    expect(deleteConfirmationPopover).toBeInTheDocument()
    expect(deleteConfirmationPopover).not.toBeVisible()

    //"Click the delete button and make sure the popover is visible"
    fireEvent.click(getByLabelText("Delete"))

    await waitFor(() => {
      expect(getByTestId("delete-confirmation-popover")).toBeVisible()
    })
  })
})
