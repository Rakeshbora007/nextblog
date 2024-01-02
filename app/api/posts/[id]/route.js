import connect from '@utils/db'
import Posts from '@models/Post'
import { NextResponse } from 'next/server'

export const GET = async (res) => {
  const id = res.url.split('/').pop()
  try {
    await connect()
    const post = await Posts.findById(id)
    post.count = post.count + 1
    await post.save()
    return new NextResponse(JSON.stringify(post), { status: 200 })
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 })
  }
}

export const PUT = async (req) => {
  try {
    const id = req.url.split('/').pop()
    const { likers, likeCheck } = await req.json()
    await connect()
    const updateObject = likeCheck
      ? { $pull: { likers } }
      : { $addToSet: { likers } }
    const post = await Posts.findByIdAndUpdate(id, updateObject
    )
    if (!post) {
      return new NextResponse('Post not found', { status: 404 })
    }
    return new NextResponse(JSON.stringify(post), { status: 200 })
  } catch (error) {
    console.error('Error processing request:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
