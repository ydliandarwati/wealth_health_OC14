import React, { lazy, Suspense } from "react"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { tableColumns } from '../../components/Table/tableColumns'
import  './listEmployee.css'

const Table = lazy(() => import("../../components/Table/Table"))


export default function ListEmployeePage() {

  // Use Selector for extract: employee (state)
  const employeeList = useSelector((state) =>  state.employeeList);
  
// useMemo for performance: it stores value in the memory, no need to recalculate if not necessary
  const columnNames = React.useMemo(() => tableColumns, [])
  const data =  React.useMemo(() => employeeList, [employeeList])

  return (
    <main>
      <div className="tableContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Table columns={columnNames} data={data} />
        </Suspense>
      </div>

      <div className="btnContainer">
        <Link to="/"><button>Home</button></Link>
      </div> 
      
    </main>
  )
}
