import Link from 'next/link'
import React from 'react'

const CommonButton = ({ button, linkbutton }) => {
  return (
    <div>
      <div className="w-full flex justify-center mt-[70px] mb-[120px] max-sm:mb-1 max-sm:mt-6">
        <Link
          href={`/${linkbutton}`}
          className="bg-[#1D3208] rounded-lg max-sm:text-[12px] text-[#AFE67F] w-[204px] max-sm:w-[100px] max-sm:h-[35px] flex h-[58px] justify-center items-center"
        >
          {button}
        </Link>
      </div>
    </div>
  )
}

export default CommonButton
