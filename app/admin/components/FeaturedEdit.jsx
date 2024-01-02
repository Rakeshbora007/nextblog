import React from 'react'
import Posts from './Posts'
import { fetchData } from '@utils/api'

const FeaturedEdit = async () => {
  const data = await fetchData()
  return (
    <Posts
      check={'featuredCheck'}
      postdata={data?.posts}
      title="Featured Blogs"
      buttontext="Select Featured Image"
      heading={'All Updated Posts'}
    />
  )
}

export default FeaturedEdit
