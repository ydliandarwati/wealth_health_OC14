import React from "react"
import {  NavLink } from "react-router-dom"
import './header.css'
import logoHeader from "../../assets/logo.png"

const arrayNav = [{ linkNav: "/", titleNav: "Create Employee" },
                  { linkNav: "/list", titleNav: "View Current Employees" }]



export default function Header() {
 
  return (
    <header className='headerContainer'>
      { logoHeader &&
       <img className='header_logo' src={logoHeader} alt="Logo" />
       }
	   {/* <link rel="preload"  href="../../assets/logo.png"	 /> */}

      {/* <p className='title_logo'>WEALT HEALTH</p> */}
      <p className='title'>HRnet   </p>
      <nav>   
        <ul className='header__nav__ul'>
        {arrayNav.map((nav, index) => (
          <li className='header__nav__ul--li' key={`${index}-${nav.linkNav}`}>
            <NavLink className={({ isActive }) => {
            return isActive ? 'navLink_active' : 'link'
          }} to={nav.linkNav}
            >{nav.titleNav}</NavLink></li> 
        ))}
        </ul>
      </nav>   
    </header>
  )
}
