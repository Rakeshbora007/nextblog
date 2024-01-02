'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const PostCard = ({ posts }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {posts.map((E) => (
        <div
          key={E._id}
          className="bg-white shadow-lg overflow-hidden max-sm:px-3"
        >
          <div className="md:flex flex justify-center items-center ">
            <div className="flex-2 sm:flex py-1 px-1 pt-2">
              <div className="relative h-36 w-36 md:h-[224px] md:w-[220px] max-sm:w-[60px] max-sm:h-[60px] max-sm:m-2">
                <Image
                  priority={true}
                  alt="Image"
                  src={E.image}
                  className="rounded shadow-lg "
                  fill={true}
                  sizes="(max-width: 768px) 30vw, (max-width: 1200px) 33vw, 22vw"
                />
              </div>
            </div>
            <div className="md:w-3/5 p-4 md:p-6 gap-1 flex-1 flex-col">
              <h1 className="text-2xl md:text-3xl font-semibold max-sm:text-xs text-gray-800 capitalize">
                {E.title}
              </h1>
              <span className="text-sm text-red-600 block mt-2">
                {timeAgo.format(new Date(E.createdAt).getTime())}
              </span>
              <p className="text-sm text-gray-600 mt-2 capitalize max-sm:text-xs">
                {E.desc.slice(0, 40)}
              </p>
              <div className="text-sm text-gray-600 mt-4">
                <h3 className="mb-1">{E.category}</h3>
              </div>

              <Link
                href={`/blog/${E._id}`}
                className="text-blue-500 hover:underline text-sm inline-block"
              >
                Read more...
              </Link>
            </div>
            <div className="relative inline-block text-left h-[12pc] items-start mr-4">
              <div>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-gray-600 focus:outline-none"
                >
                  <div className="flex gap-1 text-lg font-bold">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                </button>
              </div>
              {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Delete
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      View
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default PostCard
