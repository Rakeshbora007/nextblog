import React from 'react'
import Posts from './Posts'
import { fetchData } from '@utils/api'

const EditorPick = async () => {
  const data = await fetchData()
  return (
    <Posts
      check={'editorPick'}
      postdata={data?.posts}
      title="Editor Pick"
      buttontext="Select Featured Image"
      heading={'All Updated Posts'}
    />
  )
}

export default EditorPick
