import connect from '@utils/db'
import About from '@models/About'
import { NextResponse } from 'next/server'

export const GET = async (req) => {
  try {
    await connect()
    const aboutData = await About.find()
    return new NextResponse(JSON.stringify(aboutData), {
      status: 200
    })
  } catch (error) {
    console.error('Database Error:', error)
    return new NextResponse('Database Error', { status: 500 })
  }
}
export const POST = async (req) => {
  try {
    const body = await req.json()
    const { postId, teams, main, author } = body
    await connect()
    if (postId) {
      const updatedPost = await About.findByIdAndUpdate(
        postId,
        { $set: { teams, main, author } },
        { new: true }
      )
      if (!updatedPost) {
        return new NextResponse('Post not found', { status: 404 })
      }
      if (main) {
        await About.updateMany({ _id: { $ne: postId } }, { $set: { main: false } })
      }
      if (author) {
        await About.updateMany({ _id: { $ne: postId } }, { $set: { author: false } })
      }
      return new NextResponse(JSON.stringify(updatedPost), { status: 200 })
    }
    const newPost = new About(body)
    if (main) {
      await About.updateMany({}, { $set: { main: false } })
    }
    if (author) {
      await About.updateMany({}, { $set: { main: false } })
    }
    await newPost.save()
    return new NextResponse(JSON.stringify(newPost), { status: 201 })
  } catch (error) {
    console.error('Database Error:', error)
    return new NextResponse('Database Error', { status: 500 })
  }
}

export const DELETE = async (req) => {
  try {
    const body = await req.json()
    const { postId } = body
    await connect()
    const deletedPost = await About.findByIdAndDelete(postId)
    if (!deletedPost) {
      return new NextResponse('Post not found', { status: 404 })
    }
    return new NextResponse('Post deleted successfully', { status: 200 })
  } catch (error) {
    console.error('Database Error:', error)
    return new NextResponse('Database Error', { status: 500 })
  }
}
