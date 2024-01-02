import connect from '@utils/db'
import Content from '@models/Content'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    await connect()
    const contentData = await Content.find()
    return new NextResponse(JSON.stringify(contentData), {
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
    const newContent = new Content(body)

    await connect()

    const savedContent = await newContent.save()

    return new Response(JSON.stringify(savedContent), { status: 201 })
  } catch (error) {
    console.error(error)

    return new NextResponse('Database Error', { status: 500 })
  }
}

export const PUT = async (req) => {
  try {
    const body = await req.json()
    const { postId, ...updateData } = body

    const existingContent = await Content.findById(postId)

    if (!existingContent) {
      return new NextResponse('Content not found', { status: 404 })
    }
    Object.assign(existingContent, updateData)

    await connect()
    await existingContent.save()

    return new Response(JSON.stringify(existingContent), { status: 200 })
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 })
  }
}
