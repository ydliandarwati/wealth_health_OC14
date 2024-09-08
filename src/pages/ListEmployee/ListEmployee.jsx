import React, { lazy, Suspense } from "react"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { selectEmployees } from "../../redux/selector"
import { employeeColumns } from '../../components/Table/employeeColumns'
import  './listEmployee.css'


/**
 * Const Table import the component table with lazy for optimize perf.
 *  Lazy call the component when is necessary
 */
const Table = lazy(() => import("../../components/Table/Table"))



export default function ListEmployeePage() {

  //// Use Selector for extract: employee (state)
  const employeState = useSelector(selectEmployees)
  //console.log("state employee:",employeState)
  
   /* hook useMemo for optimize the react speed. useMemo store
    a value in the memory and not re-excute if the value not change */
  const columns = React.useMemo(() => employeeColumns, [])
  const data =  React.useMemo(() => employeState, [employeState])

  return (
    <main>
      <div className="tableContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Table columns={columns} data={data} />
        </Suspense>
      </div>

      <div className="btnContainer">
        <Link to="/"><button>Home</button></Link>
      </div> 
      
    </main>
  )
}
