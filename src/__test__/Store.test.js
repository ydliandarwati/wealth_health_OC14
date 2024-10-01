import { addEmployee, initialState, employeeReducer } from "../redux/employee"

const employee_test = [{
    id: 1,
    firstName: "Yunita",
    lastName: "Liandarwati",
    dateOfBirth: "04/05/1992",
    street: "40 rue d'Astorg",
    city: "Paris",
    state: "Texas",
    stateAbbrev: "TX",
    zipCode: "35083",
    startDate: "02/05/2023",
    department: "Sales"
}]


describe("Redux action test",() => {
    test("adding employee is launched", () => {
        expect(addEmployee(employee_test)).toEqual({
          type: "add/addEmployee",
          payload: employee_test,
        })
      })
})


describe("Redux reducer test", () => {
    it("new employee is added to the store", async () => {
        employeeReducer(initialState, addEmployee(employee_test))
        expect(
        employeeReducer(initialState, addEmployee(employee_test)).employeeList[0]
        ).toEqual(employee_test) 
    })
})
