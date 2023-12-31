import React from 'react'
import CommonCard from './common/commonCard'
const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const getData = async () => {
  const res = await fetch(
    `${api}/api/posts?cat=`,
    {
      cache: 'no-store'
    }
  )
  if (!res.ok) {
    throw new Error('failed to fetch data')
  }
  return res.json()
}
const LatestPost = async () => {
  const { posts } = await getData()
  const reversedPosts = posts.slice().reverse()
  const firstFourReversedPosts = reversedPosts.slice(0, 5)
  return (
        <div>
            <CommonCard
                array={firstFourReversedPosts}
                category={'health'}
                title="Latest Blogs"
                description="Nutrition"
                width="w-[335px] "
                height="h-[215px]"
                bold="font-semibold"
                hovercolor="bg-black"
                button="show"
                buttonLink={'blogmain?cat='}
                show={true}
                des={true}
            />
        </div>
  )
}

export default LatestPost
