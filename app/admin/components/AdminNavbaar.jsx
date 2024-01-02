import Link from 'next/link'
import React from 'react'

const AdminNavbaar = () => {
  return (
        <div className="flex gap-6 w-full text-[22px]">
            <Link href="/admin" className="text-gray-700 hover:text-blue-500 transition duration-300">Feature</Link>
            <Link href="/admin/editaboutus" className="text-gray-700 hover:text-blue-500 transition duration-300">About us</Link>
            <Link href="/admin/editcontactus" className="text-gray-700 hover:text-blue-500 transition duration-300">Contact us</Link>
        </div>
  )
}

export default AdminNavbaar
