import { useState } from 'react'
import Navbar from './Navbar'
import SideBar from './Sidebar'


function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
    return (
        <div className="min-h-screen">
        <Navbar toggle ={toggle}/>
            <SideBar  toggle ={toggle} isOpen={isOpen}/>
            <div className="p-6 pt-16">
                {children}
            </div>
        </div>
    )
}

export default Layout