import { render, waitFor } from "@testing-library/react"

import { ListItem } from "./index"

const mockedProps = {
  title: "Title",
  description: "Description",
  children: (
    <ListItem.Actions itemName="test" onEdit={jest.fn()} onDelete={jest.fn()} />
  )
}

describe("ListItem", () => {
  it("should render with the passed props", async () => {
    const { getByText } = render(
      <ListItem
        title={mockedProps.title}
        description={mockedProps.description}
      />
    )

    const title = getByText(mockedProps.title)
    const description = getByText(mockedProps.description)

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    await waitFor(() => expect(title).toBeVisible())
    await waitFor(() => expect(description).toBeVisible())
  })

  it("should have actions", async () => {
    const { getByRole } = render(
      <ListItem title={mockedProps.title} description={mockedProps.description}>
        {mockedProps.children}
      </ListItem>
    )

    const actionsBar = getByRole("menubar")
    expect(actionsBar).toBeInTheDocument()
    await waitFor(() => expect(actionsBar).toBeVisible())
  })
})
