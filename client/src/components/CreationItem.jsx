import React, { useState } from 'react'
import Markdown from 'react-markdown';


const CreationItem = ({item}) => {

  const [expanded,setExpanded] = useState(false);

  return (
    <div onClick={()=>setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg cursor-pointer'>
      <div className='flex justify-between items-center gap-4 '>
        <div>
          <h2 className='text-gray-900 dark:text-dark-text'>{item.prompt}</h2>
          <p className='text-gray-500 dark:text-dark-text-muted'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
        </div>
        <button className='bg-[#EEF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full'>{item.type}</button>
      </div>
      {
        expanded && (
          <div>
            {item.type === 'image' ? (
              <div>
                <img className='w-full max-w-md' src={item.content} alt="image" />
              </div>
            ):(
              <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-700 dark:text-dark-text-secondary'>
                <div className='reset-tw'>
                  <Markdown >{item.content}</Markdown>
                  </div> 
              </div>
            )
            }
          </div>
        )
      }
    </div>
  )
}

export default CreationItem