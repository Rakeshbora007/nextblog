import bcrypt from 'bcrypt'
import User from '@/models/User'
import connect from '@/utils/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export const GET = async (res) => {
  const session = await getServerSession()
  try {
    await connect()
    const user = await User.findOne(session.email, { password: 0 })
    return new NextResponse(JSON.stringify(user), { status: 200 })
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 })
  }
}

export const POST = async (request) => {
  try {
    const { name, email, password, image } = await request.json()
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ error: 'Email is already taken' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await connect()
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image
    })

    await newUser.save()
    return new NextResponse('User has been created', {
      status: 201
    })
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500
    })
  }
}

export const PUT = async (request) => {
  try {
    const {
      id,
      name,
      email,
      newPassword,
      image,
      socialLinks,
      description,
      resetPasswordToken
    } = await request.json()

    const existingUser = await User.findById(id)
    if (id) {
      if (!existingUser) {
        return new NextResponse(
          JSON.stringify({ error: 'User not found' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }
    }
    if (resetPasswordToken) {
      const user = await User.findOne({ resetPasswordToken })
      if (!user) {
        return new NextResponse(
          JSON.stringify({ error: 'Invalid reset password token' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }
      if (newPassword) {
        user.password = await bcrypt.hash(newPassword, 10)
        user.resetPasswordToken = null
        await user.save()
        return new NextResponse('Password has been updated', {
          status: 200
        })
      }
    }
    if (name && typeof name === 'object') {
      existingUser.name = {
        ...existingUser.name,
        isadmin: existingUser.name.isadmin // Retain the existing isadmin value
      }

      if (name.firstname) existingUser.name.firstname = name.firstname
      if (name.lastname) existingUser.name.lastname = name.lastname
      // Add other properties of the name object as needed
    } else {
      existingUser.name = existingUser.name || {} // Ensure existingUser.name is an object
    }

    // Update other fields, retaining existing values if not provided in the request
    existingUser.email = email || existingUser.email
    existingUser.image = image || existingUser.image
    existingUser.socialLinks = socialLinks || existingUser.socialLinks
    existingUser.description = description || existingUser.description

    // Save the updated user
    await existingUser.save()
    return new NextResponse('User has been updated', {
      status: 200
    })
  } catch (err) {
    console.error('Error in PUT request:', err)
    return new NextResponse(err.message, {
      status: 500
    })
  }
}
