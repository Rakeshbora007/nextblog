'use client'
import React, { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const session = useSession()
  const router = useRouter()
  const [errors, setErrors] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const email = formData.username
    const password = formData.password
    signIn('credentials', { email, password, redirect: false }).then(
      ({ ok, error }) => {
        if (ok) {
          router.push('/')
        } else {
          setErrors(error.split(':')[1])
        }
      }
    )
    if (session.status === 'authenticated') {
      router.push('/')
    } else {
      router.push('/login')
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <div className="main2 h-[100vh] pt-10">
      <div className="bg-[#AFE67F] main flex flex-col rounded-md justify-center items-center gap-[56px] w-[76%]">
        <div className="text-[40px] font-bold mt-7">Log In</div>
        <div className="flex flex-col max-[950px]:w-full  gap-8">
          <input
            id="username"
            name="username"
            onChange={handleInputChange}
            className={`placeholder:text-[#585858] placeholder:text-[14px] max-[950px]:w-full  h-[60px] w-[628px]  px-[39px] rounded-md ${
              errors ? 'border-red-500 border' : ''
            }`}
            placeholder="Email address"
          ></input>
          {errors.username && (
            <span className="text-red-500">{errors.username}</span>
          )}
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleInputChange}
            className={`placeholder:text-[#585858] max-[950px]:w-full placeholder:text-[14px] h-[60px] w-[628px] px-[39px] rounded-md ${
              errors ? 'border-red-500 border' : ''
            }`}
          ></input>
          {errors && <span className="text-red-500">{errors}</span>}
          <div className="flex gap-3 items-center">
            <Link href="/resetpassword" className="text-[14px] underline">Forgot your password</Link>
            or
            <Link href="/signup">Register</Link>
          </div>
          <div className="flex gap-3 items-center justify-center my-[90px]">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#1D3208] w-[186px] h-[58px] rounded-md text-[#AFE67F]"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
