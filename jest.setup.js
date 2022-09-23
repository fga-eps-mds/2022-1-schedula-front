import "@testing-library/jest-dom/extend-expect"
import "@testing-library/jest-dom"

// Mock IntersectionObserver
class IntersectionObserver {
  observe = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver
})

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver
})

jest.mock("react-render-if-visible", () => ({ children }) => {
  return <>{children}</>
})
