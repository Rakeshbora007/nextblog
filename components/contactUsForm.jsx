'use client'
import React, { useState } from 'react'

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    useremail: '',
    message: ''
  })

  const [status, setStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleButtonClick = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contactform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          useremail: formData.useremail,
          message: formData.message
        })
      })
      if (response.ok) {
        setStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          useremail: '',
          message: ''
        })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Error sending useremail:', error)
      setStatus('error')
    }
  }

  return (
        <div>
            <div className="w-full h-[1019px] max-[1200px]:mt-10 mb-20 bg-[#AFE67F] rounded-2xl">
                <div className="flex flex-col rounded-md items-center gap-[56px] w-full">
                    <div className="text-[40px] max-sm:text-[20px] font-bold mt-7">Contact Us</div>
                    <form className="flex flex-col max-[1200px]:w-full max-[1200px]:px-[3%] gap-8">
                        <div className="flex gap-[16px]">
                            <input
                                name="firstName"
                                className="placeholder:text-[#585858] placeholder:text-[14px] h-[60px] px-[39px] w-[525px] max-[1200px]:w-full rounded-md"
                                placeholder="First name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                            <input
                                name="lastName"
                                className="placeholder:text-[#585858] placeholder:text-[14px] h-[60px]  px-[39px] w-[525px] max-[1200px]:w-full  rounded-md"
                                placeholder="Last name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <input
                            name="phone"
                            className="placeholder:text-[#585858] placeholder:text-[14px] h-[60px] w-[1074px] px-[39px] max-[1200px]:w-full rounded-md"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        <input
                            name="useremail"
                            className="placeholder:text-[#585858] placeholder:text-[14px] h-[60px] w-[1074px] px-[39px] max-[1200px]:w-full rounded-md"
                            placeholder="useremail"
                            value={formData.useremail}
                            onChange={handleInputChange}
                        />
                        <input
                            name="message"
                            className="placeholder:text-[#585858] placeholder:text-[14px] h-[325px] w-[1074px] px-[39px] max-[1200px]:w-full rounded-md"
                            placeholder="Write Message..."
                            value={formData.message}
                            onChange={handleInputChange}
                        />
                        <div className="flex gap-3 items-center my-[20px] w-full justify-start">

                            <button
                                type="submit"
                                className="bg-[#1D3208] w-[186px] h-[58px] rounded-md text-[#AFE67F]"
                                onClick={handleButtonClick}
                            >
                                Submit
                            </button>
                        </div>

                        {status === 'success' && <div className="text-green-500 text-[20px] font-bold">Email sent successfully !</div>}
                        {status === 'error' && <div className="text-red-500">Failed to send email !</div>}
                    </form>
                </div>
            </div>
        </div>
  )
}

export default ContactUsForm
