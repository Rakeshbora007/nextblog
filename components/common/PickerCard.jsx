import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Title from './Title'
import PickerPostDetails from '@components/PickerPostDetails'
import CommonButton from './CommonButton'

const PickerCard = ({ posts, title, styles, fonttext, categorytext }) => {
  return (
    <div>
      {title ? <Title heading="Editor’s pick" /> : ''}
      <div className="max-sm:w-full  flex max-sm:pl-2  cursor:pointer  justify-between flex-wrap gap-[45px] max-md:gap-2">
        {posts?.map((e) => (
          <>
            <React.Fragment key={e._id}>
              <Link
                rel="preload"
                href={`/blog/${e._id}`}
                className="group flex cursor-pointer  max-md:w-[98%] gap-6 max-sm:gap-3 mt-10 max-sm:mt-4"
              >
                <div className={`relative  max-sm:w-[230px] max-sm:h-[100px] ${styles} rounded-xl group-hover:text-red-500`}>
                  <Image alt="" className="object-cover rounded-xl" src={e.image} fill priority sizes="(min-width: 720px) 302px, (min-width: 640px) calc(66.67vw - 165px), (min-width: 400px) calc(39.09vw - 12px), calc(96.25vw - 231px)" />
                  <div className="absolute top-0 left-0 w-full h-full hover:bg-black opacity-50 rounded-xl"></div>
                </div>
                <PickerPostDetails data={e} fonttext={fonttext} categorytext={categorytext} styles={styles} />
              </Link>
            </React.Fragment>
          </>
        ))}
      </div>
      {title
        ? <CommonButton button={'View More'} linkbutton={'blogmain?cat=&page=1'} />
        : ''
      }
    </div>
  )
}

export default PickerCard
