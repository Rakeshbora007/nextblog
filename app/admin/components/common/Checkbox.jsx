'use client'
import React, { useEffect, useState } from 'react'

const updateFeatureStatusAPI = async (postId, currentStatus, field) => {
  if (field === 'featuredCheck' || field === 'editorPick' || field === 'categoriesCheck' || field === 'healthCheck' || field === 'spotliteCheck') {
    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId,
          [field]: `${currentStatus !== true}`
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(`Error: ${data.message}`)
      }

      return `${field} updated successfully.`
    } catch (error) {
      throw new Error(`An error occurred while updating ${field}.`)
    }
  }
}

const Checkbox = ({ postId, posts, checkfor }) => {
  // const [, setMessage] = useState('')
  const [editorPickStatus, setEditorPickStatus] = useState(posts.editorPick)
  const [featuredCheckStatus, setFeaturedCheckStatus] = useState(posts.featuredCheck)
  const [categoriesCheckStatus, setCategoriesCheckStatus] = useState(posts.categoriesCheck)
  const [healthCheckStatus, setHealthCheckStatus] = useState(posts.healthCheck)
  const [spotliteCheckStatus, setSpotliteCheckStatus] = useState(posts.spotliteCheck)

  const handleUpdateStatus = async () => {
    try {
      const responseMessage = await updateFeatureStatusAPI(
        postId,
        checkfor === 'editorPick'
          ? editorPickStatus
          : checkfor === 'featuredCheck'
            ? featuredCheckStatus
            : checkfor === 'categoriesCheck'
              ? categoriesCheckStatus
              : checkfor === 'healthCheck'
                ? healthCheckStatus
                : spotliteCheckStatus,
        checkfor
      )
      setMessage(responseMessage)

      // Update the correct state based on the checkfor prop
      if (checkfor === 'editorPick') {
        setEditorPickStatus((prevStatus) => !prevStatus)
      } else if (checkfor === 'featuredCheck') {
        setFeaturedCheckStatus((prevStatus) => !prevStatus)
      } else if (checkfor === 'categoriesCheck') {
        setCategoriesCheckStatus((prevStatus) => !prevStatus)
      } else if (checkfor === 'healthCheck') {
        setHealthCheckStatus((prevStatus) => !prevStatus)
      } else if (checkfor === 'spotliteCheck') {
        setSpotliteCheckStatus((prevStatus) => !prevStatus)
      }
    } catch (error) {
      setMessage(error.message)
    }
  }

  useEffect(() => {
    setEditorPickStatus(posts.editorPick)
    setFeaturedCheckStatus(posts.featuredCheck)
    setCategoriesCheckStatus(posts.categoriesCheck)
    setHealthCheckStatus(posts.healthCheck)
    setSpotliteCheckStatus(posts.spotliteCheck)
  }, [posts.editorPick, posts.featuredCheck, posts.categoriesCheck, posts.healthCheck, posts.spotliteCheck])

  return (
    <div>
      <input
        type="checkbox"
        onChange={handleUpdateStatus}
        checked={
          checkfor === 'editorPick'
            ? editorPickStatus
            : checkfor === 'featuredCheck'
              ? featuredCheckStatus
              : checkfor === 'categoriesCheck'
                ? categoriesCheckStatus
                : checkfor === 'healthCheck'
                  ? healthCheckStatus
                  : spotliteCheckStatus
        }
        className="cursor-pointer w-6 h-6 text-blue-500"
      />
    </div>
  )
}

export default Checkbox
