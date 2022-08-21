import { render } from "@testing-library/react"

import { ListItem } from "./index"

const mockedProps = {
  title: "Title",
  description: "Description",
  children: (
    <ListItem.Actions itemName="test" onEdit={jest.fn()} onDelete={jest.fn()} />
  )
}

describe("ListItem", () => {
  it("should render with the passed props", () => {
    const { getByText } = render(
      <ListItem
        title={mockedProps.title}
        description={mockedProps.description}
      />
    )

    expect(getByText(mockedProps.title)).toBeInTheDocument()
    expect(getByText(mockedProps.description)).toBeInTheDocument()
  })

  it("should have actions", () => {
    const { getByText, getByRole } = render(
      <ListItem title={mockedProps.title} description={mockedProps.description}>
        {mockedProps.children}
      </ListItem>
    )

    expect(getByText(mockedProps.title)).toBeVisible()
    expect(getByText(mockedProps.description)).toBeVisible()

    const actionsBar = getByRole("menubar")
    expect(actionsBar).toBeInTheDocument()
    expect(actionsBar).toBeVisible()
  })
})
