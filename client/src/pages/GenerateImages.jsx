import { Edit, Hash, Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import axios from 'axios'


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL; 
const GenerateImages = () => {

  const imageStyle = [
        'Realistic','Ghibli style', 'Lifestyle', 'Anime style', 'Cartoon style',
        'General', 'Fantasy style', 'Sci-fi', 'Portrait', 'Nature', '3D style',
      ]
    
      const[selectedStyle,setSelectedStyle] = useState('Realistic');
      const[input,setInput] = useState('');
      const[publish,setPublish] = useState(false);
      const [loading, setLoading] = useState(false);
      const [content, setContent] = useState('');

      const {getToken} = useAuth()
    
      const onSubmitHandler = async(e) =>{
        e.preventDefault();
        try {
          setLoading(true)

          const prompt = `Generate an image of ${input} in the style ${selectedStyle}`
          const {data} = await axios.post('/api/ai/generate-image',{prompt,publish},{headers:{Authorization:`Bearer ${await getToken()}`}})

        if(data.success){
          setContent(data.content)
        }else{
          toast.error(data.message)
        }
        } catch (error) {
          toast.error(error.message)
        }
        setLoading(false)
      }
  

  return (
    <div className='h-full overscroll-y-scroll p-6 flex items-start flex-wrap gap-4 
        text-slate-700 dark:text-dark-text-secondary bg-[#F4F7FB] dark:bg-dark-bg'>
          {/* left col */}
          <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border' action="">
            <div className='flex items-center gap-3'>
              <Sparkles className='w-6 text-[#00AD25]'/>
               <h1 className='text-xl font-semibold text-gray-900 dark:text-dark-text'>AI Image Generator</h1>
            </div>
            <p className='mt-6 text-sm font-medium text-gray-700 dark:text-dark-text-secondary'>Describe Your Image</p>
    
            <textarea rows={4}  onChange={(e)=>setInput(e.target.value)} placeholder='Describe what you want to see in the image..' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-text-muted' required />
            <p className='mt-4 text-sm font-medium text-gray-700 dark:text-dark-text-secondary'>Style</p>
    
            <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
              {imageStyle.map((item)=>(
                <span
                  onClick={() => setSelectedStyle(item)}
                  key={item}
                  className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                    selectedStyle === item
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-500 dark:text-dark-text-muted border-gray-300 dark:border-dark-border'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className='my-6 flex items-center gap-2'>
              <label className='relative cursor-pointer'>
                <input
                  onChange={(e) => setPublish(e.target.checked)}
                  type="checkbox"
                  className='sr-only peer'
                  checked={publish}
                />
                <div className='w-9 h-5 bg-slate-300 rounded-full transition peer-checked:bg-green-500'></div>
                <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
              </label>
              <p className='text-sm text-gray-700 dark:text-dark-text-secondary'>Make this image Public</p>
            </div>
            <button disabled={loading} className='w-full flex justify-center items-center gap-2 
            bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
              {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>: <Image className='w-5'/>
              }
              Generate Image
              </button>
          </form>
    
          {/* right col */}
          <div className='w-full max-w-lg p-4 bg-white dark:bg-dark-card rounded-lg flex flex-col border border-gray-200 dark:border-dark-border min-h-110 '> 
            <div className='flex items-center gap-3'>
              <Image className='w-5 h-5 text-[#00AD25]'/>
              <h1 className='text-xl font-semibold text-gray-900 dark:text-dark-text'>Generated images</h1>
            </div>

            {
              !content ?(
              <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Image className='w-9 h-9 '/>
              <p className=''>Enter a topic and click "Generate image" to get started</p>
                </div>
            </div>
              ):
              (
                 <div className='mt-3 h-full '>
                        <img className='w-full h-full' src={content} alt="image" />    
                   </div>
              )
            }
            
            
          </div>
        </div>
  )
}

export default GenerateImages