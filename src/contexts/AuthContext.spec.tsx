/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { render } from "@testing-library/react"

import { AuthProvider, useAuth } from "@contexts/AuthContext"

// const mocked_credentials = {
//   username: "test",
//   password: "test"
// }

const MockedComponent = () => {
  const { isAuthenticated, signIn } = useAuth()

  // async function handleLogin() {
  //   await signIn(mocked_credentials)
  // }

  return (
    <div>
      <p>{isAuthenticated ? "Autenticado" : "Não Autenticado"}</p>
      {/* <button onClick={handleLogin}>Login</button> */}
    </div>
  )
}

jest.mock("@services/apiClient")

describe("AuthContext", () => {
  it("should not be authenticated by default", () => {
    const { getByText } = render(
      <AuthProvider>
        <MockedComponent />
      </AuthProvider>
    )

    const isAuthenticated = getByText("Não Autenticado")

    expect(isAuthenticated).toBeInTheDocument()
  })

  // it("should be able to authenticate", async () => {
  //   const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>
  //   mockedApiClient.post.mockResolvedValue({ token: "abc" })

  //   const { getByText } = render(
  //     <AuthProvider>
  //       <MockedComponent />
  //     </AuthProvider>
  //   )

  //   const loginButton = getByText("Login")

  //   loginButton.click()

  //   await waitFor(() => expect(getByText("Autenticado")).toBeInTheDocument())
  // })
})
