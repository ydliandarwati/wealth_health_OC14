import { createSlice } from '@reduxjs/toolkit'
import { employeeMoock } from '../data/employeeMock'


// employee initial state
const  initialState = {
  employeeList: employeeMoock,
}


const employeeSlice = createSlice({
  name: 'add',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employeeList.unshift(action.payload)
    },
  },
})

const employeeReducer = employeeSlice.reducer
const {addEmployee} = employeeSlice.actions
export { employeeReducer, addEmployee }
