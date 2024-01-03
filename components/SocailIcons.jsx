import React from 'react'
import fb from '../images/fbs.svg'
import twitts from '../images/twitts.svg'
import insta from '../images/intashra.svg'
import linkdin from '../images/linkdin.svg'
import Image from 'next/image'

const SocailIcons = ({ border }) => {
  return (

        <div className={'flex gap-6 max-sm:gap-3'}>
            {[fb, twitts, insta, linkdin].map((e, index) => (

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
