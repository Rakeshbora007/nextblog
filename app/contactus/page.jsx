import React from 'react'
import ContactUsForm from '@components/contactUsForm'
import LatestPost from '@components/LatestPost'

const getDatas = async () => {
  const res = await fetch('http://localhost:3000/api/contactus', {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw Error('failed to fetch data')
  }
  return res.json()
}

const ContactUs = async () => {
  const data = await getDatas()
  const contactUsData = data[0] || ''

  return (
    <>
      <div className="gap-5 h-[650px] max-[1200px]:h-auto mt-[80px] text-center text-[#1D3208] items-center  flex flex-col ">
        <h1 className="w-[1020px] max-sm:w-full max-sm:text-[30px] max-[1200px]:px-[5%] max-[1200px]:w-full text-[96px] font-bold text-start ">
          {contactUsData?.title}
        </h1>
        <div
          className="h-auto  w-[48%] max-md:w-[90%] flex flex-col justify-start text-start"
          dangerouslySetInnerHTML={{
            __html: contactUsData?.description
              .replace(
                /<h1/g,
                '<h1 id="targetH1" class="text-[30px] font-bold"'
              )
              .replace(/<p/g, '<p class="text-[19px] leading-26"')
          }}
        ></div>
        <div className="w-[1000px] max-[1200px]:px-[5%] max-[1200px]:w-full text-start mt-14">
          <div className="flex flex-col gap-3 text-[24px] max-sm:text-[15px] max-sm:leading-6">
            <span>{contactUsData?.email}</span>
            <span>{contactUsData?.phoneNumber}</span>
            <span>{contactUsData?.address}</span>
          </div>
        </div>
      </div>
      <div className="main">
        <ContactUsForm />
      </div>
      <LatestPost />
    </>
  )
}

export default ContactUs
