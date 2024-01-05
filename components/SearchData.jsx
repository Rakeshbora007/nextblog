'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
const api = process.env.NEXT_PUBLIC_API_URL
const SearchData = ({ search }) => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (search !== '') {
          const res = await fetch(`${api}/posts?search=${search}`, {
            cache: 'no-store'
          })
          if (!res.ok) {
            throw new Error('Failed to fetch data')
          }
          const data = await res.json()
          setPosts(data.posts)
        }
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchData()
  }, [search])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } }
  }

  return (
    <>
      {search === ''
        ? ''
        : (
          <motion.div
            className='flex-col w-[23%] top-[120px] gap-5 flex bg-[#ffffff] fixed z-50 text-[1pc] p-10 shadow-2xl'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
          >
            {posts.length === 0
              ? (
                <h1>No data Found</h1>
                )
              : (
                <>
                  {posts?.slice(0, 4).map((e, index) => (
                    <Link key={e._id} href={`/blog/${e._id}`} >
                      <motion.div

                        variants={itemVariants}
                        className={`flex gap-3 ${index < posts.length - 1 ? 'pb-5 border-b border-black' : ''}`}
                      >
                        <div className='relative w-[80px] h-[80px]'>
                          <Image alt='' src={e.image} fill className='rounded' priority sizes="(min-width: 640px) 80px, 80px" />
                        </div>
                        <div className='flex flex-col'>
                          <span className='font-bold'>{e.title.substring(0, 30)}</span>
                          <span>{e.category}</span>
                          <span>{e.username}</span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                  {posts?.slice(0, 4).length < 4
                    ? ''
                    : <Link href={`/searchedposts?search=${search}`} className='font-bold w-[180px] pb-1' >
                      Show more Results .....
                    </Link>}
                </>
                )}
          </motion.div >
          )}
    </>
  )
}

export default SearchData
