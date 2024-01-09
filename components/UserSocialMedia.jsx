'use client'
import React from 'react'
import fb from '../public/fbs.svg'
import twitts from '../public/twitts.svg'
import insta from '../public/intashra.svg'
import linkdin from '../public/linkdin.svg'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

const UserSocialMedia = ({ dataId }) => {
  const API_URL = `${api}/api/user/`
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data } = useSWR(
        `${API_URL}${dataId}`,
        fetcher
  )
  const iconsDarkgreen = [{ icon: fb, link: data?.socialLinks?.facebook }, { icon: twitts, link: data?.socialLinks?.twitter }, { icon: insta, link: data?.socialLinks?.instagram }, { icon: linkdin, link: data?.socialLinks?.linkdin }]
  return (
        <div className={'flex gap-6 max-sm:gap-3'}>
            {iconsDarkgreen?.map((e, index) => (
                <div key={index} className="border-[2px] max-sm:border-[0px] border-black px-[8px] rounded-full  w-[40px] h-[40px] flex justify-center  items-center">
                    <div className='relative w-[24px] h-[24px] max-sm:w-[18px] max-sm:h-[18px]'>
                        <Link href={`${e.link}`}>
                            <Image alt='hgasdjh' src={e.icon} fill priority />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
  )
}

export default UserSocialMedia
