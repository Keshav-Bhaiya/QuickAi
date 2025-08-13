import React from 'react'
import { Outlet, useNavigate  } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'; // Removed Sidebar import
import { useState } from 'react';
import { SignIn, useUser } from '@clerk/clerk-react';
import Sidebar from '../components/Sidebar'; // Import your custom Sidebar component

const Layout = () => {

  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser()

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen bg-white dark:bg-dark-bg'>

      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface'>
        <img className='cursor-pointer w-32 sm:w-44' src={assets.logo} alt="" onClick={() => navigate('/')} />
        {
          sidebar ? <X onClick={() => setSidebar(false)} className='w-6 h-6 text-gray-600 dark:text-dark-text sm:hidden'/>
          : <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-gray-600 dark:text-dark-text sm:hidden' />
        }
      </nav>
      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar setSidebar={setSidebar} sidebar={sidebar}/>
        <div className='flex-1 bg-[#F4F7FB] dark:bg-dark-bg'>
          <Outlet/>
        </div>
      </div>
      
    </div>
  ) :
  (
    <div className='flex items-center justify-center h-screen'>
      <SignIn/>
    </div>
  )
}

export default Layout