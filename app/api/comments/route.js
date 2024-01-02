import Comments from '@models/Comments'
import connect from '@utils/db'

import { NextResponse } from 'next/server'

export const GET = async (req) => {
  try {
    await connect()
    const comment = await Comments.find()
    return new NextResponse(JSON.stringify(comment), { status: 200 })
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 })
  }
}

export const POST = async (req) => {
  try {
    const body = await req.json()
    const newComment = new Comments(body)
    await connect()
    await newComment.save()
    return new Response(JSON.stringify(newComment), { status: 201 })
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 })
  }
}
