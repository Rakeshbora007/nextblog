import React from 'react'
import Image from 'next/image'
import calender from '@public/calander.png'
import tag from '@public/tag.png'
import Title from './Title'
import Link from 'next/link'

const Card2 = ({ array }) => {
  return (
    <div>
      <Title heading="Spotlight" />
      <div className="mt-[80px]  mb-20 max-sm:mt-[30px] flex  justify-center flex-col items-center">
        <div className=" flex gap-[20px] max-sm:gap-[10px] flex-wrap justify-center  items-center">
          {array.map((e) => (
            <React.Fragment key={e._id}>
              <Link href={`/blog/${e._id}`} rel="preload">
                <div className="relative w-[390px] h-[516px] flex flex-wrap max-[800px]:w-[158px] max-[800px]:h-[224px] ">
                  <Image src={e.image} fill priority className="object-cover rounded-lg" sizes="(min-width: 820px) 390px, 158px , (max-width: 780px) 80px, 140px" alt="Your Image Alt Text" />
                  <div className="absolute text-white text-center max-[800px]:p-3 p-10 flex-col flex  h-[516px] max-[800px]:h-[224px] justify-between">

                    <div className="flex flex-col gap-10 max-[800px]:gap-4 ">
                      <h1 className="max-md:text-[13px] text-start font-bold xl:text-[24px]">Declutter and Simplify your Space</h1>
                      <div className="flex gap-8 max-[800px]:gap-2 ">
                        <div className="flex gap-4 max-[800px]:gap-1 items-center">
                          <div className="relative w-[16px] h-[16px] max-[800px]:w-[14px] max-[800px]:h-[14px] ">
                            <Image alt="calender" src={calender} fill sizes="(min-width: 820px) 18px, 14px" />
                          </div>
                          <span className="max-[800px]:text-[10px]">Nov 1, 2023</span>
                        </div>
                        <div className="flex gap-4  max-[800px]:gap-1 items-center">
                          <div className="relative w-[18px] h-[18px] max-[800px]:w-[14px] max-[800px]:h-[14px] ">
                            <Image alt="tag" src={tag} fill sizes="(min-width: 820px) 18px, 14px" />
                          </div>
                          <span className="max-[800px]:text-[10px] ">feature</span>
                        </div>
                      </div>
                    </div>
                    <h1 className="font-bold xl:text-start xl:text-[30px]">LOCAL</h1>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-50 transition-opacity duration-300 bg-black rounded-lg">
                  </div>
                </div>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Card2
