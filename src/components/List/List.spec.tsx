import { render } from "@testing-library/react"

import { ListItem } from "@components/ListItem"

import { List } from "./index"

const mockedData = [
  {
    title: "Title 1",
    description: "Desc 1"
  },
  {
    title: "Title 2",
    description: "Desc 2"
  }
]

describe("List", () => {
  it("should render with loading state", async () => {
    const { getAllByTestId } = render(<List isLoading>{undefined}</List>)

    const skeletons = getAllByTestId("list-item-skeleton")

    expect(skeletons).toBeTruthy()
  })

  it("should render with data", async () => {
    const { getAllByText } = render(
      <List isLoading>
        {mockedData?.map?.((item, key) => (
          <ListItem title={item.title} description={item.description} key={key}>
            <ListItem.Actions
              itemName={item.title}
              onEdit={jest.fn()}
              onDelete={jest.fn()}
            />
          </ListItem>
        ))}
      </List>
    )

    expect(getAllByText(/Title \d/i)).toBeTruthy()
    expect(getAllByText(/Desc \d/i)).toBeTruthy()
  })
})
