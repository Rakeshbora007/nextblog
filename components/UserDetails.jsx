'use client'
import Image from 'next/image'
import React from 'react'
import useSWR from 'swr'
import SocailIcons from './SocailIcons'
import Follow from './Follow'

const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const API_URL = `${api}/api/user/`

const UserDetails = ({ dataId, postnumbers }) => {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data } = useSWR(
        `${API_URL}${dataId}`,
        fetcher
  )
  return (
        <div className='flex gap-7 flex-col'>
            <div className='flex  gap-20 max-md:gap-[2rem] max-sm:mt-14 max-md:justify-center max-md:items-center'>
                <div className='relative w-[200px] h-[200px] max-md:w-[100px] max-md:h-[100px]'>
                    <Image src={data?.image} className='rounded-full' fill alt="User Profile Image" />
                </div>
                <div className='flex-1 flex flex-col   gap-8 max-md:gap-5 max-sm:gap-3'>
                    <h1 className='text-[30px] max-sm:text-[22px] font-semibold max-md:mt-10 max-sm:mt-0'>
                        <span className='capitalize'>{data?.name.firstname}</span>
                        <span>{data?.name.lastname}</span>
                    </h1>
                    <p className='text-[19px] max-md:text-[15px] max-sm:hidden'>{data?.description}</p>
                    <div className='flex gap-6'>
                        <h3 className='text-2xl'>
                            <span className='font-bold max-md:text-[15px] max-sm:text-[12px]'>Posts : </span><span className='max-sm:text-[12px] max-md:text-[15px]'>{`${postnumbers?.length === undefined ? 0 : postnumbers?.length}`}</span>
                        </h3>
                        <h3 className='text-2xl'>
                            <span className='font-bold max-md:text-[15px]  max-sm:text-[12px]'>followers : </span><span className='max-sm:text-[12px] max-md:text-[15px]'>{`${data?.followers?.length === undefined ? 0 : data?.followers?.length}`}</span>
                        </h3>
                        <h3 className='text-2xl'>
                            <span className='font-bold max-md:text-[15px]  max-sm:text-[12px]'>following : </span><span className='max-sm:text-[12px] max-md:text-[15px]'>{`${data?.followingUser?.length === undefined ? 0 : data?.followingUser?.length}`}</span>
                        </h3>
                    </div>
                </div>
            </div>
            <div className='flex gap-6   items-center'>
                <span className="font-bold text-[20px]">Follow :</span>
                <div className="text-xl font-semibold ">
                    <div className="flex gap-[25px]  w-[160px] h-[40px] justify-center items-center rounded-full">
                        <SocailIcons />
                    </div>
                </div>
                <Follow dataID={dataId} />
            </div>
        </div>
  )
}

export default UserDetails
