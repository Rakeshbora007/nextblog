import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import calender from '../../../images/calendar2.png'
import tag from '../../../images/tag2.png'
import UserDetails from '@components/UserDetails'
import { getServerSession } from 'next-auth'

const api = process.env.NEXT_PUBLIC_API_URL

const getData = async () => {
  try {
    const res = await fetch(`${api}/api/posts`, {
      cache: 'no-store'
    })
    if (!res.ok) {
      throw new Error('Failed to fetch posts data')
    }
    return res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

const AuthorDetails = async ({ params }) => {
  const { id } = params
  const { posts } = await getData()
  const userPosts = posts?.filter((e) => e.userID === id)
  const newposts = userPosts.reverse()
  const session = await getServerSession()
  if (session === null) {
    return <>
      <div className="w-full h-screen bg-[#ffffff] flex justify-center items-center">
        <Link href="/login" className="h-[70px] cursor-pointer px-5 bg-[#AFE67F] text-[24px] font-bold flex justify-center  items-center rounded-lg ">Login please</Link>
      </div></>
  };
  return (
    <div className='main w-full'>
      <div className='flex flex-col gap-7'>
        <UserDetails dataId={id} postnumbers={newposts} />
      </div>
      <div className="h-auto">
        <div className="w-[60%] flex mt-10 max-md:w-full max-md:mt-0 cursor:pointer flex-col gap-[5px] max-[900px]:gap-1">
          {newposts?.map((e, index) => (
            <React.Fragment key={index}>
              <Link
                href={`/blog/${e._id}`}
                className="group flex cursor-pointer max-md:gap-3  gap-6 mt-10"
              >
                <div className="relative  w-[302px] h-[223px] max-md:h-[100px] rounded-xl group-hover:text-red-500">
                  <Image alt="" className="rounded-xl" src={e.image} fill />
                  <div className="absolute top-0 left-0 w-full h-full hover:bg-black opacity-50 rounded-xl"></div>
                </div>
                <div className="h-[223px] max-md:h-[82px] max-sm:h-[100px] max-md:gap-1 justify-center gap-6  flex flex-col">
                  <div className="w-[380px] max-md:w-[200px] max-[900px] flex gap-[15px]">
                    <div className="relative justify-center   text-[12px] items-center flex gap-[10px] h-[24px]">
                      <div className="relative w-[24px] h-[24px] max-sm:w-[17px] max-sm:h-[17px]">
                        <Image alt="" src={calender} width={24} height={24} />
                      </div>
                      <span>Nov 1, 2023</span>
                    </div>
                    <div className="relative justify-center items-center  text-[12px] flex gap-[10px] h-[24px]">
                      <div className="relative w-[24px] h-[24px] max-sm:w-[17px] max-sm:h-[17px]">
                        <Image alt="" src={tag} width={24} height={24} />
                      </div>
                      <span>Feature</span>
                    </div>
                  </div>
                  <div className="group-hover:text-red-500 hover:text-red text-[24px] w-[500px] max-sm:text-[14px] max-md:w-[250px] font-bold leading-[38.73px]">
                    {e.title}
                  </div>
                  <h1 className="text-[20px] max-sm:text-[14px]">
                    <span className="font-semibold">Category</span> : {e.category}
                  </h1>
                </div>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AuthorDetails
