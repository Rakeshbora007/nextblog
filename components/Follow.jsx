'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import useSWR from 'swr'

const API_URL = 'http://localhost:3000/api/user/'

const Follow = ({ dataID }) => {
  const { data: sessionData } = useSession()

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data: data1, mutate: mutate1 } = useSWR(
        `${API_URL}${dataID}`,
        fetcher
  )

  const { data: data2, mutate: mutate2 } = useSWR(
        `${API_URL}${sessionData?.id}`,
        fetcher
  )

  const isFollowing = data1?.followers.some(e => e.followerId === sessionData?.id)
  const isFollowed = data2?.followingUser.some(e => e.followingData === dataID)

  const handleFollow = async () => {
    try {
      const res = await fetch(`${API_URL}${dataID}`, {
        method: 'PUT',
        body: JSON.stringify({
          following: !isFollowing,
          followers: {
            followerId: sessionData?.id,
            followerName: sessionData?.user.name
          }
        })

      })
      await fetch(`${API_URL}${sessionData?.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          followedBy: !isFollowed,
          followingUser: {
            followingData: dataID
          }
        })
      })
      if (res.ok) {
        mutate1()
        mutate2()
      }
    } catch (error) {
      console.error('Error during follow:', error)
    }
  }

  return (
        <div className='flex gap-8 flex-col'>
            <div className="flex  items-center gap-1">
                {sessionData?.id !== dataID && (
                    <button
                        onClick={handleFollow}
                        className={`w-[186px] h-[58px] m-10 rounded-md ${isFollowing
                            ? ' bg-[#AFE67F] text-[#1D3208]'
                            : '  bg-[#1D3208] text-[#AFE67F]'
                            }`}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                )}
            </div>
        </div>
  )
}

export default Follow
