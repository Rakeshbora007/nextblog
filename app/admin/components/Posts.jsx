import Title from '@components/common/Title'
import Image from 'next/image'
import Checkbox from './common/Checkbox'

const Posts = ({ title, postdata, check, categories }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-20">
      <div className="flex w-full flex-col justify-center gap-10">
        <div className="text-center gap-10 flex flex-col">
          <Title heading={title} />
        </div>
        <div className="flex flex-wrap gap-4">
          {postdata?.map((e) => (
            <div key={e._id} className="flex flex-col w-full lg:w-1/2 xl:w-1/3">
              <div className="flex gap-5 items-center">
                <Checkbox postId={e._id} posts={e} checkfor={check} />
                <div className="h-20 w-20 relative bg-black rounded-lg">
                  <Image alt="" src={e.image} fill className="rounded-lg" />
                </div>
                <div className="w-full lg:w-[250px] flex flex-col gap-1 text-start">
                  {categories ? <span className="font-bold">{e.category}</span> : <span className="font-bold">{e.title.substring(0, 24)}</span>}
                  {categories
                    ? ''
                    : <>
                    <span>Category : {e.category}</span>
                    <div className="gap-3 flex max-md:hidden">
                      <span>Likes:10k </span>
                      <span>Comments:5k</span>
                      <span>View:20k</span>
                    </div>
                  </>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Posts
