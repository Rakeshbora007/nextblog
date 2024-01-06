import React from 'react'
import fb from '@public/fbs.svg'
import twitts from '@public/twitts.svg'
import insta from '@public/intashra.svg'
import linkdin from '@public/linkdin.svg'
import fb2 from '@public/fbgreen.svg'
import twitts2 from '@public/twittergreen.svg'
import insta2 from '@public/instagreen.svg'
import linkdin2 from '@public/linkdingreen.svg'
import Image from 'next/image'

const SocailIcons = ({ border, color }) => {
  const iconsGreen = [fb2, twitts2, insta2, linkdin2]
  const iconsDarkgreen = [fb, twitts, insta, linkdin]
  const icons = color === 'light' ? iconsGreen : iconsDarkgreen
  return (

        <div className={'flex gap-6 max-sm:gap-3'}>
            {icons?.map((e, index) => (

                <div key={index} className={`${border}`}>
                    <div className='relative w-[24px] h-[24px] max-sm:w-[18px] max-sm:h-[18px]'>
                        <Image alt='hgasdjh' src={e} fill priority />
                    </div>

                </div>
            ))}
        </div>

  )
}

export default SocailIcons
