import {  render,screen, waitFor} from "@testing-library/react"
import { act } from "react";
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import ListEmployee from "../pages/ListEmployee/ListEmployee"


describe("Given the user is on the employee list page",() => {	
  test("should display the table",async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <ListEmployee />
          </BrowserRouter>
        </Provider>	
      )
    })  
    await waitFor(() => expect(screen.getAllByText('Yunita')))
  })
})

