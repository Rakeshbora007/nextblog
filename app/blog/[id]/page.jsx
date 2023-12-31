import Image from 'next/image'
import LatestPost from '@components/LatestPost'
import BlogContent from '@components/BlogContent'
import Comments from '@components/Comments'
import Follow from '@components/Follow'
import Liker from '@components/Liker'
import Save from '@components/Save'
import BlogUserDetails from '@components/BlogUserDetails'
import UserSocialMedia from '@components/UserSocialMedia'

const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const getData = async (id) => {
  const res = await fetch(`${api}/api/posts/${id}`, {
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
        <div className="w-[100%] max-md:w-[100%] max-md:px-2 flex flex-col max-md:gap-7 gap-10">
          <h1 className="max-md:mt-[50px] xl:text-[84px]  xl:leading-[84px] font-bold max-md:text-[16px] max-md:text-center">
            {data.title}
          </h1>
          <p className="xl:text-[23px] max-md:text-[16px] xl:leading-[34px] xl:w-[70%]">
            {data.desc}
          </p>
          <div className="flex  items-center gap-1">
            <BlogUserDetails dataID={data?.userID} />
          </div>
        </div>
        <div className="w-full xl:mt-[3pc] max-md:px-2 h-[670px] max-md:h-[300px] relative bg-slate-500  max-md:mt-[2rem] rounded-2xl mb-[130px] max-md:mb-[2rem]">
          <Image alt="" className="rounded-xl object-cover" src={data.image} fill sizes="(min-width: 1900px) 1760px, calc(94.94vw - 25px)" />
        </div>
        <BlogContent content={data?.content} />
        <div className="flex max-md:px-2">
          <div className="flex w-[560px] max-sm:w-[0px] "></div>
          <div className="flex flex-1 mt-20  max-sm:mt-5 items-center">
            <div className="flex justify-start">
              <div className="text-2xl font-bold">
                <div className="flex gap-[20px] max-sm:gap-[0px] h-[40px] justify-center items-center rounded-full">
                  <div>
                    <Liker id={params.id} />
                  </div>
                  <UserSocialMedia dataId={data?.userID} />
                  <Save posts={data} postsId={data?._id} />
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
