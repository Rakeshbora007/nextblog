'use client'

import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const DynamicBundledEditor = dynamic(
  () => import('@components/BundledEditor'),
  {
    ssr: false
  }
)
const api = process.env.NEXT_PUBLIC_API_URL

const getData = async () => {
  const res = await fetch(`${api}/api/contactus`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw Error('failed to fetch data')
  }
  return res.json()
}

const EditContact = () => {
  const router = useRouter()
  const [textdata, settextdata] = useState(null)
  const editorRef = useRef(null)
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    phoneNumber: '',
    address: ''
  })
  const [contactus, setcontactus] = useState([])
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleContactusData = async () => {
    const data = await getData()
    setcontactus(data)
  }

  useEffect(() => {
    handleContactusData()
  }, [])

  const handleSubmittion = async () => {
    try {
      const getResponse = await fetch(`${api}/api/contactus`)
      const existingContact = await getResponse.json()
      if (existingContact.length > 0) {
        const res = await fetch('/api/contactus', {
          method: 'PUT',
          body: JSON.stringify({
            _id: existingContact[0]._id || contactus[0]?.title,
            title: formData.title || contactus[0]?.title,
            description: textdata || contactus[0]?.description,
            email: formData.email || contactus[0]?.email,
            phoneNumber: formData.phoneNumber || contactus[0]?.phoneNumber,
            address: formData.address || contactus[0]?.address
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (res.ok) {
          router.push('/contactus')
        }
      } else {
        const res = await fetch('/api/contactus', {
          method: 'POST',
          body: JSON.stringify({
            title: formData.title || contactus[0]?.title,
            description: textdata || contactus[0]?.description,
            email: formData.email || contactus[0]?.email,
            phoneNumber: formData.phoneNumber || contactus[0]?.phoneNumber,
            address: formData.address || contactus[0]?.address
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (res.ok) {
          console.log('ok')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className='aboutus flex flex-col min-h-[100vh] w-full items-center gap-5'>
        <h1 className='mt-10 text-[27px] font-semibold'>Contact Us</h1>
        <input
          name="title"
          type="text"

          placeholder='Title'
          className='h-10 border-solid border-2 pl-5 border-gray rounded-lg w-[80%]'
          value={formData.title || contactus[0]?.title}
          onChange={handleChange}
        />
        <div className='flex  justify-between gap-7 w-[100%]'>
          <div className='flex-1 flex justify-center'>
            <div className='w-[80%]'>
              <DynamicBundledEditor
                value={textdata || contactus[0]?.description}
                onEditorChange={(newText) => settextdata(newText)}
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  height: 500,
                  menubar: false,
                  image_advtab: true,
                  automatic_uploads: false,
                  selector: 'textarea',
                  images_upload_url: 'postAcceptor.php',
                  plugins: [
                    'advlist',
                    'anchor',
                    'autolink',
                    'help',
                    'image',
                    'link',
                    'lists',
                    'searchreplace',
                    'table',
                    'wordcount'
                  ],
                  toolbar:
                    'undo redo | accordion accordionremove | alignleft aligncenter  | alignright alignjustify | blocks | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
              />
            </div>
          </div>
        </div>
        <div className='flex w-[80%]'>
          <input
            name="email"
            type="text"

            placeholder='Email'
            className='h-10 border-solid border-2 pl-5 border-gray rounded-lg w-[80%]'
            value={formData.email || contactus[0]?.email}
            onChange={handleChange}
          />
          <input
            name="phoneNumber"
            type="text"
            placeholder='Phone Number'
            className='h-10 border-solid border-2 pl-5 border-gray rounded-lg w-[80%]'
            value={formData.phoneNumber || contactus[0]?.phoneNumber}
            onChange={handleChange}
          />
          <input
            name="address"
            type="text"
            placeholder='Address'
            className='h-10 border-solid border-2 pl-5 border-gray rounded-lg w-[80%]'
            value={formData.address || contactus[0]?.address}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmittion} className='w-[150px] h-10 px-2 bg-[#1D3208] justify-center items-center cursor-pointer flex rounded-lg' >
          <span className='text-[#AFE67F]'>Update Contact Us</span>
        </button>
      </div>
    </>
  )
}

export default EditContact
