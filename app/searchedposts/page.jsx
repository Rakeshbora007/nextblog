import PickerCard from '@components/common/PickerCard'
import Title from '@components/common/Title'
import React from 'react'
const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const getData = async (search) => {
  const res = await fetch(`${api}/api/posts?search=${search}`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error('failed to fetch data')
  }
  return res.json()
}

const SearchedPosts = async ({ searchParams }) => {
  const { posts } = await getData(searchParams.search)
  return (
        <div className='main '>
            <Title heading={`Search Results for "${searchParams.search}"`} />
            <PickerCard posts={posts} styles='w-[302px] h-[223px]' fonttext={'text-[24px]'} categorytext={'text-[16px]'}/>
        </div>
  )
}

export default SearchedPosts
