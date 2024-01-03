import React from 'react'
import tag from '../images/tagwhite.svg'
import calendar from '../images/whitecalander.svg'
import tag2 from '../images/blacktag.svg'
import calendar2 from '../images/calendarblack.svg'
import Image from 'next/image'
import DateFormatter from './DateFormatter'

const PostFeatures = ({ image, blackcolor, date }) => {
  const imageSource = image ? calendar : tag
  const imageSource2 = image ? calendar2 : tag2
  return (
        <div className="flex gap-3 max-md:gap-2 justify-center items-center">
            <div className="relative w-[30px] h-[30px] max-sm:w-3 max-sm:h-3">
                <Image
                    alt="iconimage"
                    src={blackcolor ? imageSource2 : imageSource}
                    fill
                    priority
                    sizes="(min-width: 640px) 25px, 16px"
                />
            </div>
            <span className="max-md:text-[9px] xl:text-[18px]">
                {image ? <DateFormatter createdDate={date} /> : 'Featured'}
            </span>
        </div>
  )
}

export default PostFeatures
