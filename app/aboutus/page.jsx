import Image from 'next/image'
import React from 'react'
import image from '../../images/about.png'
import image2 from '../../images/newabout.png'
import bg from '../../images/cat.png'
import CommonCard from '@components/common/commonCard'
import Title from '@components/common/Title'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const api = process.env.NEXT_PUBLIC_API_URL
const getDatas = async () => {
  const res = await fetch(`${api}/api/content`)
  if (!res.ok) { throw Error('failed to fetch data') }
  return res.json()
}

const page = async () => {
  const data = await getDatas()
  const aboutUsData = (data[0]?.about.filter((e) => e.main === true))
  const authorData = (data[0]?.about.filter((e) => e.author === true))
  return (
    <>
      <div className="main2 w-full h-[832px] max-md:h-[516px] text-center text-[#AFE67F] items-center justify-center flex flex-col">
        <h1 className="w-full sm:w-[100%] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-5 sm:mt-10">
          About us
        </h1>
        <p className="text-[28px] mt-10 max-md:text-[12px] w-[70%]">
          {data[0]?.description}
        </p>
      </div>
      <div className="main flex  max-[1400px]:flex-col">
        <div className="flex-1 flex items-center mt-[120px] max-[1400px]:w-full max-[1400px]:justify-center max-[1400px]:items-center flex-col w-[297px]  gap-7">
          <div className="relative w-[297px] h-[297px]  max-md:w-[200px] max-md:h-[200px]">
            <Image src={aboutUsData[0]?.image} className="rounded-full" alt="Katie Bolin" fill sizes="(min-width: 780px) 297px, 200px" />
          </div>
          <h1 className="w-[297px] font-semibold text-[24px] text-center">
            {aboutUsData[0]?.name}
            <h3 className="text-[18px] font-normal">{aboutUsData[0]?.profession}</h3>
          </h1>
        </div>
        <div className="w-[1000px] max-sm:w-full flex flex-col gap-[120px] max-sm:gap-[70px] max-[1400px]:w-[100%]">
          <div
            className="h-auto  mt-[100px] max-md:mt-10 w-full flex flex-col justify-center"
            dangerouslySetInnerHTML={{
              __html: data[0]?.content
                .replace(
                  /<h1/g,
                  '<h1 id="targetH1" class="text-[30px] max-md:text-[16px] font-bold"'
                )
                .replace(/<p/g, '<p class="text-[19px] max-md:text-[14px] leading-26"')
            }}
          ></div>
        </div>
      </div>
      <div className="mt-[140px] max-sm:mt-[70px]">
        <CommonCard
          show={true}
          array={data[0]?.about.filter((e) => e.teams === true)}
          title="Our Team"
          bgImage={bg}
          width="w-[335px] "
          height="h-[215px]"
          bold="font-semibold"
          hovercolor="bg-black"
          para="CBD Experts"
          Links="author"
          nameteam={true}
        />
      </div>
      <div className="mt-[140px]">
        <Title heading="Our Blog" />
        <div className="main flex  justify-center flex-col ">
          <div className="flex mt-[70px]  mb-[50px]  gap-[104px] max-lg:w-full max-lg:justify-center max-lg:items-center max-lg:flex-col ">
            <div className="relative w-[306px] h-[306px] max-md:w-[200px] max-md:h-[200px] ">
              <Image src={authorData[0]?.image} alt="Katie Bolin" fill className="rounded-full" />
            </div>
            <div className="flex-1 flex-col flex gap-10 max-lg:w-full w-[1210px]">
              <h2 className="text-[32px] font-bold">{authorData[0]?.name}</h2>
              <p className="text-[20px] max-sm:text-[14px]">
                {data[0]?.description1}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="main">
        <div
          className="h-auto  mt-[100px]  max-md:mt-10  w-full flex flex-col justify-center"
          dangerouslySetInnerHTML={{
            __html: data[0].content1
              .replace(
                /<h1/g,
                '<h1 id="targetH1" class="text-[30px] font-bold"'
              )
              .replace(/<p/g, '<p class="text-[19px] max-md:text-[14px] leading-26"')
          }}
        ></div>
        <div className="mt-[80px] max-md:mt-[24px] max-sm:mt-2 mb-40 gap-10 max-sm:gap-5  flex flex-col">
          <h3 className="text-[38px]  font-bold leading-[58px] text-[#1D3208] max-sm:text-[18px] max-sm:w-[100%]  max-sm:leading-[21px]">
            We aim to share our daily content with you and hope it brings value
            to your day.
          </h3>
          <p className="text-lg lg:text-xl xl:text-[24px] max-sm:leading-5 max-sm:text-[14px] max-sm:w-[100%] ">
            Welcome to Local, your daily source for inspiration and life
            stories. We are passionate about daily insights, stories, and
            discoveries with you. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum.
          </p>
          <div className="w-full max-sm:w-[100%] mt-32  max-sm:mt-5 flex max-sm:flex-col">
            <div className="flex flex-col w-[800px] max-sm:w-[100%] gap-5  justify-between">
              <h1 className="text-[32px] font-bold   max-sm:w-[100%]  max-sm:text-[18px]   max-sm:leading-[21px] ">
                We love hearing from our readers and welcome your feedback,
                suggestions, and comments.
              </h1>
              <p className="text-[20px] max-sm:w-[100%] max-sm:text-[14px] ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="text-[20px] max-sm:text-[14px] max-sm:w-[100%]">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>

            <div className="flex-1  max-sm:items-center max-sm:mt-10 max-sm:justify-center text-2xl flex items-end justify-end">
              <div className="max-sm:h-[254px]   max-sm:w-[330px] w-[526px] h-[405px] relative bg-black">
                <Image src={image} alt="Katie Bolin" width={526} height={405} sizes="(min-width: 780px) 297px, 200px" />
              </div>
            </div>
          </div>

          <div className="w-full mt-32  max-sm:mt-5 justify-between flex max-sm:flex-col-reverse">
            <div className="max-sm:flex-1  max-sm:items-center max-sm:mt-10 max-sm:justify-center text-2xl flex items-end justify-end">
              <div className="max-sm:h-[254px]   max-sm:w-[330px] w-[526px] h-[405px] relative bg-black">
                <Image src={image2} alt="Katie Bolin" width={526} height={405} sizes="(min-width: 780px) 297px, 200px" />
              </div>
            </div>

            <div className="w-[937px] max-sm:w-[100%] flex flex-col max-sm:gap-5 justify-between">
              <p className="text-[32px] text-[#1D3208] font-bold leading-[38px] max-sm:text-[18px] max-sm:w-[100%]  max-sm:leading-[21px]">
                We love hearing from our readers and welcome your feedback,
                suggestions, and comments.
              </p>
              <p className="text-[20px] max-sm:text-[14px] max-sm:w-[100%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ultrices tincidunt arcu non sodales neque sodales. Bibendum enim
                facilisis gravida neque convallis a cras semper. Velit euismod
                in pellentesque massa placerat duis. Tortor condimentum lacinia
                quis vel eros donec.
              </p>

              <div className="w-full justify-start flex max-sm:hidden">
                <button className="text-[#AFE67F] bg-[#1D3208] p-[13px] w-[204px] rounded-md">
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
