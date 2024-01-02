'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignUp = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: {
            firstname: formData.firstname,
            lastname: formData.lastname,
            isAdmin: false
          },
          email: formData.email,
          password: formData.password,
          image: 'http://res.cloudinary.com/dytpruv1e/image/upload/v1702535252/scsrmzjmkj12nxv5wyfs.png'
        })
      })

      if (res.status === 201) {
        router.push('/login')
      } else {
        const data = await res.json()
        setError(data.error)
        throw new Error(data.message || 'Registration failed')
      }
    } catch (error) {

    }
  }

  return (
    <>
      <div className="main2 pt-[88px] h-[100vh]">
        <div className="bg-[#AFE67F] main flex flex-col rounded-md justify-center items-center gap-[56px] max-[950px]:w-[90%] w-[76%]">
          <div className="text-[40px] font-bold mt-7 ">Register</div>
          <div className="flex flex-col max-[950px]:w-full gap-8">
            <div className="flex gap-[16px] ">
              <input
                onChange={handleChange}
                name="firstname"
                className="placeholder:text-[#585858] max-[950px]:w-full placeholder:text-[14px] h-[60px] px-[39px] w-[306px] rounded-md"
                placeholder="First name"
              />
              <input
                name="lastname"
                onChange={handleChange}
                className="placeholder:text-[#585858] max-[950px]:w-full placeholder:text-[14px] h-[60px]  px-[39px] w-[306px]  rounded-md"
                placeholder="Last name"
              />
            </div>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              className=" placeholder:text-[#585858] max-[950px]:w-full placeholder:text-[14px] h-[60px] w-[628px] px-[39px] rounded-md"
              placeholder="Email address"
            ></input>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              className="placeholder:text-[#585858] max-[950px]:w-full placeholder:text-[14px] h-[60px] w-[628px] px-[39px] rounded-md"
              placeholder="Password"
            ></input>
            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                className=" h-[26px] w-[26px] rounded-md border-none "
              ></input>
              <span className="text-[14px]">
                Stay updated with our latest news and trends, No spams..!
              </span>
            </div>
            <div>
              <h1 className=" text-red-500">{`${error} !`}</h1>

            </div>
            <div className="flex gap-3 items-center justify-center my-[90px]">
              <button
                onClick={handleSubmit}
                className="bg-[#1D3208] w-[186px] h-[58px] rounded-md text-[#AFE67F]"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
