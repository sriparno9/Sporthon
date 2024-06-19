
import React, { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import NavbarAdmin from './components/Navbar_Admin/Navbar'


const AppNew = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
    <div>
    <NavbarAdmin expanded={expanded} setExpanded={setExpanded}/>
    
    <div className='flex h-[100%]'>
    <Sidebar expanded={expanded} setExpanded={setExpanded}/>
    <Outlet/>
    </div>
    </div>
    
    </>
  )
}

export default AppNew;
