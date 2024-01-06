'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import calender from '@public/calendar2.png'
import tag from '@public/tag2.png'
import Save from '@components/Save'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const API_URL = `${api}/api/user/`
const SavedPosts = () => {
  const session = useSession()
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data } = useSWR(
        `${API_URL}${session.data?.id}`,
        fetcher
  )
  const savedData = data?.savedPosts
  return (
        <div className='min-h-screen'>
            {savedData.length !== 0
              ? <div className='main'>
                <h1 className='text-center text-[40px] font-bold'>Saved Posts</h1>
                        <div className="mt-[100px]  max-sm:mt-[27px] flex  justify-center flex-col items-center">
                            <div className="flex gap-[100px] justify-center   flex-wrap items-center">
                                {savedData?.map((e) => (
                                    <div key={e.posts._id} className='w-[300px]'>
                                        <Link
                                            href={`/blog/${e.saveId}`}
                                            className={`${'w-[300px]'} relative max-[800px]:w-[188px]  max-sm:w-[155px]  hover:text-[red] mb-5`}
                                        >
                                            <div className={`relative ${'h-[200px]'} max-[800px]:h-[124px]   `}>
                                                <Image alt="" src={e.posts?.image} fill className=" rounded-lg object-cover" />
                                                <div
                                                    className={'hover:bg-black  transition-all cursor-pointer duration-[300ms] opacity-30 rounded-lg absolute top-0 left-0 right-0 bottom-0 m-auto'}
                                                ></div>
                                            </div>
                                        </Link>
                                        <div
                                            className={'mt-1 w-full flex flex-col justify-center text-[24px] max-[800px]:text-[15px]  capitalize'}
                                        >
                                            <h1 className='text-center text-[20px] font-[700]'>{e.posts?.title}</h1>
                                            <div className="w-full mt-3 max-sm:w-[200px] justify-between  max-sm:gap-[13px] flex gap-[15px]">
                                                <div className="relative  justify-center  text-[12px] items-center flex gap-[10px] h-[24px]">
                                                    <Save posts={e.posts} postsId={e.posts._id} />
                                                    <div className="relative w-[24px] h-[24px] max-sm:w-[17px] max-sm:h-[17px]">
                                                        <Image alt="" src={calender} width={24} height={24} />
                                                    </div>
                                                    <span>Nov 1, 2023</span>
                                                </div>
                                                <div className="relative justify-center items-center    text-[12px] flex gap-[10px] h-[24px]">
                                                    <div className="relative w-[24px] h-[24px] max-sm:w-[17px] max-sm:h-[17px]">
                                                        <Image alt="" src={tag} width={24} height={24} />
                                                    </div>
                                                    <span>Feature</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
            </div>
              : <div className='main flex justify-center item-center'>
                <h1 className='text-center text-[40px] font-bold'>No Saved Posts</h1>
            </div>}
        </div>

  )
}

export default SavedPosts
