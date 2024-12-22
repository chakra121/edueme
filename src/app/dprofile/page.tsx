import React from 'react'
import Profile from './dprofile'
import Sidepanel from '@/components/Sidepanel'

const page = () => {
  return (
    
    <div className="flex flex-row">
      {/* Sidepanel */}

        <Sidepanel />
   

      {/* Enrolled Courses */}
  
        <Profile />
    </div>
  )
}

export default page