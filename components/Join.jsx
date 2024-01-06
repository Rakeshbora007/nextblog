import React from 'react'
import tick from '../images/badge.png'
import Image from 'next/image'
import footerImage from '../images/foot.jpg'

const Join = () => {
  return (
    <div className="w-full overflow-hidden bg-[rgb(29,50,8)] h-[auto] flex justify-center items-center flex-col   text-[#AFE67F] pt-[87px] ">
      <div className=" flex mt-[85px] h-[auto] max-[1200px]:flex-col gap-10   max-[1200px]:items-center justify-between w-full main">
        <div className="max-[800px]:pl-10 gap-12 flex flex-col  justify-center max-[1200px]:mb-20  max-[1200px]:w-[450px]  max-[1200px]:h-[400px]">
          <h1 className='xl:text-[30px] font-bold'>
            Join our Urban Community
          </h1>
          <span className="w-[50%] xl:text-[19px]  font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </span>
          <div className="max-sm:pl-[20px] gap-5 flex flex-col">
            <div className="flex gap-5">
              <div className="relative w-[24px] h-[24px] max-sm:w-[18px] max-sm:h-[18px]">
                <Image alt="" src={tick} fill priority sizes="(min-width: 640px) 24px, 18px" />
              </div>
              <span>Regular Access to Quality Content</span>
            </div>
            <div className="flex gap-5">
              <div className="relative w-[24px] h-[24px] max-sm:w-[18px] max-sm:h-[18px]">
                <Image alt="" src={tick} fill priority sizes="(min-width: 640px) 24px, 18px" />
              </div>
              <span>Convenience and Delivery</span>
            </div>
            <div className="flex gap-5">
              <div className="relative w-[24px] h-[24px] max-sm:w-[18px] max-sm:h-[18px]">
                <Image alt="" src={tick} fill priority sizes="(min-width: 640px) 24px, 18px" />
              </div>
              <span>Enjoy the publication regularly</span>
            </div>
          </div>
          <div className="max-sm:pl-[20px]">
            <button className="bg-[#AFE67F] rounded-lg text-[#1D3208] xl:text-[19px] font-bold  w-[253px] flex h-[60px] justify-center items-center">
              Join For Free
            </button>
          </div>
        </div>
        <div className="flex items-center  max-[1200px]:w-[300px]  max-[1200px]:h-[270px] relative w-[732px] h-[600px]">
          <Image alt="" src={footerImage} className='rounded-3xl' fill priority sizes="(min-width: 1920px) 711px, (min-width: 1280px) calc(34.68vw + 52px), (min-width: 1220px) calc(45vw - 30px), 300px" />
        </div>
      </div>

      <div className="max-sm:w-[530px] w-full  justify-center flex">
        <div className="w-[1168px] h-[444px] max-[1250px]:h-[200px]  gap-14 my-[152px]  max-sm:mt-[20px] max-sm:mb-[70px] flex-col max-[1250px]:w-[67%]  bg-[#AFE67F]  max-[800px]:rounded-lg rounded-3xl justify-center items-center flex">
          <h1 className="text-[#1D3208]  xl:text-[25px] font-semibold">
            Join our newsletter <br />
            and get updated with latest trends & News
          </h1>
          <div className="flex gap-5 max-[1250px]:w-[90%] ">
            <input
              className="max-[800px]:w-[90%] max-[800px]:h-[30px]  placeholder:text-[#585858] placeholder:text-[14px]  rounded-md w-[628px] h-[60px] px-[39px]"
              placeholder="Enter email..."
            />
            <button className="bg-[#1D3208]  max-[800px]:h-[30px] w-[186px] h-[58px] rounded-md ">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Join
