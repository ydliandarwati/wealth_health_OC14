import App from "../App"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { render, screen } from '@testing-library/react'
import { MemoryRouter} from "react-router-dom"


// test to check the route
describe("When url is \"/\"", () => {
  test("main page (create employee page) should be displayed.", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <App />
        </Provider>
        </MemoryRouter>
    )
    const saveBtn = screen.getByText("Save")
    expect(saveBtn).toBeInTheDocument()
  })
})

describe("When url doesn't exist", () => {
  test("error page should be displayed", () => {
    render(
      <MemoryRouter initialEntries={["/fgfgf"]}>
        <Provider store={store}>
          <App />
        </Provider>
        </MemoryRouter>
    )
    const errorMsg = screen.getByText("404")
    expect(errorMsg).toBeInTheDocument()
  })
})

describe("When url is \"/list\"", () => {
  test("list of employees should be displayed", () => {
    render(
      <MemoryRouter initialEntries={["/list"]}>
        <Provider store={store}>
          <App />
        </Provider>
        </MemoryRouter>
    )
    const home = screen.getByText("Home")
    expect(home).toBeInTheDocument()
  })
})




