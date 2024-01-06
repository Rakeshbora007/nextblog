'use client'
import React, { useEffect, useState } from 'react'
import profile from '../../images/profile.png'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const Settings = () => {
  const router = useRouter()
  const session = useSession()
  const [file, setfile] = useState(null)
  const [media, setmedia] = useState(null)
  const [formData, setformData] = useState({
    firstname: '',
    lastname: '',
    description: '',
    linkdin: '',
    instagram: '',
    twitter: '',
    facebook: ''
  })
  useEffect(() => {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'phzdvggz')
    data.append('cloud_name', 'dytpruv1e')
    fetch('https://api.cloudinary.com/v1_1/dytpruv1e/image/upload', {
      method: 'POST',
      body: data
    })
      .then((res) => res.json())
      .then((data) => setmedia(data.url))
      .catch((err) => console.log(err))
  }, [file])
  const handleUpload = () => {
    if (media !== null) {
      setmedia(null)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setformData({
      ...formData,
      [name]: value
    })
  }
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, mutate } = useSWR(
        `${api}/api/user/${session?.data?.id}`, fetcher
  )
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/register', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: session.data?.id,
          name: {
            firstname: formData.firstname || data?.name.firstname,
            lastname: formData.lastname || data?.name.lastname,
            isAdmin: false
          },
          description: formData.description,
          image: media === null ? data?.user.image : media,
          socialLinks: {
            linkdin: formData.linkdin || data?.socialLinks.linkdin,
            facebook: formData.facebook || data?.socialLinks.facebook,
            twitter: formData.twitter || data?.socialLinks.twitter,
            instagram: formData.instagram || data?.socialLinks.instagram
          }
        })
      })
      if (res.status === 200) {
        router.push(`authorDetails/${session?.data?.id}`)
        router.refresh()
      } else {
        await res.json()
      }
    } catch (error) {
    }
    mutate()
  }

  return (
        <div className='main2 w-full  h-auto'>
            <div className='main  h-auto'>
                <div className='flex justify-center items-center'>
                    <div className='w-full h-auto py-10 bg-[#AFE67F] flex flex-col rounded-lg gap-11'>
                        <h1 className='text-center text-[30px] font-semibold mt-1'>Create Profile</h1>
                        <form onSubmit={handleSubmit} className=' flex flex-col justify-center items-center gap-6'>
                            <div className='w-[170px] h-[170px] border-solid border-5  justify-center text-center rounded-full items-center flex'>
                                <label className="cursor-pointer">
                                    {media !== null
                                      ? (
                                        <div
                                            onClick={handleUpload}
                                            className="relative w-[170px] h-[170px] rounded-full  max-sm:w-[112px] max-sm:h-[132px] flex"
                                        >
                                            {media === undefined
                                              ? (
                                                <span
                                                    id="image"
                                                    className="flex items-center justify-center max-sm:h-[132px]  max-sm:w-[112px] text-gray-300 w-[170px] rounded-full h-[170px] bg-gray border border-gray-300  px-4 py-2 shadow-md"
                                                >
                                                    {file === null
                                                      ? (
                                                        <>
                                                            <Image
                                                                alt='imageupload'
                                                                src={data?.image ? data?.image : profile} fill className='rounded-full' />
                                                        </>
                                                        )
                                                      : (
                                                        <div className="w-16 h-16 border-t-4 max-sm:h-[132px] max-sm:w-[112px] border-blue-500 border-solid rounded-full animate-spin"></div>
                                                        )}
                                                </span>
                                                )
                                              : (
                                                <Image
                                                    alt='imageupload'
                                                    priority={true}
                                                    sizes=""
                                                    src={media}
                                                    fill
                                                    className="rounded-full shadow-md"
                                                />
                                                )}
                                        </div>
                                        )
                                      : (
                                        <>
                                            <span
                                                id="image"
                                                className="flex items-center justify-center max-sm:h-[132px] max-sm:w-[112px] text-gray-300 w-[170px] rounded-full h-[170px] bg-gray border border-gray-300  px-4 py-2 shadow-md"
                                            >
                                                {file === null
                                                  ? (
                                                    <>
                                                        <div className='w-[170px] h-[170px] relative'>
                                                            <Image alt='image' src={data?.image ? data?.image : profile} fill className='rounded-full' />
                                                        </div>
                                                    </>
                                                    )
                                                  : (
                                                    <div className="w-16 h-16 border-t-4 max-sm:h-[132px] max-sm:w-[112px] border-blue-500 border-solid rounded-full animate-spin"></div>
                                                    )}
                                            </span>
                                        </>
                                        )}

                                    <div className="hidden">
                                        <input
                                            type="file"
                                            id="image"
                                            onChange={(e) => setfile(e.target.files[0])}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className='w-[50%] max-sm:w-[90%] flex gap-6'>
                                <input value={formData.firstname ? formData.firstname : data?.name.firstname} name='firstname' onChange={handleChange} className='capitalize w-[50%] pl-3 max-sm:w-[90%] h-[50px] rounded-lg' placeholder='First Name' />
                                <input value={formData.lastname ? formData.lastname : data?.name.lastname} name='lastname' onChange={handleChange} className='capitalize w-[50%] pl-3 max-sm:w-[90%] h-[50px] rounded-lg' placeholder='Last Name' />
                            </div>
                            <textarea name='description' value={formData.description ? formData.description : data?.description} className='w-[50%] max-sm:w-[90%] pl-3 pt-3 h-[150px] rounded-lg' placeholder='Description' onChange={handleChange} />
                            <h1 className='text-center text-[18px] font-semibold mt-4'>Social Links</h1>
                            <input className='w-[50%] pl-3 h-[50px] max-sm:w-[90%] rounded-lg' value={formData.linkdin ? formData.linkdin : data?.socialLinks?.linkdin} onChange={handleChange} name='linkdin' placeholder='linkdin' />
                            <input className='w-[50%] pl-3 h-[50px] max-sm:w-[90%] rounded-lg' value={formData.instagram ? formData.instagram : data?.socialLinks?.instagram} onChange={handleChange} name='instagram' placeholder='instagram' />
                            <input className='w-[50%] pl-3 h-[50px] max-sm:w-[90%] rounded-lg' value={formData.twitter ? formData.twitter : data?.socialLinks?.twitter} onChange={handleChange} name='twitter' placeholder='twitter' />
                            <input className='w-[50%] pl-3 h-[50px] max-sm:w-[90%] rounded-lg' value={formData.facebook ? formData.facebook : data?.socialLinks?.facebook} onChange={handleChange} name='facebook' placeholder='facebook' />
                            <div className='w-full h-10 justify-center flex items-center' >
                                <button type='submit' className='bg-[#1D3208] w-[170px] h-[40px] text-[#AFE67F] rounded-lg'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Settings
