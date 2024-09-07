import React from "react"
import {  NavLink } from "react-router-dom"
import './header.css'
import logoHeader from "../../assets/Wealth_Health_logo.webp"

const arrayNav = [{ linkNav: "/", titleNav: "Create Employee" },
                  { linkNav: "/list", titleNav: "View Current Employees" }]



export default function Header() {
 
  return (
    <header className='container__header'>
      { logoHeader &&
       <img className='header__logo' src={logoHeader} alt="Logo" />
       }
      <p className='title_logo'>WEALT HEALTH</p>
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
