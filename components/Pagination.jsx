'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const Pagination = ({ page, count }) => {
  const postsPerPage = 6
  const hasPrevious = postsPerPage * (page - 1) > 0
  const hasNext = postsPerPage * (page - 1) + postsPerPage > count
  const router = useRouter()
  const buttonStyle = {
    base: 'bg-[#1D3208] h-11 w-44 text-center text-[#AFE67F] rounded-lg',
    active: 'cursor-pointer',
    inactive: 'cursor-not-allowed opacity-50'
  }
  return (

        <div className='flex justify-between w-[80%] mt-10 mb-12'>
            <button disabled={!hasPrevious} onClick={() => router.push(`blogmain?cat=&page=${page - 1}`)} className={`${buttonStyle.base} ${hasPrevious ? buttonStyle.active : buttonStyle.inactive}`}>
                Previous
            </button>
            <button disabled={hasNext} onClick={() => router.push(`blogmain?cat=&page=${page + 1}`)} className={`${buttonStyle.base} ${hasNext ? buttonStyle.inactive : buttonStyle.active}`}>
                Next
            </button>
        </div>
  )
}

export default Pagination
