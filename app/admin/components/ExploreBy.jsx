import React from 'react'
import { fetchData } from '@utils/api'
import Posts from './Posts'

const ExploreBy = async () => {
  const data = await fetchData()

  const filterDuplicateCategories = () => {
    const uniqueCategories = new Set()
    const filteredPosts = []

    for (const post of data?.posts) {
      if (!uniqueCategories.has(post.category)) {
        uniqueCategories.add(post.category)
        filteredPosts.push(post)
      }
    }

    return filteredPosts
  }
  const filteredPosts = filterDuplicateCategories()
  return (
    <div>
     <Posts
      check={'categoriesCheck'}
      postdata={filteredPosts}
      title="Explore By"
      categories={true}
    />
    </div>
  )
}

export default ExploreBy
