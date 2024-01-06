import React from 'react'
import Image from 'next/image'
import Title from './Title'
import CommonButton from './CommonButton'
import Link from 'next/link'
const CommonCard = ({
  title,
  array,
  width,
  height,
  para2,
  button,
  category,
  Links,
  buttonLink,
  nameteam,
  show, des
}) => {
  return (
    <div>
      {show ? <Title heading={title} /> : ''}
      <div className={`${show ? 'mt-[100px]' : 'mt-[1px] '}  ${show ? 'max-sm:mt-[27px]' : 'max-sm:mt-[2px]'}  flex justify-center flex-col items-center`}>
        <div className="flex gap-[11px] justify-center flex-wrap items-center">
          {array?.map((e) => (
            <Link
              key={e._id}
              rel="preload"
              href={
                Links === 'category'
                  ? `/blogmain?cat=${e.category}`
                  : `/blog/${e._id}`
              }
              className={`${width} relative max-[800px]:w-[188px]  max-sm:w-[140px]  hover:text-[red] mb-5`}
            >
              <div className={`relative ${height} max-[800px]:h-[100px] `}>
                <Image alt="" src={e.image} fill className="object-cover rounded-lg " priority sizes="(min-width: 820px) 335px, (min-width: 640px) 188px, 140px" />
                <div
                  className={'hover:bg-black  transition-all cursor-pointer duration-[300ms] opacity-30 rounded-lg absolute top-0 left-0 right-0 bottom-0 m-auto'}
                ></div>
              </div>
              <div
                className={'mt-5 max-[800px]:mt-2 text-center max-md:text-[12px] xl:text-[24px] xl:font-bold w-full flex flex-col justify-center'}
              >
                {nameteam === true ? <h3 className="">{`${category === 'health' ? e.title : e.name}`}</h3> : <h3 className="">{`${category === 'health' ? e.title.substring(0, 22) : e.category}`}</h3>}
                {para2 && <h3 className="">{e.title}</h3>}
                <p className="">
                  {e.profession}
                </p>
                {des ? <h2 className="text-[17px] max-sm:text-[12px]">{e.desc.substring(0, 47)} </h2> : ''}
                <p className="">{para2}</p>
              </div>
            </Link>
          ))}
        </div>
        {show ? <> {button && <CommonButton button={'View More'} linkbutton={buttonLink} />}</> : ''}
      </div>
    </div>
  )
}

export default CommonCard
