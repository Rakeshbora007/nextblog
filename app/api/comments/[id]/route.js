import Comments from '@models/Comments'
import connect from '@utils/db'

import { NextResponse } from 'next/server'

export const GET = async (req, { params }) => {
  const { id } = params
  try {
    await connect()
    const Comment = await Comments.find({ blogId: id })
    return new NextResponse(JSON.stringify(Comment), { status: 200 })
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 })
  }
}

export const PUT = async (req) => {
  try {
    const id = req.url.split('/').pop()
    const { likecomments, likes } = await req.json()
    await connect()
    const updateObject = likecomments
      ? { $pull: { likes } }
      : { $addToSet: { likes } }

    const post = await Comments.findByIdAndUpdate(
      id,
      {
        ...updateObject,
        $set: { likecomments: !likecomments }
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
