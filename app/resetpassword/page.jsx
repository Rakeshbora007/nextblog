'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [resetMessage, setResetMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/api/resetpassword', {
        method: 'POST',
        body: JSON.stringify({
          email
        })
      })
      if (res.ok) {
        setResetMessage({
          text: <span className="text-[green]">Password reset instructions sent. Please check your email.</span>,
          type: 'success'
        })
      } else {
        setResetMessage({
          text: <span className="text-[red]">Email not found ,Register Please</span>,
          type: 'error'
        })
      }
    } catch (error) {
      setResetMessage({
        text: <span className="text-[red]">Email not found ,Register Please</span>,
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
        <div className="main2 h-[100vh] pt-10">
            <div className="bg-[#AFE67F] min-h-[50vh] main flex flex-col rounded-md justify-center items-center gap-[56px] w-[76%]">
                <div className="w-full justify-center flex flex-col gap-4 items-center">
                    <div className="text-[40px] font-bold mt-7">Reset Password</div>
                    <span className="font-bold">
                        We’ll email you instructions on how to reset your password
                    </span>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col max-[950px]:w-full  gap-8"
                >
                    <input
                        id="username"
                        name="username"
                        onChange={(e) => setEmail(e.target.value)}
                        className={`placeholder:text-[#585858] placeholder:text-[14px] max-[950px]:w-full  h-[60px] w-[628px]  px-[39px] rounded-md : ""
                        }`}
                        placeholder="Email address"
                    ></input>
                    <div className="flex gap-3 items-center">
                        <button
                            className={`w-[200px] justify-center flex items-center rounded-lg h-[50px] bg-[#1D3208]
                               text-[#AFE67F]`}
                            disabled={loading}
                        >
                            {loading
                              ? (
                                <div className="w-8 h-8 border-t-2 border-[#AFE67F] border-solid rounded-full animate-spin"></div>
                                )
                              : (
                                  'Submit'
                                )}
                        </button>
                        or
                        <Link href="/login">Return to Login</Link>
                    </div>
                </form>
                {resetMessage.text && (
                    <div>
                        {resetMessage.text}
                    </div>
                )}
            </div>
        </div>
  )
}
export default ResetPassword
