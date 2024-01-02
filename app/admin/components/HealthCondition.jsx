import React from 'react'
import { fetchData } from '@utils/api'
import Posts from './Posts'

const HealthCondition = async () => {
  const data = await fetchData('Health')

  return (
    <div>
      <div>
        <div className="h flex flex-col gap-20">
          <Posts
            check={'healthCheck'}
            postdata={data?.posts}
            title="Health Condition"
          />

        </div>
      </div>
    </div>
  )
}

export default HealthCondition
