'use client'
import React, { useState } from 'react'
import like from '../images/like3.svg'
import unlike from '../images/unlike2.svg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const Liker = ({ id }) => {
  const session = useSession()
  const [Bool, setBool] = useState(false)
  const handleLikes = async () => {
    setBool(!Bool)
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        likeCheck: Bool,
        likers: {
          likerId: session?.data?.id,
          likerName: session?.data?.user?.name
        }
      })
    })

    if (res.ok) {
      console.log('done')
    }
  }

  return (
        <div onClick={handleLikes} className="cursor-pointer relative w-[30px] h-[30px] ">
            {Bool === true ? <Image alt="" src={like} fill /> : <Image alt="" src={unlike} fill />}
        </div>
  )
}

export default Liker
