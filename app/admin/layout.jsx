import React from 'react'
import AdminNavbaar from './components/AdminNavbaar'

const AdminLayout = ({ children }) => {
  return (
    <div className="main">
      <h1 className="text-center text-[30px] font-bold">Admin Panel</h1>
      <div className="flex">
        <AdminNavbaar />
      </div>
      {children}
    </div>
  )
}

export default AdminLayout
