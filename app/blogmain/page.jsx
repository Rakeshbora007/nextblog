import React from 'react'
import RecentPost from '@components/RecentPost'
import PickerCard from '@components/common/PickerCard'
import LatestPost from '@components/LatestPost'
import CategoriesImage from '@components/CategoriesImage'
import { fetchData } from '@utils/api'
import CommonCard from '@components/common/commonCard'
import Pagination from '@components/Pagination'

const api = process.env.NEXT_PUBLIC_API_URL
const getData = async (Categories, page) => {
  const res = await fetch(`${api}/api/posts?cat=${Categories}&page=${page}`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error('failed to fetch data')
  }
  return res.json()
}

const SingleBlogPage = async ({ searchParams }) => {
  const { cat } = searchParams
  const { page } = searchParams
  const { posts, totalPosts } = await getData(cat, page)
  const data = await fetchData()
  const categoriesdata = data?.posts?.filter((post) => post.categoriesCheck)
  return (
    <>
      {searchParams.cat === 'categories'
        ? (
        <CategoriesImage
          title={'Blog Category'}
          description={'Welcome to our daily blog, your daily dose of inspiration, information, and entertainment. Join us as we navigate the everyday journey of life.'}
        />
          )
        : (
        <CategoriesImage
          title={'Blog'}
          description={'Welcome to our daily blog, your daily dose of inspiration, information, and entertainment. Join us as we navigate the everyday journey of life.'}
        />
          )}
      <div className='main flex justify-between'>
        <div className='w-[60%]  max-md:w-[100%] flex cursor:pointer flex-col gap-[50px] max-[900px]:gap-6'>
          {searchParams.cat === 'categories'
            ? (
            <div className='flex flex-wrap gap-10'>
              <CommonCard
                array={categoriesdata}
                title='categories'
                width='w-[380px] mt-[40px]'
                height='h-[215px]'
                bold='font-semibold'
                hovercolor='bg-black'
                Links='category'
                button={true}
                buttonLink={'categories'}
                show={false}
              />
            </div>
              )
            : (
            <PickerCard posts={posts} title={false} styles='w-[468px] h-[321px]' fonttext='text-[40px]' categorytext={'text-[23px]'}/>
              )}

          {page === undefined ? '' : <Pagination page={parseInt(page)} count={totalPosts} />}
        </div>
        <RecentPost />
      </div>
      <LatestPost />
    </>
  )
}

export default SingleBlogPage
