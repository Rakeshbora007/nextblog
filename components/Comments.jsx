/* eslint-disable multiline-ternary */
'use client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import useSWR from 'swr'
import Reply from './Reply'
import Image from 'next/image'
import Dateformat from './Dateformat'
import Link from 'next/link'
const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
export const postComment = async (endpoint, data) => {
  try {
    const res = await fetch(`/api/comments/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      throw new Error('Failed to post comment')
    }
    return res.json()
  } catch (error) {
    console.error('Error posting comment:', error)
    throw error
  }
}

const Comments = ({ placeholder, buttons, id }) => {
  const [comment, setComment] = useState('')
  const session = useSession()
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, mutate } = useSWR(
    `${api}/api/comments/${id}`, fetcher
  )

  const handleComments = (e) => {
    if (buttons) {
      console.log('done')
    } else {
      setComment(e.target.value)
    }
  }
  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        name: `${session.data.user.name.firstname + session.data.user.name.lastname}`,
        email: session.data.user.email,
        image: session.data.user.image,
        comment,
        blogId: id
      }
      await postComment('', data)
      setComment('')
    } catch (error) {
    }
    mutate()
  }
  return (
    <div className="w-[69%] max-lg:w-[100%]">
      <div className="flex w-full mt-[150px] max-md:mt-10 justify-center items-center gap-4 h-[70px]">
        <span className="text-[24px] font-bold">
          Comments
        </span>
        <hr className="w-full" />
      </div>
      <div className="gap-7 h-auto  flex flex-col w-full">
        {data?.length === 0
          ? (
            <div>No comments yet</div>
            )
          : (
            <>
              {data?.map((e) => (
                <div key={e._id}>
                  <div className="flex my-5 w-full  h-auto " >
                    <div className="flex justify-center h-auto   w-full items-center flex-col ">
                      <div className="flex flex-col gap-[20px] items-center w-full justify-start ">
                        <div className="flex  gap-[30px] items-center w-full justify-start ">
                          <div className="h-[60px] relative w-[60px] ">
                            <Image alt='dataimage' src={e.image} fill className='rounded-full' />
                          </div>
                          <div className="flex-col flex  gap-4 w-full h-auto ">
                            <div className="flex items-center h-3  justify-between">
                              <span className="text-[20px] font-semibold">
                                <span>{e.name}</span>
                              </span>
                              <span className="text-[16px] max-sm:text-[12px] text-[#878787]">
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
                          <Reply commentmutate={mutate} idmain={id} replyID={e._id} likes={e.likecomments} display={true} likefor={'comments'} />
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                  <hr />
                </div>
              ))}
            </>
            )}
      </div>
      {session?.status === 'unauthenticated' ? <Link href='/login' className='bg-[#1D3208] mt-[20px] flex w-[186px] rounded-lg cursor-pointer items-center justify-center text-[#AFE67F] h-[48px] rounded-lg"'>Login for comment</Link>
        : <>
          <div className="mt-[160px] max-md:mt-4 gap-7 flex flex-col">
            <div className="flex w-full  justify-center items-center  h-[70px]">
              <span className=" text-[24px]  max-md:text-[17px] font-bold w-[280px]">
                Leave a Comment
              </span>
              <hr className="w-full" />
            </div>
            <form onSubmit={handleCommentSubmit} className="p-2 flex w-full gap-4">
              <input
                type="text"
                className="w-full h-[227px]  rounded-md pl-[52px] bg-[#e5e5e5] placeholder:text-[#585858] placeholder:text-[14px]"
                placeholder={placeholder}
                value={comment}
                onChange={handleComments}
              />
            </form>
            <buttons type="submit" className="bg-[#1D3208] flex w-[186px] items-center justify-center text-[#AFE67F] h-[58px] rounded-lg">Submit</buttons>
          </div>
        </>
      }
    </div>
  )
}

export default Comments
