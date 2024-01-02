import connect from '@utils/db'
import Contact from '@models/ContactUs'
import { NextResponse } from 'next/server'
export const GET = async () => {
  try {
    await connect()
    const ContactData = await Contact.find()
    return new NextResponse(JSON.stringify(ContactData), {
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
    const newContact = new Contact(body)
    await connect()
    await newContact.save()

    return new Response(JSON.stringify(newContact), { status: 201 })
  } catch (error) {
    console.error(error)
    return new NextResponse('Database Error', { status: 500 })
  }
}

export const PUT = async (req) => {
  try {
    const { _id, ...updateData } = await req.json()

    if (!_id) {
      return new NextResponse('Missing _id in request body', { status: 400 })
    }

    await connect()

    const existingContact = await Contact.findById(_id)

    if (!existingContact) {
      return new NextResponse(`Contact with _id ${_id} not found`, { status: 404 })
    }

    Object.assign(existingContact, updateData)

    await existingContact.save()

    return new Response(JSON.stringify(existingContact), { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse('Database Error', { status: 500 })
  }
}
