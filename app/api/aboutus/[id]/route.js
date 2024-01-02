import connect from '@utils/db'
import About from '@models/About'
import { NextResponse } from 'next/server'

export const GET = async (res) => {
  const id = res.url.split('/').pop()
  try {
    await connect()
    const Abouts = await About.findById(id)
    return new NextResponse(JSON.stringify(Abouts), { status: 200 })
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 })
  }
}
