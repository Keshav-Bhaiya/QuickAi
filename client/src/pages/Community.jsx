import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { dummyPublishedCreationData } from '../assets/assets';
import { Heart } from 'lucide-react';
import axios from 'axios'
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth()

  const fetchCreation = async () => {
    try {
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      
      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message || 'Failed to fetch creations');
      }
    } catch (error) {
      // Fixed: Properly access error message
      console.error('Error fetching creations:', error);
      
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
        toast.error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        toast.error('Network error. Please check your connection.');
      } else {
        // Something else happened
        toast.error('An unexpected error occurred.');
      }
    } finally {
      // Added: Ensure loading is set to false regardless of success/failure
      setLoading(false);
    }
  }

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post('/api/user/toggle-like-creation',{id}, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });

      if(data.success){
        toast.success(data.message)
        await fetchCreation()
      }else{
        toast.error(data.message);
      }

    } catch (error) {
        toast.error(error.message);
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreation();
    } else {
      setLoading(false);
    }
  }, [user])

  // Added: Loading state handling
  if (loading) {
    return (
      <div className='flex-1 h-full flex items-center justify-center'>
        <div className='text-lg'>Loading creations...</div>
      </div>
    );
  }

  return !loading ?(
    <div className='flex-1 h-full flex-col gap-4 p-6 bg-[#F4F7FB] dark:bg-dark-bg'>
      <h2 className='text-2xl font-bold mb-4 text-gray-900 dark:text-dark-text'>Creations</h2>
      <div className='bg-white dark:bg-dark-card rounded-xl h-full w-full overflow-y-scroll'>
        {creations.length === 0 ? (
          <div className='flex items-center justify-center h-full text-gray-500 dark:text-dark-text-muted'>
            No creations found
          </div>
        ) : (
          creations.map((creation, index) => (
            <div key={creation.id || index} className='relative pl-3 pt-3 w-full group inline-block sm:max-w-1/2 lg:max-w-1/3'>
              <img 
                src={creation.content} 
                className='w-full h-full object-cover rounded-lg' 
                alt={creation.prompt || 'Creation'} 
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg'; // Add fallback image
                }}
              />

              <div className='absolute bottom-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg'>
                <p className='text-sm hidden group-hover:block p-2 text-white'>{creation.prompt}</p>
                <div className='flex gap-1 items-center p-2'>
                  <p>{creation.likes?.length || 0}</p>
                  <Heart onClick={()=> imageLikeToggle(creation.id)}
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                      creation.likes?.includes(user?.id) 
                        ? 'fill-red-500 text-red-600' 
                        : 'text-white'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-full'>
      <span className='w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin'></span>
    </div>
  )
}

export default Community