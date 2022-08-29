import { render } from "@testing-library/react"

import { EditButton } from "@components/ActionButtons/EditButton"
import { Item } from "@components/ListItem"

import { ListView } from "./index"

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

const renderItem = (item: typeof mockedData[number]) => (
  <Item title={item.title} description={item.description}>
    <Item.Actions item={item}>
      <EditButton onClick={jest.fn()} />
    </Item.Actions>
  </Item>
)

describe("List", () => {
  it("should render with loading state", async () => {
    const { getAllByTestId } = render(
      <ListView isLoading items={mockedData} render={renderItem} />
    )

    const skeletons = getAllByTestId("list-item-skeleton")

    expect(skeletons).toBeTruthy()
  })

  it("should render with data", async () => {
    const { getAllByText } = render(
      <ListView isLoading={false} items={mockedData} render={renderItem} />
    )

    expect(getAllByText(/Title \d/i)).toBeTruthy()
    expect(getAllByText(/Desc \d/i)).toBeTruthy()
  })
})
