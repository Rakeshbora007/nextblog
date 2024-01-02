import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
const email = process.env.EMAIL
const pass = process.env.EMAIL_PASSWORD

export const POST = async (request) => {
  const { useremail, message, firstName, lastName, phone } = await request.json()

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass
    }
  })

  const mailOptions = {
    from: email,
    to: email,
    subject: `Message from (${useremail})`,
    html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <p style="font-weight: bold;">Name: ${firstName} ${lastName}</p>
                <p>Phone Number: ${phone}</p>
                
                <p style="margin-top: 20px; font-style: italic;">Message:</p>
                <p>${message}</p>
            </div>
        `
  }
  try {
    await transport.sendMail(mailOptions)
    return NextResponse.json({ message: 'Success!', status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Failed!', status: 500 })
  }
}
