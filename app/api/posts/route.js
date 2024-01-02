import connect from '@utils/db'
import Posts from '@models/Post'
import { NextResponse } from 'next/server'

export const GET = async (req) => {
  try {
    await connect()
    const { searchParams } = new URL(req.url)
    const cat = searchParams.get('cat')
    const searchTerm = searchParams.get('search')
    const page = parseInt(searchParams.get('page')) || 1
    const pageSize = parseInt(searchParams.get('pageSize')) || 6
    const condition = {}

    if (cat) {
      condition.category = cat
    }

    if (searchTerm) {
      condition.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } }
      ]
    }

    if (!searchParams.has('page')) {
      const allPosts = await Posts.find(condition)
      const totalPosts = allPosts.length
      return new NextResponse(JSON.stringify({ posts: allPosts, totalPosts }), {
        status: 200
      })
    }

    const skip = (page - 1) * pageSize
    const posts = await Posts.find(condition)
      .skip(skip)
      .limit(pageSize)

    const totalPosts = await Posts.countDocuments(condition)

    return new NextResponse(JSON.stringify({ posts, totalPosts }), {
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
    const {
      postId,
      featuredCheck,
      editorPick,
      categoriesCheck,
      healthCheck,
      spotliteCheck
    } = body
    await connect()
    if (postId) {
      const updatedPost = await Posts.findByIdAndUpdate(
        postId,
        {
          $set: {
            featuredCheck,
            editorPick,
            categoriesCheck,
            healthCheck,
            spotliteCheck
          }
        },
        { new: true }
      )
      if (!updatedPost) {
        return new NextResponse('Post not found', { status: 404 })
      }
      return new NextResponse(JSON.stringify(updatedPost), { status: 200 })
    }
    const newPost = new Posts(body)
    await newPost.save()
    return new NextResponse(JSON.stringify(newPost), { status: 201 })
  } catch (error) {
    console.error('Database Error:', error)
    return new NextResponse('Database Error', { status: 500 })
  }
}
