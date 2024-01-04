import React from 'react'
import PickerPostDetails from './PickerPostDetails'
const api = process.env.NEXT_PUBLIC_API_URL

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
const RecentPost = async () => {
  const { posts } = await getData()
  const reversedPosts = posts.slice(0, 5).reverse()
  return (
    <div className="max-lg:hidden">
      <div className="flex-1 ">
        <div className="flex w-full  justify-center items-center gap-2 h-[70px]">
          <span className="text-[24px] w-[460px] font-bold">
            Recent posts
          </span>
          <hr className="w-full" />
        </div>
        <div className="mb-[60px]  w-full flex-col flex  flex-wrap gap-[10px]">
          {reversedPosts?.map((e) => (
            <>
              <PickerPostDetails data={e} styles='w-[302px] h-[223px]' fonttext={'text-[24px]'} categorytext='text-[20px]'/>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentPost
