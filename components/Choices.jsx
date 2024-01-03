import PickerCard from './common/PickerCard'
import CommonCard from './common/commonCard'
// import Card2 from './common/Card2'

const getData = async () => {
  const res = await fetch('http://localhost:3000/api/posts?cat=', {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error('failed to fetch data')
  }
  return res.json()
}

const Choices = async () => {
  const { posts } = await getData()
  const categories = posts?.filter((post) => post.categoriesCheck)
  const health = posts?.filter((post) => post.healthCheck)
  // const spotlight = posts?.filter((post) => post.spotliteCheck)
  const top = posts.sort((a, b) => b.count - a.count).slice(0, 4)
  const filteredPosts = posts.filter((post) => post.editorPick)
  return (
    <div className="main flex flex-col gap-[50px]  mb-24">
      <PickerCard posts={filteredPosts} title={true} image={true} allposts={false} styles='w-[302px] h-[223px]' fonttext={'text-[24px]'} categorytext='text-[20px]'/>
      <div className="main w-full   max-sm:gap-[100px] gap-[200px] flex flex-col">
        <CommonCard
          array={categories}
          title="Explore By"
          width="w-[335px] "
          height="h-[215px]"
          bold="font-semibold"
          hovercolor="bg-black"
          Links="category"
          button={true}
          buttonLink={'blogmain?cat=categories'}
          show={true}
        />
        <CommonCard
          array={top}
          title="More Top Reads"
          description="Vitality Unleashed: The Crucial Role of Quality Sleep"
          width="w-[420px] "
          height="h-[237px]"
          bold="font-bold"
          hovercolor="bg-white"
          button="show"
          buttonLink={'blogmain?cat='}
          category="health"
          show={true}
        />
        {health.length === 0
          ? ' '
          : <CommonCard
            array={health}
            category={'health'}
            title="Health Conditions"
            description="Nutrition"
            width="w-[335px] "
            height="h-[215px]"
            bold="font-semibold"
            hovercolor="bg-black"
            button="show"
            buttonLink={'blogmain?cat=Health'}
            show={true}
          />
        }

        {/* <Card2 array={spotlight} /> */}
      </div>
    </div>
  )
}

export default Choices
