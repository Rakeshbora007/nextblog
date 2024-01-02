import User from '@/models/User'
import connect from '@/utils/db'
import { NextResponse } from 'next/server'

export const GET = async (res) => {
  const id = res.url.split('/').pop()
  try {
    await connect()
    const user = await User.findById(id, { password: 0 })
    return new NextResponse(JSON.stringify(user), { status: 200 })
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 })
  }
}

export const PUT = async (req) => {
  const id = req.url.split('/').pop()
  const { followers, following, followingUser, saved, savedPosts, followedBy } = await req.json()
  try {
    await connect()

    const updateObject = getUpdateObject(following, saved, followers, followingUser, savedPosts, followedBy)

    const user = await User.findByIdAndUpdate(
      id,
      updateObject,
      { new: true, fields: { password: 0 } }
    )

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    return new NextResponse(JSON.stringify(user), { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse('Database Error', { status: 500 })
  }
}

const getUpdateObject = (following, saved, followers, followingUser, savedPosts, followedBy) => {
  if (followedBy === true) {
    return {
      followedBy,
      $addToSet: {
        followingUser
      }
    }
  }
  if (followedBy === false) {
    return {
      followedBy,
      $pull: {
        followingUser: { followingData: followingUser?.followingData }
      }
    }
  }
  if (following === true) {
    return {
      following,
      $addToSet: {
        followers
      }
    }
  }
  if (following === false) {
    return {
      following,
      $pull: {
        followers: { followerId: followers?.followerId }
      }
    }
  }
  if (saved === false) {
    return {
      $addToSet: {
        savedPosts
      }
    }
  }
  if (saved === true) {
    return {
      $pull: {
        savedPosts: { saveId: savedPosts?.saveId }
      }
    }
  }
}
