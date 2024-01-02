import React from 'react'
import FeaturedEdit from './components/FeaturedEdit'
import ExploreBy from './components/ExploreBy'
import EditorPick from './components/EditorPick'
import SpotLight from './components/SpotLight'
import HealthCondition from './components/HealthCondition'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

const page = async () => {
  const session = await getServerSession()
  if (session?.user?.name?.isAdmin === true) {
    return (
      <div className="flex gap-14  mt-10">
        <div className="flex flex-1 flex-col">
          <div className="flex">
            <div className="flex flex-col gap-20 w-[100%]">
              <FeaturedEdit />
              <EditorPick />
              <ExploreBy />
              <HealthCondition />
              <SpotLight />
              <div className="w-full flex justify-center items-center my-20">
                <Link
                  href="/"
                  className="text-[#AFE67F] rounded-lg cursor:pointer bg-[#1D3208] h-[40px] p-5 flex justify-center items-center"
                >
                  Update Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <><h1>you are not authorize for this page</h1></>
}

export default page
