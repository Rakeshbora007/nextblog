'use client'
import React, { useState } from 'react'
import search from '@public/searchicon.png'
import Image from 'next/image'
import SearchData from './SearchData'

const SearchInput = () => {
  const [isInputVisible, setIsInputVisible] = useState(false)
  const [text, settext] = useState('')
  const toggleInput = () => {
    setIsInputVisible(!isInputVisible)
  }

  return (
        <>
            <div className="relative">
                <div
                    className={'bg-[#AFE67F] w-[44px] h-[44px] rounded-full flex justify-center items-center md:flex max-sm:hidden cursor-pointer'}
                    onClick={toggleInput}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Image
                        src={search}
                        alt="logo"
                        priority
                        height={17}
                        width={17}
                    />
                </div>
                {isInputVisible && (
                    <div className='flex-col flex'>
                        <input
                            onChange={e => settext(e.target.value)}
                            type="text"
                            placeholder="Search..."
                            className="transition-all ease-in-out duration-300 w-[400px] absolute top-0 right-0 mt-2 mr-20 p-2 border rounded outline-none bg-white"
                        />
                        <div onClick={() => setIsInputVisible(!isInputVisible)} className='relative right-[33pc]'>
                            <SearchData search={text} />
                        </div>
                    </div>
                )}
            </div>

        </>
  )
}

export default SearchInput
