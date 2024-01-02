import React from 'react'
import moment from 'moment'

const Dateformat = ({ createdAt }) => {
  const formattedDate = createdAt
    ? moment(createdAt).format('D MMMM, YYYY [at] hh:mma')
    : 'Loading...'

  return (
    <div>
    {formattedDate}
    </div>
  )
}

export default Dateformat
