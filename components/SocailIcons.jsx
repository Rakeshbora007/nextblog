import React from 'react'
import fb from '../public/fbs.svg'
import twitts from '../public/twitts.svg'
import insta from '../public/intashra.svg'
import linkdin from '../public/linkdin.svg'
import fb2 from '../public/fbgreen.svg'
import twitts2 from '../public/twittergreen.svg'
import insta2 from '../public/instagreen.svg'
import linkdin2 from '../public/linkdingreen.svg'
import Image from 'next/image'
import Link from 'next/link'

const SocailIcons = ({ links, color }) => {
  const iconsGreen = [{ icon: fb2, link: links?.facebook }, { icon: twitts2, link: links?.twitter }, { icon: insta2, link: links?.instagram }, { icon: linkdin2, link: links?.linkdin }]
  const iconsDarkgreen = [{ icon: fb, link: links?.facebook }, { icon: twitts, link: links?.twitter }, { icon: insta, link: links?.instagram }, { icon: linkdin, link: links?.linkdin }]
  const icons = color === 'light' ? iconsGreen : iconsDarkgreen
  return (

        <div className={'flex gap-6 max-sm:gap-3'}>
            {icons?.map((e, index) => (
                <div key={index} >
                    <div className='relative cursor-pointer w-[24px] h-[24px] max-sm:w-[18px] max-sm:h-[18px]'>
                        <Link href={`${e.link}`}>
                            <Image alt='hgasdjh' sizes='80px' src={e.icon} fill priority />
                        </Link>
                    </div>
                </div>
            ))}
        </div>

  )
}

export default SocailIcons
