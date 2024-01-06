'use client'
import { motion } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import { useRouter, usePathname, redirect } from 'next/navigation'
import React, { useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import Link from 'next/link'
import images from '../images/lofo.png'
import images2 from '../images/Th.png'
import user from '../images/user.png'
import menu from '../images/menu.png'
import SocailIcons from './SocailIcons'
import SearchInput from './SearchInput'
const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const Navbar = () => {
  const [show, setShow] = useState(false)
  const session = useSession()
  const router = useRouter()
  const path = usePathname()
  const handleSignout = () => {
    if (session.status === 'authenticated') {
      signOut()
      redirect('/login')
    } else {
      router.push('/login')
    }
  }

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data } = useSWR(`${api}/api/user/${session?.data?.id}`,
    fetcher,
    {
      dependencies: [session?.data?.id, router]
    }
  )
  const urltext = path.split('/').pop()
  const color = ['signup', 'login', 'resetpassword', 'write', 'contactus', 'register', 'settings']
  const imageUrl = color.includes(urltext) ? images2 : images
  const navigationLinks = [
    { href: '/', text: 'Home' },
    { href: '/aboutus', text: 'About Us' },
    { href: '/write', text: 'Write a blog' },
    { href: '/contactus', text: 'Contact Us' },
    { href: `/savedPosts/${session?.data?.id}`, text: `${session.status === 'unauthenticated' ? '' : 'Saved Posts'}` },
    { href: `/authorDetails/${session?.data?.id}`, text: `${session.status === 'unauthenticated' ? '' : 'Profile'}` },
    { href: '/settings', text: `${session.status === 'unauthenticated' ? '' : 'Settings'}` },
    { href: '/admin', text: `${session?.data?.user?.name?.isAdmin === false || session.status === 'unauthenticated' ? '' : 'Admin Panel'}` },
    { href: '/login', text: session.status === 'unauthenticated' ? 'Login' : 'Log Out', condition: true }
  ]

  return (
    <nav
      className={`${color.includes(urltext) ? 'bg-[#1D3208]' : 'bg-[white]'
        } py-1 px-1 flex items-center justify-center fixed w-full z-50`}
    >
      <div className="main w-full">
        <div className="flex items-center  justify-between w-full">
          <div className="flex bg-[#AFE67F] w-[223px] max-[600px]:w-[130px]  max-[600px]:h-[30px] max-sm:w-[180px] h-[44px] justify-center items-center rounded-full">
            <SocailIcons />
          </div>
          <div className="flex flex-col">
            <Image src={imageUrl} alt="logo" priority height={40} width={40} sizes="20px"/>
            <span
              className={`text-[48px]  max-md:text-[25px] font-bold text-[${color.includes(urltext) ? '#AFE67F' : '#1D3208'
                }] h-[58px] max-sm:h-[16px] flex relative  bottom-2 uppercase`}
            >
              Local
            </span>
          </div>
          <div className="flex gap-5">
            <SearchInput />
            <div className="group relative inline-block text-left">
              <div className="bg-[#AFE67F] cursor-pointer w-[44px] h-[44px] rounded-full flex justify-center items-center md:flex max-sm:hidden ">
                {data?.image
                  ? <Image src={data?.image} alt="logo" priority fill className="rounded-full" sizes="(min-width: 640px) 30px, 30px" />
                  : <Image src={user} alt="logo" sizes="44px" priority height={20} width={20} />
                }
              </div>
            </div>
            <div
              onClick={() => setShow(!show)}
              className="bg-[#AFE67F] w-[44px] max-[600px]:w-[34px]  max-[600px]:h-[34px]  h-[44px] cursor-pointer  rounded-full flex justify-center items-center "
            >
              <Image src={menu} alt="logo" priority height={20} width={20} />
            </div>
            {show && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                onClick={() => setShow(!show)}
                className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-[45%]"
              >
                <div className="fixed top-0 right-0 w-full md:w-[29%]   h-screen bg-white">
                  <div className="flex items-center px-24">
                    <div className="flex flex-col w-full pt-7 mb-10">
                      <Image
                        src={images}
                        alt="logo"
                        priority
                        height={40}
                        width={40}
                        sizes="(min-width: 640px) 20px, 12px"
                      />
                      <span className="text-[40px] max-md:text-[26px] max-md:h-0 font-bold text-[#1D3208] h-[58px] flex relative bottom-2 uppercase">
                        Local
                      </span>
                    </div>
                    <div
                      onClick={() => setShow(!show)}
                      className="h-12 relative bottom-2 flex items-center cursor-pointer"
                    >
                      <div className=" font-extrabold text-[20px] pt-1 border-black  border-solid    bg-[#AFE67F] w-[40px] rounded-full  text-center h-[40px]">X</div>
                    </div>
                  </div>
                  <ul className="flex flex-col items-center mt-4 gap-7 max-md:gap-5">
                    {navigationLinks.map((link, index) => (
                      link.condition === undefined || link.condition
                        ? (
                          <li key={index} className="w-full px-24 ">
                            <Link href={link.href}>
                              <span className={'text-black-600 hover:text-[#5e8b37]  max-sm:text-[20px] text-[26px] font-bold'} onClick={link.href === '/login' ? handleSignout : undefined}>
                                {link.text}
                              </span>
                            </Link>
                          </li>
                          )
                        : null
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
