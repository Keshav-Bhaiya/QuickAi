import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {SignIn, useClerk,UserButton,useUser} from '@clerk/clerk-react'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()


  return (
    <div className='fixed z-50 w-full backdrop-blur-2xl bg-white/80 dark:bg-dark-bg/80 border-b border-gray-200 dark:border-dark-border flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
      <img onClick={()=>navigate('/')} className='w-32 sm:w-44 cursor-pointer' src={assets.logo} alt="logo" />

      <div className='flex items-center gap-3'>
        <ThemeToggle />
      {
        user ? <UserButton/> :(
            <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary hover:bg-primary/90 text-white px-10 py-2.5 transition-colors'>Get started
          <ArrowRight className='w-4 h-4'/></button>
        )
      }
      </div>
    </div>
  )
}

export default Navbar