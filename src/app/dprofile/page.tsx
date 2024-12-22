import React from 'react'
import Profile from './dprofile'
import Sidepanel from '@/components/Sidepanel'

const page = () => {
  return (
    
    <div className="flex min-h-screen pt-16">
      {/* Sidepanel */}
      <aside className="w-1/4 bg-blue-100 p-6 rounded-lg text-black shadow-md h-screen mt-10 ml-5">
        <Sidepanel />
      </aside>

      {/* Enrolled Courses */}
      <main className=" p-4 flex">
        <Profile />
      </main>
    </div>
  )
}

export default page