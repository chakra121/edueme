import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-[20%] pt-[1rem]'>
        <div>
            <img src="/logo.png" alt="logo" />
        </div>

        <div className='flex gap-[1rem] items-center'>
            <Link href="/" className='hover:bg-yellow-500 hover:text-white px-[1rem] py-[0.5rem] rounded-md'>Home</Link>
            <Link href="/about" className='hover:bg-yellow-500 hover:text-white px-[1rem] py-[0.5rem] rounded-md'>About</Link>
            <Link href="/contact" className='hover:bg-yellow-500 hover:text-white px-[1rem] py-[0.5rem] rounded-md'>Contact</Link>
            <Link href="/blog"className='hover:bg-yellow-500 hover:text-white px-[1rem] py-[0.5rem] rounded-md'>Blog</Link>
            <Link href={"/test"}className='hover:bg-yellow-500 hover:text-white px-[1rem] py-[0.5rem] rounded-md'>Test</Link>
            <Link href={"/shop"} className='bg-blue-600 text-white px-[1rem] py-[0.5rem] rounded-md'>Shop Now</Link>
        <h1>Shrrrr</h1>
        </div>
    </div>
  )
}

export default Navbar