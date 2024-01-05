import generateToken from '@utils/generateToken'
import sendEmail from '@utils/sendEmail'
import User from '@models/User'
import connect from '@utils/db'
import { NextResponse } from 'next/server'

export const POST = async (req, res) => {
  const { email } = await req.json()
  await connect()
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return new NextResponse('user not found', { status: 404 })
    }
    const token = generateToken()
    user.resetPasswordToken = token
    user.resetPasswordExpires = Date.now() + 3600000
    await user.save()
    const emailOptions = {
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${process.env.NEXT_PUBLIC_API_URL}/changepassword/${token}`
    }
    await sendEmail(emailOptions)
    return new NextResponse('Password reset email sent successfully', { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
