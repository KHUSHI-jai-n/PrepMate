"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path = usePathname();
    useEffect(()=>{
        console.log(path)
    },[])
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'> 
      <Image src={'/speech-bubble_1948349.png'} width={50} height={10} alt='logo'/>
      <ul className='hidden md:flex gap-6'>
        <Link href={'/dashboard'}><li className={`hover:text-primary ${path=='/dashboard' && 'text-primary font-bold'}`}>Dashboard</li></Link>
        <Link href={'/questions'}><li className={`hover:text-primary ${path=='/questions' && 'text-primary font-bold'}`}>Questions</li></Link>
        <Link href={'/upgrade'}><li className={`hover:text-primary ${path=='/upgrade' && 'text-primary font-bold'}`}>Upgrade</li></Link>
        <Link href={'/about'}><li className={`hover:text-primary ${path=='/about' && 'text-primary font-bold'}`}>About Us</li></Link>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header
