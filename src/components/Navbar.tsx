import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-[20%] pt-[1rem]'>
        <div>
            <img src="/logo.png" alt="logo" />
        </div>

        <div className='flex gap-[1rem] items-center'>
            <Link href="/">Home</Link>
            <Link href="/about" className='hover:bg-yellow-500 hover:text-white'>About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/blog">Blog</Link>
            <Link href={"/test"}>Test</Link>
            <Link href={"/shop"} className='bg-blue-600 text-white px-[1rem] py-[0.5rem] rounded-md'>Shop Now</Link>
        </div>
    </div>
  )
}

export default Navbar