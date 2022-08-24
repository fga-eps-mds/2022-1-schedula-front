import { act } from "react-dom/test-utils"
import { fireEvent, render, waitFor } from "@testing-library/react"

import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { EditButton } from "@components/ActionButtons/EditButton"

import { Actions } from "./index"

const mockedProps = {
  item: {
    name: "item name",
    someKey: "someKey",
    anotherKey: "anotherKey"
  },
  callback: jest.fn((item) => item)
}

describe("ListItemActions", () => {
  it("should render into the document", () => {
    render(
      <Actions<typeof mockedProps.item> item={mockedProps.item}>
        <EditButton onClick={mockedProps.callback} />
        <DeleteButton onClick={mockedProps.callback} />
      </Actions>
    )
  })

  it("should invoke the callback with the passed item", () => {
    const { getByRole } = render(
      <Actions<typeof mockedProps.item> item={mockedProps.item}>
        <EditButton onClick={mockedProps.callback} />
      </Actions>
    )

    const editButton = getByRole("button", { name: /edit/i })
    expect(editButton).toBeInTheDocument()
    expect(editButton).toBeVisible()

    fireEvent.click(editButton)

    expect(mockedProps.callback).toHaveBeenCalled()
    expect(mockedProps.callback.mock.results[0].value).toEqual(mockedProps.item)
  })

  it("should invoke the callback", async () => {
    const { getByRole, getByTestId, getByText } = render(
      <Actions<typeof mockedProps.item> item={mockedProps.item}>
        <DeleteButton
          onClick={mockedProps.callback}
          label={mockedProps.item.name}
        />
      </Actions>
    )

    const deleteButton = getByRole("button", { name: /delete/i })
    expect(deleteButton).toBeInTheDocument()
    expect(deleteButton).toBeVisible()

    fireEvent.click(deleteButton)

    const confirmationPopover = getByTestId("delete-confirmation-popover")
    expect(confirmationPopover).toBeInTheDocument()
    await waitFor(() => expect(confirmationPopover).toBeVisible())

    expect(getByText(mockedProps.item.name)).toBeInTheDocument()

    await act(async () => {
      const confirmActionButton = getByRole("button", { name: /apagar/i })
      expect(confirmActionButton).toBeInTheDocument()
      expect(confirmActionButton).toBeVisible()

      fireEvent.click(confirmActionButton)

      expect(mockedProps.callback).toHaveBeenCalled()
      expect(mockedProps.callback.mock.results[0].value).toEqual(
        mockedProps.item
      )
    })
  })
})
