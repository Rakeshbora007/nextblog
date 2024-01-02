import Reply from '@models/Reply'
import connect from '@utils/db'
import { NextResponse } from 'next/server'

export const GET = async (req) => {
  try {
    await connect()
    const reply = await Reply.find()
    return new NextResponse(JSON.stringify(reply), { status: 200 })
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 })
  }
}

export const POST = async (req) => {
  try {
    const body = await req.json()
    const newReply = new Reply(body)
    await connect()
    await newReply.save()
    return new Response(JSON.stringify(newReply), { status: 201 })
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 })
  }
}
