'use client'
import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const DynamicBundledEditor = dynamic(
  () => import('@components/BundledEditor'),
  {
    ssr: false
  }
)

const BlogsWritter = () => {
  const [file, setfile] = useState(null)
  const [media, setmedia] = useState(null)
  const [textdata, settextdata] = useState(null)
  const editorRef = useRef(null)
  const [data, setdata] = useState({
    title: '',
    category: '',
    content: '',
    desc: '',
    username: ''
  })

  const router = useRouter()
  const handleUpload = () => {
    if (media !== null) {
      setmedia(null)
    }
  }

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

  const session = useSession()

  const handleSubmit = async () => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: data.title,
        category: data.category,
        image: media,
        content: textdata,
        desc: data.desc,
        username: `${session.data.user.name?.firstname + session.data.user.name?.lastname}`,
        userID: session?.data.id
      })
    })
    if (res.ok) {
      router.push(`/authorDetails/${session.data?.id}`)
      router.refresh()
    }
  }

  if (session.status === 'unauthenticated') {
    return <><div className="w-full h-screen bg-[#1D3208] flex justify-center items-center">
      <Link href="/login" className="h-[70px] cursor-pointer px-5 bg-[#AFE67F] text-[24px] font-bold flex justify-center  items-center rounded-lg ">Login to Create Blog</Link>
    </div></>
  }
  return (
    <div className="w-full justify-center  gap-2 main2 pt-[100px] pb-[219px] ">
      <div className="bg-[#AFE67F]  w-[90%] main justify-center  max-sm:h-auto h-[1290px] rounded-lg gap-10 ">
        <h1 className="text-[40px] max-sm:text-[24px] font-bold mt-14 text-center">
          Write a Blog
        </h1>
        <div className="flex justify-center  rounded-lg gap-10  max-sm:gap-2">
          <div className="mb-4 max-sm:w-full flex flex-col  w-[1024px] gap-6 max-sm:gap-[10px]  max-sm:mt-[40px] mt-[100px]">
            <label
              htmlFor="example-input"
              className="hidden text-gray-700 text-md font-bold mb-2 justify-center h-10 items-center "
            ></label>
            <input
              id="example-input"
              name="title"
              className=" w-full h-[60px] max-sm:h-[35px] p-2 pl-[33px] border border-gray-300 rounded-md focus:outline-none "
              type="text"
              placeholder="Title"
              onChange={(e) => setdata({ ...data, title: e.target.value })}
            />
            <label
              htmlFor="example-input2"
              className="hidden text-gray-700 text-md font-bold mb-2 justify-center h-10 items-center "
            ></label>
            <input
              onChange={(e) => setdata({ ...data, category: e.target.value })}
              id="example-input2"
              className="w-full h-[60px] max-sm:h-[35px] p-2 pl-[33px] border border-gray-300 rounded-md focus:outline-none "
              type="text"
              placeholder="Category"
              name="category"
            />

            <label
              htmlFor="example-input"
              className="hidden text-gray-700 text-md font-bold mb-2 justify-center h-10 items-center "
            ></label>
            <input
              id="example-input"
              name="desc"
              className="w-full h-[60px] max-sm:h-[35px] p-2 pl-[33px] border border-gray-300 rounded-md focus:outline-none "
              type="text"
              placeholder="Description"
              onChange={(e) => setdata({ ...data, desc: e.target.value })}
            />

            <label
              htmlFor="example-input3"
              className="hidden text-gray-700 text-md font-bold mb-2 justify-center h-10 items-center "
            ></label>

            <div className="h-[100vh]  flex flex-col gap-7 max-sm:hidden">
              <DynamicBundledEditor
                onEditorChange={(newText) => settextdata(newText)}
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  br_in_pre: false,
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
                    'undo redo | accordion accordionremove | blocks | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
              />
              <div>
                <button
                  onClick={handleSubmit}
                  className=" bg-[#1D3208] text-[#AFE67F] h-[49px] px-4 w-[190px] rounded-lg shadow-xl"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center h-[352px] w-[290px]  max-sm:w-[112px] max-sm:h-[132px] rounded-lg items-center bg-fuchsia-50  max-sm:mt-[40px]  mt-[100px]">
            <label className="cursor-pointer">
              {media !== null
                ? (
                <div
                  onClick={handleUpload}
                  className="relative h-[352px] w-[290px] max-sm:w-[112px] max-sm:h-[132px] flex"
                >
                  {media === undefined
                    ? (
                    <span
                      id="image"
                      className="flex items-center justify-center max-sm:h-[132px] max-sm:w-[112px] text-gray-300 h-[352px] w-[290px] bg-gray border border-gray-300 rounded-md px-4 py-2 shadow-md"
                    >
                      {file === null
                        ? (
                        <>Upload Featured Image</>
                          )
                        : (
                        <div class="w-16 h-16 border-t-4 max-sm:h-[132px] max-sm:w-[112px] border-blue-500 border-solid rounded-full animate-spin"></div>
                          )}
                    </span>
                      )
                    : (
                    <Image
                      priority={true}
                      sizes=""
                      src={media}
                      alt=""
                      fill
                      className="rounded-md shadow-md"
                    />
                      )}
                </div>
                  )
                : (
                <>
                  <span
                    id="image"
                    className="flex items-center justify-center max-sm:h-[132px] max-sm:w-[112px] text-gray-300 h-[352px] w-[290px] bg-gray border border-gray-300 rounded-md px-4 py-2 shadow-md"
                  >
                    {file === null
                      ? (
                      <>Upload Featured Image</>
                        )
                      : (
                      <div class="w-16 h-16 border-t-4 max-sm:h-[132px] max-sm:w-[112px] border-blue-500 border-solid rounded-full animate-spin"></div>
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
        </div>
        <div className="h-[100vh] max-sm:flex flex-col gap-7 sm:hidden">
          <DynamicBundledEditor
            onEditorChange={(newText) => settextdata(newText)}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              br_in_pre: false,
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
                'undo redo | accordion accordionremove | blocks | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
          <div>
            <button
              onClick={handleSubmit}
              className=" bg-[#1D3208] text-[#AFE67F] h-[49px] px-4 w-[190px] rounded-lg shadow-xl"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogsWritter
