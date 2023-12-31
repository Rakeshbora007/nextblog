'use client'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import SocailIcons from './SocailIcons'
import Follow from './Follow'
const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const API_URL = `${api}/api/user/`

const BlogUserDetails = ({ dataID }) => {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data } = useSWR(
        `${API_URL}${dataID}`,
        fetcher
  )
  return (
        <div className='flex  justify-center items-center'>
            <Link href={`/authorDetails/${dataID}`} className="cursor-pointer font-bold max-sm:text-[15px] text-[20px] hover:text-red-500 capitalize">
                <div className='flex flex-row'>
                    <span className='capitalize'>{data?.name.firstname}</span>{' '}
                    <span>{data?.name.lastname}</span> :
                </div>
            </Link>
            <div className="text-xl font-semibold ">
                <div className="flex gap-[25px] ml-6  w-[160px] h-[40px] justify-center items-center rounded-full">
                    <SocailIcons links={data?.socialLinks} color='dark'/>
                </div>
            </div>
            <Follow dataID={dataID} />
        </div>
  )
}

export default BlogUserDetails
