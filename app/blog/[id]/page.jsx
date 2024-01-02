import Image from 'next/image'
import LatestPost from '@components/LatestPost'
import BlogContent from '@components/BlogContent'
import Comments from '@components/Comments'
import Follow from '@components/Follow'
import Liker from '@components/Liker'
import Save from '@components/Save'
import SocailIcons from '@components/SocailIcons'
import BlogUserDetails from '@components/BlogUserDetails'

const getData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error('failed to fetch data')
  }
  return res.json()
}

const Blogs = async ({ params }) => {
  const data = await getData(params.id)
  return (
    <>
      <div className="main">
        <div className="w-[80%] max-md:w-[100%] max-md:px-2 flex flex-col max-md:gap-7 gap-10">
          <h1 className="max-md:mt-[50px] xl:text-[84px]  xl:leading-[84px] font-bold max-md:text-[28px] max-md:text-center">
            {data.title}
          </h1>
          <p className="xl:text-[23px] xl:leading-[34px] xl:w-[70%]">
            {data.desc}
          </p>
          <div className="flex  items-center gap-1">
            <BlogUserDetails dataID={data?.userID} />
          </div>
        </div>
        <div className="w-full xl:mt-[3pc] max-md:px-2 h-[670px] max-md:h-[300px] relative bg-slate-500  max-md:mt-[2rem] rounded-2xl mb-[130px] max-md:mb-[2rem]">
          <Image alt="" className="rounded-xl object-cover" src={data.image} fill sizes="(min-width: 1900px) 1760px, 93.29vw" />
        </div>
        <BlogContent content={data?.content} />
        <div className="flex max-md:px-2">
          <div className="flex w-[560px] "></div>
          <div className="flex flex-1 mt-20 items-center">
            <div className="flex justify-start">
              <div className="text-2xl font-bold">
                <div className="flex gap-[20px] h-[40px] justify-center items-center rounded-full">
                  <span className="border-[2px] border-black px-[8px] rounded-full  w-[40px] h-[40px] flex justify-center  items-center">
                    <Liker id={params.id} />
                  </span>
                  <SocailIcons border='border-[2px] border-black px-2 rounded-full  w-[40px] h-[40px] flex justify-center  items-center' />
                  <span className=" border-[2px] border-black px-3 rounded-full  w-[40px] h-[40px] flex justify-center  items-center">
                    <div className="relative w-[20px] h-[20px]">
                      <Save posts={data} postsId={data?._id} />
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Follow dataID={data?.userID} />
            </div>
          </div>
        </div>
        <div className="flex justify-end max-md:px-2">
          <Comments id={params.id} placeholder={'write a comment'} />
        </div>
        <div className="mt-10">
          <LatestPost />
        </div>
      </div>
    </>
  )
}

export default Blogs
