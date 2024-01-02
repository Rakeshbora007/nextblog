'use client'
import React, { useState } from 'react'
import images from '../images/Th.png'
import add from '../images/add.svg'
import minus from '../images/minus.svg'
import Image from 'next/image'

const Footer = () => {
  const [bool, setbool] = useState(false)
  const [bool1, setbool1] = useState(false)
  const [bool2, setbool2] = useState(false)
  return (
    <footer className="bg-[#1D3208] text-white  ">
      <div className=" mx-auto mt-20   text-[#AFE67F] border-[#AFE67F] flex flex-col ">
        <div className="main w-full ">
          <div className="flex justify-between">
            <div className="flex flex-col ">
              <Image src={images} alt="logo" priority height={40} width={40} />
              <span className=" text-[48px] max-sm:text-[24px] font-bold text-[#AFE67F] h-[58px] flex relative bottom-2 uppercase">
                Local
              </span>
            </div>
            <div className="flex gap-[174px] relative top-10 max-[1200px]:hidden">
              <div className="flex flex-col gap-12 ">
                <span className="font-bold text-[24px]">Topics</span>
                <div className="flex flex-col gap-5">
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Business
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Technology
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Investment
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Health
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Education
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Productivity
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Sports
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Life hacks
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Travel
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-12 ">
                <span className="font-bold text-[24px]">Highlights</span>
                <div className="flex flex-col gap-5">
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Marketing
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Finance
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Digital
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Strategy
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Personal
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Startup
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Ideas
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Funding
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    NGO’s
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-12 ">
                <span className="font-bold text-[24px]">Sitemap</span>
                <div className="flex flex-col gap-5">
                  <span className="flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    About us
                  </span>

                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Our partner
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Contact
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Help Center
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Our Blog
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Careers
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Resources
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-[26px]  text-2xl font-semibold max-sm:mt-[0px] mt-10 w-[223px] h-[44px] text-[#AFE67F] justify-center items-center rounded-full">

            </div>
          </div>
          <div className="flex gap-7 relative top-10  flex-col min-[1200px]:hidden">
            <div className="flex flex-col gap-12 ">
              <div>
                <div className="mb-5 border-b-[2px] w-full flex  justify-between pb-4  border-[#AFE67F]">
                  <span className="font-bold text-[24px] ">Topics</span>
                  <Image
                    onClick={() => setbool(!bool)}
                    className="cursor-pointer"
                    src={bool === false ? add : minus}
                    width={30}
                    height={30}
                    alt=""
                  />
                </div>
                <div
                  className={`${
                    bool === false ? 'hidden' : 'flex'
                  } flex-col gap-5  `}
                >
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Business
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Technology
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Investment
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Health
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Education
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Productivity
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Sports
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Life hacks
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Travel
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-12 ">
              <div>
                <div className="mb-5 border-b-[2px] w-full flex  justify-between pb-4  border-[#AFE67F]">
                  <span className="font-bold text-[24px] ">Highlights</span>
                  <Image
                    onClick={() => setbool1(!bool1)}
                    className="cursor-pointer"
                    src={bool1 === false ? add : minus}
                    width={30}
                    height={30}
                    alt=""
                  />
                </div>
                <div
                  className={`${
                    bool1 === false ? 'hidden' : 'flex'
                  } flex-col gap-5  `}
                >
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Marketing
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Finance
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Digital
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Strategy
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Personal
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Startup
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Ideas
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Funding
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    NGO’s
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-12 ">
              <div>
                <div className="mb-5 border-b-[2px] w-full flex  justify-between pb-4  border-[#AFE67F]">
                  <span className="font-bold text-[24px] ">Sitemap</span>
                  <Image
                    onClick={() => setbool2(!bool2)}
                    className="cursor-pointer"
                    src={bool2 === false ? add : minus}
                    width={30}
                    height={30}
                    alt=""
                  />
                </div>
                <div
                  className={`${
                    bool2 === false ? 'hidden' : 'flex'
                  } flex-col gap-5  `}
                >
                  <span className="flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    About us
                  </span>

                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Our partner
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Contact
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Help Center
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Our Blog
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Careers
                  </span>
                  <span className=" flex w-auto max-w-fit hover:border-b hover:border-[#afe67f] hover:text-[#afe67f] transition-transform transform origin-bottom cursor-pointer">
                    Resources
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[150px] mb-[63px]">
            2023 @ All Rights Reserved. LocalNews
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
