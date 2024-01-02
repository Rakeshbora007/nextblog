import React from 'react'

const DateFormatter = ({ createdDate }) => {
  const inputDate = new Date(createdDate)
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ]
  const month = monthNames[inputDate.getUTCMonth()]
  const day = inputDate.getUTCDate()
  const year = inputDate.getUTCFullYear()
  const outputDateStr = month + ' ' + day + ', ' + year
  return (
        <div>{outputDateStr}</div>
  )
}

export default DateFormatter
