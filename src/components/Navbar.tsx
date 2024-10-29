import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-[10%] pt-[1rem]'>
        <div>
            <img src="/logo.png" alt="logo" />
        </div>

        <div className='flex gap-[1rem] items-center'>
            <Link href="/" className='hover:bg-yellow-500 hover:text-white px-[1rem] py-[0.5rem] rounded-md'>Home</Link>
            <Link href="/about" className='hover:bg-yellow-500 hover:text-white px-[1rem] py-[0.5rem] rounded-md'>About</Link>
            <Link href="/" className='hover:bg-yellow-500 hover:text-white px-[1rem] py-[0.5rem] rounded-md'>Contact</Link>
            <Link href="/" className='hover:bg-yellow-500 hover:text-white px-[1rem] py-[0.5rem] rounded-md'>Book Demo</Link>
            <Link href="/" className='hover:bg-yellow-500 hover:text-white px-[1rem] py-[0.5rem] rounded-md'>Take Live Test</Link>
            <Link href="/" className='bg-blue-500 text-white px-[1rem] py-[0.5rem] rounded-md'>Login</Link>
            <Link href="/" className='bg-blue-600 text-white px-[1rem] py-[0.5rem] rounded-md'>Signup</Link>
        </div>
    </div>
  )
}

export default Navbar