'use client'
import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const DynamicBundledEditor = dynamic(
  () => import('@components/BundledEditor'),
  {
    ssr: false
  }
)
const api = process.env.NEXT_PUBLIC_API_URL

const getData2 = async () => {
  const res = await fetch(`${api}/api/aboutus`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw Error('failed to fetch data')
  }
  return res.json()
}

const getDatas = async () => {
  const res = await fetch(`${api}/api/content`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw Error('failed to fetch data')
  }
  return res.json()
}

const EditAbout = () => {
  const [file, setfile] = useState(null)
  const [media, setmedia] = useState(null)
  const [textdata, settextdata] = useState(null)
  const [textdata2, settextdata2] = useState(null)

  const editorRef = useRef(null)
  const [team, setteam] = useState([])
  const [All, setAll] = useState([])
  const [data, setdata] = useState({
    desc: '',
    name: '',
    profession: ''
  })
  const [description, setDescription] = useState({
    description: '',
    description1: ''
  })
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDatas()
        setAll(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
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
  const handleTeam = async () => {
    const data = await getData2()
    setteam(data)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = async () => {
    const res = await fetch('/api/aboutus', {
      method: 'POST',
      body: JSON.stringify({
        image: media,
        name: data.name,
        profession: data.profession
      })
    })
    if (res.ok) {
      console.log('ok')
    }
  }

  const handleDescription = async () => {
    const url = '/api/content'
    const method = All.length > 0 ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      body: JSON.stringify({
        postId: All[0]?._id,
        description: description.description || All[0]?.description,
        description1: description.description1 || All[0]?.description1,
        content: textdata || All[0]?.content,
        content1: textdata2 || All[0]?.content1,
        about: team
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      router.push('/aboutus')
      router.refresh()
    }
  }

  useEffect(() => {
    handleTeam()
  }, [handleSubmit])

  const handleDelete = async (postId) => {
    try {
      const res = await fetch('/api/aboutus', {
        method: 'DELETE',
        body: JSON.stringify({
          postId
        })
      })
      if (res.ok) {
        const updatedTeam = await getData2()
        setteam(updatedTeam)
      } else {
        console.error('Failed to delete team member')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleTeamChange = async (e, checkboxType) => {
    try {
      const res = await fetch('/api/aboutus', {
        method: 'POST',
        body: JSON.stringify({
          postId: e._id,
          [checkboxType]: !e[checkboxType]
        })
      })
      if (res.ok) {
        if (checkboxType === 'author' && !e.author) {
          const updatedTeam = await getData2()
          setteam(updatedTeam)
        }
        if (checkboxType === 'main' && !e.main) {
          const updatedTeam = await getData2()
          setteam(updatedTeam)
        }
      } else {
        console.error('Failed to update team member')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <div className='aboutus flex flex-col min-h-[100vh] w-full items-center gap-5'>
        <h1 className='mt-10 text-[27px] font-semibold'>AboutUs</h1>
        <input name="description" value={description.description ? description.description : All[0]?.description} type="text" placeholder='Description' onChange={(e) => setDescription({ ...description, description: e.target.value })} className='h-10 border-solid border-2 pl-5 border-gray rounded-lg w-[80%]' />
        <div className='flex  justify-between gap-7 w-[100%]'>
          <div className='flex-1 flex justify-center'>
            <div className='w-[80%]'>
              <DynamicBundledEditor
                value={textdata || All[0]?.content}
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
        <h1 className='mt-10 text-[27px] font-semibold'>Add Team Members</h1>
        <div className='w-[80%] flex gap-10 justify-center items-center'>
          <div className='w-[100px] h-[100px] border-solid border-5  justify-center text-center rounded-lg items-center flex'>
            <label className="cursor-pointer">
              {media !== null
                ? (
                <div
                  onClick={handleUpload}
                  className="relative w-[100px] h-[100px] rounded-lg   max-sm:w-[112px] max-sm:h-[132px] flex"
                >
                  {media === undefined
                    ? (
                    <span
                      id="image"
                      className="flex items-center justify-center max-sm:h-[132px]  max-sm:w-[112px] text-gray-300 w-[100px] rounded-lg h-[100px] bg-gray border border-gray-300  px-4 py-2 shadow-md"
                    >
                      {file === null
                        ? (
                        <>Upload Featured Image</>
                          )
                        : (
                        <div class="w-16 h-16 border-t-4 max-sm:h-[132px] max-sm:w-[112px] border-blue-500 border-solid rounded-lg animate-spin"></div>
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
                      className="rounded-lg shadow-md"
                    />
                      )}
                </div>
                  )
                : (
                <>
                  <span
                    id="image"
                    className="flex items-center justify-center max-sm:h-[132px] max-sm:w-[112px] text-gray-300 w-[100px] rounded-full h-[100px] bg-gray border border-gray-300  px-4 py-2 shadow-md"
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
          <div className='flex flex-1 flex-col w-full gap-5'>
            <input type="text" name="name" onChange={(e) => setdata({ ...data, name: e.target.value })} placeholder='Name' className='h-10 border-solid border-2 pl-5 border-black rounded-lg w-[100%]' />
            <input type="text" name="profession" onChange={(e) => setdata({ ...data, profession: e.target.value })} placeholder='Profession' className='h-10 border-solid border-2 pl-5 border-black rounded-lg w-[100%]' />
          </div>
        </div>
        <div className='w-32 h-10 bg-[#1D3208] justify-center items-center cursor-pointer flex rounded-lg' onClick={handleSubmit}>
          <span className='text-[#AFE67F]'>Create Team</span>
        </div>
        <div className="m-4 w-[60%]">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Image</th>
                <th className="p-2">Profession</th>
                <th className="p-2">Main</th>
                <th className="p-2">Author</th>
                <th className="p-2">Team</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {team?.map((E, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="p-2 text-center">{E.name}</td>
                  <td className="p-2 flex justify-center">
                    <span className="relative w-12 h-12">
                      <Image fill src={E.image} alt={E.name} className=" rounded-full" />
                    </span>
                  </td>
                  <td className="p-2 text-center">{E.profession}</td>
                  <td className="p-2 text-center "><input
                    type="checkbox"
                    id="main"
                    checked={E.main}
                    onChange={() => handleTeamChange(E, 'main')}
                    className="h-5 w-5 cursor-pointer form-checkbox"
                  /></td>
                  <td className="p-2 text-center "><input
                    type="checkbox"
                    id="author"
                    checked={E.author}
                    onChange={() => handleTeamChange(E, 'author')}
                    className="h-5 w-5 cursor-pointer form-checkbox"
                  /></td>
                  <td className="p-2 text-center "><input
                    type="checkbox"
                    id="teams"
                    checked={E.teams}
                    onChange={() => handleTeamChange(E, 'teams')}
                    className="h-5 w-5 cursor-pointer form-checkbox"
                  /></td>
                  <td className="p-2 text-center">
                    <button onClick={() => handleDelete(E._id)} className=' bg-red-500 hover:bg-red-600 text-white cursor-pointer p-2 rounded-2xl' >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h1 className='mt-10 text-[27px] font-semibold'>Our Blog</h1>
        <div className='flex  gap-7 w-[100%] '>
          <div className='flex flex-col w-full gap-5 justify-center items-center'>
            <input name="description1" type="text" placeholder='Description' value={description.description1 ? description.description1 : All[0]?.description1} onChange={(e) => setDescription({ ...description, description1: e.target.value })} className='h-10 border-solid border-2 pl-5 border-gray rounded-lg w-[80%]' />
            <div className='w-[80%] h-auto'>
              <DynamicBundledEditor
                value={textdata2 || All[0]?.content1}
                onEditorChange={(newText) => settextdata2(newText)}
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  autoresize: true,
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
        <button onClick={handleDescription} className='w-[150px] h-10 px-2 bg-[#1D3208] justify-center items-center cursor-pointer flex rounded-lg' >
          <span className='text-[#AFE67F]'>Update About us</span>
        </button>
      </div>
    </>
  )
}

export default EditAbout
