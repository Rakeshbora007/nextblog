import Reply from '@models/Reply'
import connect from '@utils/db'

import { NextResponse } from 'next/server'

export const GET = async (res) => {
  const id = res.url.split('/').pop()

  try {
    await connect()
    const Replys = await Reply.find({ replyId: id })
    return new NextResponse(JSON.stringify(Replys), { status: 200 })
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 })
  }
}

export const PUT = async (req) => {
  try {
    const id = req.url.split('/').pop()
    const { likereply, likes } = await req.json()
    await connect()
    const updateObject = likereply
      ? { $pull: { likes } }
      : { $addToSet: { likes } }

    const post = await Reply.findByIdAndUpdate(
      id,
      {
        ...updateObject,
        $set: { likereply: !likereply }
      },
      { new: true } // Return the modified document rather than the original
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
