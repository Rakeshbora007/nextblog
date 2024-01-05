import Image from 'next/image'
import Link from 'next/link'
import PostFeatures from './PostFeatures'
import React from 'react'

const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const getData = async () => {
  const res = await fetch(`${api}/api/posts?cat`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error('failed to fetch data')
  }
  return res.json()
}

const Featured = async () => {
  const { posts } = await getData()
  const filteredFeaturedPosts = posts?.filter((post) => post.featuredCheck)
  return (
    <div className="main w-full flex flex-row">
      <div className="flex flex-col sm:flex-row gap-5 w-full">
        <Link href={`blog/${filteredFeaturedPosts[0]?._id}`} className="relative w-full sm:w-[50%] md:w-[60%] lg:w-[70%] xl:w-[85%] h-[260px] sm:h-[418px] md:h-[520px] lg:h-[620px] xl:h-[730px]">
          <Image alt="s" className="object-cover rounded-lg" src={filteredFeaturedPosts[0]?.image} fill priority
            sizes="(min-width: 1920px) 1096px, (min-width: 1280px) calc(52.9vw + 91px), (min-width: 1040px) calc(58.18vw - 33px), (min-width: 780px) calc(54.58vw - 33px), (min-width: 640px) calc(50vw - 30px), calc(100vw - 40px)" />
          <div className="text-white max-sm:pb-10 max-sm:pl-5 pb-20 max-lg:pb-10 pl-10 flex-col absolute top-0 left-0 w-full h-full flex gap-6 items-start justify-end">
            <div className="text-center gap-10  flex max-md:gap-6">
              <PostFeatures date={filteredFeaturedPosts[0]?.createdAt} image={true} blackcolor={false} />
              <PostFeatures image={false} blackcolor={false} />
            </div>
            <span className="w-[85%]  xl:text-[64px] font-bold xl:leading-[77px]">{filteredFeaturedPosts[0]?.title}</span>
          </div>
        </Link>
        <div className="flex flex-col max-sm:flex-row gap-5 sm:w-[50%]">
          {[1, 2].map((e) => (
            <React.Fragment key={e._id}>
              <Link href={`blog/${filteredFeaturedPosts[e]?._id}`} className="relative w-full h-[100px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[354px] max-sm:h-[110px]">
                <Image alt="s" className="rounded-lg object-cover" src={filteredFeaturedPosts[e]?.image} fill priority sizes="(min-width: 1920px) 644px, (min-width: 1280px) calc(30.97vw + 56px), (min-width: 1040px) calc(41.82vw - 27px), (min-width: 780px) calc(45.42vw - 27px), calc(50vw - 30px)" />
                <div className="text-white max-sm:pb-3 max-md:pl-2 pb-10 pl-10 flex-col absolute top-0 left-0 w-full h-full flex gap-6  max-md:gap-2 items-start justify-end">
                  <div className="text-center gap-10  max-sm:gap-2 flex">
                    <PostFeatures date={filteredFeaturedPosts[e]?.createdAt} image={true} />
                    <PostFeatures image={false} />
                  </div>
                  <h1 className="w-[100%] xl:text-[40px] max-sm:text-xs font-bold xl:leading-[48px]">{filteredFeaturedPosts[e]?.title}</h1>
                </div>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Featured
