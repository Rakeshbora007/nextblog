import React from 'react'
import Featured from '@components/Featured'
import Choices from '@components/Choices'
// import Join from '@components/Join'

const Home = ({ searchParams }) => {
  const { cat } = searchParams
  return (
    <section >
      <div className="mt-[40px] max-sm:mt-[50px] main">
        <Featured />
      </div>
      <Choices Categories={cat || ''} />
      {/* <Join /> */}
    </section>
  )
}

export default Home
