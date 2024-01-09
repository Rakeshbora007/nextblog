'use client'
import React, { useState } from 'react'
import like from '@public/like3.svg'
import unlike from '@public/unlike2.svg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

const Liker = ({ id }) => {
  const session = useSession()
  const [Bool, setBool] = useState(false)
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, mutate } = useSWR(
    `${api}/api/posts/${id}`,
    fetcher
  )
  const handleLikes = async () => {
    setBool(!Bool)
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        likeCheck: !data?.likeCheck,
        likers: {
          likerId: session?.data?.id,
          likerName: session?.data?.user?.name
        }
      })
    })
    if (res.ok) {
      console.log('done')
      mutate()
    }
  }
  return (
    <div>
      {session?.status === 'unauthenticated'
        ? ''
        : <>
      <div className="border-[2px] max-sm:border-[0px] border-black px-[8px] rounded-full  w-[40px] h-[40px] flex justify-center  items-center">
        <div onClick={handleLikes} className="cursor-pointer relative w-[30px] h-[30px] ">
          {data?.likeCheck === false ? <Image alt="" src={like} fill /> : <Image alt="" src={unlike} fill />}
        </div>
      </div>
      </>
      }
    </div>
  )
}

export default Liker
