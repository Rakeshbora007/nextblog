import React from 'react'
import bg2 from '@public/Rec.jpg'
import Image from 'next/image'

const CategoriesImage = ({ title, description }) => {
  return (
        <div className="main2 text-center text-[#000000] flex flex-col items-center justify-center">
            <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]">
                <Image alt="" src={bg2} fill priority className="object-cover w-full h-full" sizes="(max-width: 780px) 100px" />
            </div>
            <div className="absolute flex flex-col justify-center items-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">{title}</h1>
                <p className="max-w-[30rem] mt-10 sm:max-w-[40rem] md:max-w-[50rem] lg:max-w-[60rem] xl:max-w-[70rem] text-sm sm:text-base lg:text-lg w-[90%]">
                    {description}
                </p>
            </div>
        </div>

  )
}
export default CategoriesImage
