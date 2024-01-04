import React from 'react'
import Image from 'next/image'
const api = process.env.NEXT_PUBLIC_API_URL
const getData = async (Categories, search) => {
  const res = await fetch(
    `${api}/posts?cat=${Categories}&search=${search}`,
    {
      cache: 'no-store'
    }
  )
  if (!res.ok) {
    throw new Error('failed to fetch data')
  }
  return res.json()
}

const PopularCard = async ({ Categories, search }) => {
  const { posts } = await getData(Categories, search)
  return (
    <>
      {posts.map((e) => (
        <>
          <div
            key={e._id}
            className="w-full flex gap-4 p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-transform transform hover:scale-105 justify-center items-center"
          >
            <div className="w-16 h-16 relative rounded-full overflow-hidden max-[800px]:hidden">
              <Image
                priority
                sizes="(max-width: 600px) 100vw, 50vw"
                src={e.image}
                alt="Profileimage"
                fill
              />
            </div>
            <div className="flex flex-col text-sm  flex-1 gap-2">
              <div className="flex items-center w-full justify-between ">
                <span className="font-semibold capitalize text-md">
                  {e.title}
                </span>
                <span className="text-gray-600 capitalize">{e.category}</span>
              </div>
              <p className="text-gray-700 capitalize text-[13px]">
                {e.desc.slice(0, 40)}
              </p>
              <p className="text-gray-500 text-[10px]">
                {new Date(e.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </>
      ))}
    </>
  )
}

export default PopularCard
