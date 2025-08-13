import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  {to: '/ai', label: 'Dashboard', Icon: House},
  {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen},
  {to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash},
  {to: '/ai/generate-images', label: 'Generate Images', Icon: Image},
  {to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser},
  {to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors},
  {to: '/ai/review-resume', label: 'Review Resume', Icon: FileText},
  {to: '/ai/community', label: 'Community', Icon: Users},
]

const Sidebar = ({sidebar, setSidebar}) => {
  const {user} = useUser()
  const {signOut, openUserProfile} = useClerk()

  return (
    <div className={`w-60 bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-dark-border flex flex-col justify-between items-center max-sm:absolute max-sm:top-14 max-sm:bottom-0 max-sm:z-10
    ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
      <div className='my-7 w-full'>
        <img className='w-13 h-13 rounded-full mx-auto' src={user?.imageUrl} alt="User avatar" />
        <h1 className='mt-1 text-center text-sm font-medium text-gray-900 dark:text-dark-text'>{user?.fullName}</h1>
        <div className='mt-6  px-6 text-sm text-gray-600 dark:text-dark-text-secondary font-medium'>
          {navItems.map((item) => (
            <NavLink 
              key={item.to} 
              to={item.to} 
              end={item.to === '/ai'} 
              onClick={() => setSidebar(false)}
              className={({isActive}) => `
                px-3.5 py-2.5 mb-2 flex items-center gap-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white shadow-md' 
                  : 'text-gray-600 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-card'
                }
              `}
            >
              {({isActive}) => (
                <>
                  <item.Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`}/>
                  <span className='text-sm font-medium'>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      
       <div className='w-full border-t border-gray-200 dark:border-dark-border p-4 px-7 flex items-center justify-between'>
        <div className='flex gap-2 items-center cursor-pointer' onClick={openUserProfile}>
          <img className='w-8 rounded-full' src={user.imageUrl} alt="" />
          <div>
            <h1 className='text-sm font-medium text-gray-900 dark:text-dark-text'>{user.fullName}</h1>
            <p className='text-xs text-gray-500 dark:text-dark-text-muted'>
              <Protect plan='premium' fallback='Free'>Premium</Protect>
              Plan
            </p>
          </div>
        </div>
        <LogOut className='w-4.5 text-gray-400 dark:text-dark-text-muted hover:text-gray-700 dark:hover:text-dark-text
        transition cursor-pointer' onClick={signOut}/>

       </div>
    </div>
  )
}

export default Sidebar