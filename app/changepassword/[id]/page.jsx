'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreatePassword = ({ params }) => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, seterrors] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      seterrors('password is not same')
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          resetPasswordToken: params.id,
          newPassword: password
        })
      })
      if (res.status === 200) {
        router.push('/login')
      }
    } catch (error) {
    }
  }

  return (
    <div className='main'>
      <div className="h-[100vh] pt-10">
        <div className="bg-[#AFE67F] main flex flex-col rounded-md justify-center items-center gap-[56px] w-[76%]">
          <div className="text-[40px] font-bold mt-7">Create Password</div>
          <form onSubmit={handleSubmit} className="flex flex-col max-[950px]:w-full  gap-8">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={'placeholder:text-[#585858] placeholder:text-[14px] max-[950px]:w-full h-[60px] w-[628px] px-[39px] rounded-md'}
              placeholder="New Password"
            />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={'placeholder:text-[#585858] placeholder:text-[14px] max-[950px]:w-full h-[60px] w-[628px] px-[39px] rounded-md'}
              placeholder="Confirm Password"
            />
            <div className="flex gap-3 items-center justify-center my-[90px]">
              <button
                type="submit"
                className="bg-[#1D3208] w-[186px] h-[58px] rounded-md text-[#AFE67F]"
              >
                Create Password
              </button>
            </div>
            {errors}
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePassword
