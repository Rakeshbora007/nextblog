import React from 'react'
import Featured from '@components/Featured'
import Choices from '@components/Choices'
import Join from '@components/Join'

const Home = ({ searchParams }) => {
  const { cat } = searchParams
  return (
    <section >
      <Featured />
      <Choices Categories={cat || ''} />
      <Join />
    </section>
  )
}

export default Home
