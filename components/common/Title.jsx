import React from 'react'

const Title = ({ heading }) => {
  return (
    <div>
      <div className="flex items-center justify-center  main w-[100%] ">
        <hr className="flex-grow border-t"></hr>
        <span className="mx-[40px] text-[36px]  max-[800px]:text-[16px]   max-[800px]:mx-[20px]   font-bold">{heading}</span>
        <hr className="flex-grow border-t"></hr>
      </div>
    </div>
  )
}

export default Title
