'use client'
import React, { useState } from 'react'
import like from '../app/assets/icons/heart.svg'
import reply from '../app/assets/icons/reply.svg'
import heart from '../images/heatt.png'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import Dateformat from './Dateformat'
const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const Reply = ({ replyID, display, likefor, commentID, likes, checkLike, commentmutate }) => {
  const [Toggle, setToggle] = useState(false)
  const [replys, setReplys] = useState('')
  const session = useSession()
  const [Like, setLike] = useState(false)
  const [ReplyLike, setReplyLike] = useState(false)
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, mutate } = useSWR(
    `${api}/api/comments/reply/${replyID}`, fetcher
  )
  const handleComments = (e) => {
    setReplys(e.target.value)
  }

  const handleLikeButton = async () => {
    setLike(!Like)
    if (likefor === 'comments') {
      const res = await fetch(`/api/comments/${replyID}`, {
        method: 'PUT',
        body: JSON.stringify({
          likecomments: Like,
          likes: {
            likerId: session?.data?.id,
            likerName: session?.data?.user?.name
          }
        })
      })
      if (res.ok) {
        commentmutate()
      }
    };

    if (likefor === 'reply') {
      setReplyLike(!ReplyLike)
      const res = await fetch(`/api/comments/reply/${commentID}`, {
        method: 'PUT',
        body: JSON.stringify({
          likereply: ReplyLike,
          likes: {
            likerId: session?.data?.id,
            likerName: session?.data?.user?.name
          }
        })
      })

      if (res.ok) {
        mutate()
      }
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/comments/reply', {
        method: 'POST',
        body: JSON.stringify({
          name: `${session.data.user.name.firstname + session.data.user.name.lastname}`,
          email: session.data.user.email,
          image: session.data.user.image,
          comment: replys,
          replyId: replyID
        })
      })
      if (res.ok) {
        setReplys('')
      } else {
        console.error('Failed to update team member')
      }
    } catch (error) {
      console.error('Error:', error)
    }
    mutate()
  }

  return (
    <div className="flex w-[93%] flex-col">
      <div className="flex gap-8 font-semibold">
        <div className="flex gap-4 cursor-pointer" onClick={handleLikeButton}>
          {likes || checkLike ? <Image alt="" src={heart} width={25} height={25} /> : <Image alt="" src={like} width={24} height={24} />}
          <span>Like</span></div>
        <div className="flex gap-4 cursor-pointer" onClick={(() => setToggle(!Toggle))}><Image alt="" src={reply} width={24} height={24} /><span>Reply</span></div>
      </div>
      <div>
        {display
          ? <>
            {Toggle && <>
              {data?.map((e) => (
                <div key={e._id} className="mb-6">
                  <hr className="m-[24px]" />
                  <div className="flex my-5 w-full  h-auto " >
                    <div className="flex justify-center h-auto   w-full items-center flex-col ">
                      <div className="flex flex-col gap-[20px] items-center w-full justify-start ">
                        <div className="flex  gap-[30px] items-center w-full justify-start ">
                          <div className="h-[60px] relative w-[60px] ">
                            <Image alt="" src={e.image} fill className='rounded-full' />
                          </div>
                          <div className="flex-col flex  gap-4 w-full h-auto ">
                            <div className="flex items-center h-3  justify-between">
                              <span className="text-[20px] font-semibold">
                                <span>{e.name}</span>
                              </span>
                              <span className="text-[16px] text-[#878787]">
                                <Dateformat createdAt={e.createdAt} />
                              </span>
                            </div>
                            <div className="w-3/5">
                              <p className="text-[16px] capitalize">
                                {e.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="pl-24 w-full">
                          <Reply replyID={replyID} display={false} checkLike={e.likereply} commentID={e._id} likefor={'reply'} />
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              ))}
            </>}
          </>
          : ' '}

      </div>
      <div className="pl-10 mt-3 w-full">
        {Toggle &&
          <form onSubmit={handleCommentSubmit}>
            <input type="text" value={replys} onChange={handleComments} className="w-full h-20 outline-none" placeholder="Reply...." />
          </form>
        }
      </div>
    </div>
  )
}

export default Reply
