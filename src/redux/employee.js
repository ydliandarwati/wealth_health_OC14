import { createSlice } from '@reduxjs/toolkit'
// import localStorge from '../data/localStorage'
import { employeeMoock } from '../data/employeeMock'


// employee initial state
const  initialState = {
  employeeList: employeeMoock,
}

 /**
 * creating a slice of the store : allows to define
 * action and reducer for employee
 */
const employeeSlice = createSlice({
  name: 'add',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employeeList.unshift(action.payload)
      // localStorge.setEmployeeStorage(state.employeeList)
    },
  },
})

const employeeReducer = employeeSlice.reducer
const {addEmployee} = employeeSlice.actions
export { employeeReducer, addEmployee }
