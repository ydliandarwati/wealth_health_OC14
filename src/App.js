
import React, { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"

import AddEmployee from "./pages/AddEmployee/AddEmployee"
import ListEmployee from "./pages/ListEmployee/ListEmployee"

// import Error from "./pages/Error/Error"

import './styles/normalize.css'
import './styles/global.css'


// lazy call: better performance, component called when  necessary
const Header = lazy(() => import("./components/Header/Header"))



export default function App() {
  return (
    <>  
      <Suspense fallback={<p>Loading...</p>}>
        <Header/> 
       </Suspense>
        <Routes> 
          <Route exact path="/" element={<AddEmployee />}/>
		  <Route exact path="/list" element={<ListEmployee />}/>

          {/* <Route path="*" element={<Error />}/> */}
        </Routes>
    </>
  )
}
