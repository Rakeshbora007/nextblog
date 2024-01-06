'use client'
import React, { useState } from 'react'
import save from '@public/save.svg'
import unsave from '@public/unsave.svg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const API_URL = `${api}/api/user/`
const Save = ({ posts, postsId }) => {
  const [Bool, setBool] = useState(false)
  const session = useSession()
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, mutate } = useSWR(
        `${API_URL}${session.data?.id}`,
        fetcher
  )
  const savedId = data?.savedPosts.some((e) => e.saveId === postsId)

  const handleSave = async () => {
    setBool(!Bool)
    const res = await fetch(`${API_URL}${session.data?.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        saved: Bool,
        savedPosts: {
          saveId: postsId,
          posts
        }
      })
    })
    if (res.ok) {
      console.log('asj')
    }
    mutate()
  }
  return (
        <div onClick={handleSave} className="relative w-[20px] h-[20px]  cursor-pointer ">
            {savedId === true ? <Image src={save} fill alt="save" /> : <Image src={unsave} fill alt="save" />}
        </div>
  )
}

export default Save
