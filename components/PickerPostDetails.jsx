import React from 'react'
import PostFeatures from './PostFeatures'
const PickerPostDetails = ({ data, fonttext, categorytext, styles }) => {
  return (
        <div className={`${styles} max-sm:h-[94px]  justify-center gap-6 max-sm:gap-2 flex flex-col`}>
            <div className="w-[380px] max-sm:w-[177px]  flex gap-[18px]">
                <PostFeatures date={data?.createdAt} image={true} blackcolor={true} />
                <PostFeatures image={false} blackcolor={true} />
            </div>
            <h2 className={`group-hover:text-red-600 max-sm:text-[13px]  xl:${fonttext} font-bold`}>
                {data.title.substring(0, 24)}
            </h2>
            <h2 className={`group-hover:text-red-600 max-sm:text-[13px] xl:${categorytext} font-bold`}>
                Category : {data.category}
            </h2>
        </div>
  )
}

export default PickerPostDetails
