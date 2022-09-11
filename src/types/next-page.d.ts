type NextPage = import("next").NextPage

type ReactElement = import("react").ReactElement

type NextPageWithProps = NextPage & {
  getLayout?: (page: ReactElement) => JSX.Element
  access?: Access[]
}
