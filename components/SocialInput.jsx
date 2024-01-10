import Image from 'next/image'
import React from 'react'

const SocialInput = ({
  icon,
  name,
  value,
  onChange,
  placeholder,
  validationErrors
}) => {
  return (
    <div className='w-full flex gap-5 justify-center'>
      <Image src={icon} alt={name} />
      <input
        className={`w-[50%] pl-3 h-[50px] max-sm:w-[90%] rounded-lg ${
          validationErrors?.find((error) => error.path[0] === name)
            ? 'border-red-500 border-[2px] border-solid'
            : ''
        }`}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
    </div>
  )
}

export default SocialInput
