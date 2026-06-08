import React from 'react'
import Layout from '../../components/common/Layout'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'


function SuperAdminDashboard() {
  const { admins, users, groups } = useAuth()
  const navigate = useNavigate();

  const handleNav = () => {
   return navigate ('/superadmin/admins');
  }

  const nav = () => {
    return navigate('/admin/users')
  }

  return (
    <Layout>
      <div className='p-6'>
        
        <h2 className='text-2xl font-bold text-blue-900 mb-6'>Welcome, Super Admin 👋</h2>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='bg-white rounded-xl shadow p-6 text-center' onClick={handleNav}>
            <p className='text-gray-400 text-sm mb-1'>Total Admins</p>
            <h3 className='text-4xl font-bold text-blue-900'>{admins.length}</h3>
          </div>
          <div className='bg-white rounded-xl shadow p-6 text-center' onClick={handleNav}>
            <p className='text-gray-400 text-sm mb-1'>Active Admins</p>
            <h3 className='text-4xl font-bold text-green-600'>
              {admins.filter(a => a.status === 'active').length}
            </h3>
          </div>
          <div className='bg-white rounded-xl shadow p-6 text-center' onClick={handleNav}>
            <p className='text-gray-400 text-sm mb-1'>Blocked Admins</p>
            <h3 className='text-4xl font-bold text-red-500'>
              {admins.filter(a => a.status === 'blocked').length}
            </h3>
          </div>
          <div className='bg-white rounded-xl shadow p-6 text-center' onClick={nav}>
            <p className='text-gray-400 text-sm mb-1'>Total Users</p>
            <h3 className='text-4xl font-bold text-blue-900'>{users.length}</h3>
          </div>
          <div className='bg-white rounded-xl shadow p-6 text-center'>
            <p className='text-gray-400 text-sm mb-1'>Total Groups</p>
            <h3 className='text-4xl font-bold text-blue-900'>{groups.length}</h3>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default SuperAdminDashboard