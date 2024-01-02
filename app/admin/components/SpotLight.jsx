import React from 'react'
import Posts from './Posts'
import { fetchData } from '@utils/api'

const SpotLight = async () => {
  const { posts } = await fetchData()
  return (
    <Posts
      check={'spotliteCheck'}
      postdata={posts}
      buttontext="Select Featured Image"
      heading={'All Updated Posts'}
      title="Spotlights"
    />
  )
}

export default SpotLight
