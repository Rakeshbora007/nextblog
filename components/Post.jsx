import React from 'react'
import PostCard from './PostCard'

import PopularCard from './PopularCard'
import Pagination from './Pagination'
const api = process.env.NEXT_PUBLIC_API_URL
const getData = async (Categories, page) => {
  const res = await fetch(
    `${api}/api/posts?cat=${Categories}&page=${page} `,
    {
      cache: 'no-store'
    }
  )
  if (!res.ok) {
    throw new Error('failed to fetch data')
  }
  return res.json()
}

const Post = async ({ Categories, page }) => {
  const { posts, totalCount } = await getData(Categories, page)
  const POST_PER_PAGE = 6
  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < totalCount
  return (
    <div className="w-full pb-10">
      <div className="w-full h-[auto] flex  py-5 gap-6">
        <div className="flex-1  flex flex-col gap-5">
          <PostCard Categories={Categories} page={page} posts={posts} />
          <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
        </div>
        {Categories === ''
          ? (
          <div className=" gap-5 flex w-96  items-center flex-col max-sm:hidden">
            <h1 className="w-full items-center flex justify-center bg-gradient-to-r from-blue-400 to-indigo-600 h-10 text-center font-bold rounded-lg text-white">
              Recently added
            </h1>
            <PopularCard Categories={Categories} />

            <h1 className="w-full items-center flex justify-center bg-gradient-to-r from-indigo-400 to-blue-600 h-10 text-center font-bold rounded-lg text-white">
              Trending
            </h1>
            <PopularCard Categories={Categories} />
          </div>
            )
          : (
          <></>
            )}
      </div>
    </div>
  )
}

export default Post
