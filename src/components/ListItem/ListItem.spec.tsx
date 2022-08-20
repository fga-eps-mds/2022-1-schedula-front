import { render } from "@testing-library/react"

import { ListItem } from "./index"

const mockedProps = {
  title: "Title",
  description: "Description",
  children: "Hello"
}

describe("ListItem", () => {
  it("should render into the document", () => {
    render(
      <ListItem title={mockedProps.title} description={mockedProps.description}>
        {mockedProps.children}
      </ListItem>
    )
  })

  it("should render the passed props", () => {
    const { getByText } = render(
      <ListItem title={mockedProps.title} description={mockedProps.description}>
        {mockedProps.children}
      </ListItem>
    )

    expect(getByText(mockedProps.title)).toBeInTheDocument()
    expect(getByText(mockedProps.description)).toBeInTheDocument()
    expect(getByText(mockedProps.children)).toBeInTheDocument()
  })

  it("should be visible", () => {
    const { getByText } = render(
      <ListItem title={mockedProps.title} description={mockedProps.description}>
        {mockedProps.children}
      </ListItem>
    )

    expect(getByText(mockedProps.title)).toBeVisible()
    expect(getByText(mockedProps.description)).toBeVisible()
    expect(getByText(mockedProps.children)).toBeVisible()
  })
})
