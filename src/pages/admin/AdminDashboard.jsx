import React from 'react'
import Layout from '../../components/common/Layout'
import { useAuth } from '../../context/AuthContext'

function AdminDashboard() {
    const { groups, user, users } = useAuth()

    const myUsers = users.filter((u) => u.createdBy == user.id)
    const myGroups = groups.filter((g) => g.createdBy == user.id)
    const actives = myUsers.filter((u) => u.status === 'active')
    const blocked = myUsers.filter((u) => u.status === 'blocked')

  
    const groupUsers = myUsers.filter(u => u.groupId == myGroups.id)

 
    const paid = groupUsers.filter(u => u.payments?.length > 0)


    const unpaid = groupUsers.filter(u => !u.payments?.length || u.payments?.length === 0)

    return (
        <Layout>
            <div className='p-6'>

                <h2 className='text-2xl font-bold text-blue-900 mb-6'>Admin Dashboard</h2>
            <div className='grid grid-cols-3 gap-4'>

                    <div className='bg-white shadow rounded-xl p-6 text-center hover:shadow-2xl hover:bg-blue-50'>
                        <h1 className='text-gray-400 text-sm mb-1'>Total Users</h1>
                        <p className='font-bold text-2xl text-blue-900'>{myUsers.length}</p>
                    </div>

                    <div className='bg-white shadow rounded-xl p-6 text-center hover:shadow-2xl hover:bg-green-50'>
                        <h1 className='text-gray-400 text-sm mb-1'>Active Users</h1>
                        <p className='text-green-500 font-bold text-2xl'>{actives.length}</p>
                    </div>

                    <div className='bg-white shadow rounded-xl p-6 text-center hover:shadow-2xl hover:bg-red-50'>
                        <h1 className='text-gray-400 text-sm mb-1'>Blocked Users</h1>
                        <p className='text-red-500 font-bold text-2xl'>{blocked.length}</p>
                    </div>

                    <div className='bg-white shadow rounded-xl p-6 text-center hover:shadow-2xl hover:bg-blue-50'>
                        <h1 className='text-gray-400 text-sm mb-1'>Total Groups</h1>
                        <p className='text-blue-600 font-bold text-2xl'>{myGroups.length}</p>
                    </div>

                    <div className='bg-white shadow rounded-xl p-6 text-center hover:shadow-2xl hover:bg-green-50'>
                        <h1 className='text-gray-400 text-sm mb-1'>Overall Paid</h1>
                        <p className='text-green-500 font-bold text-2xl'>{paid.length}</p>
                    </div>

                    <div className='bg-white shadow rounded-xl p-6 text-center hover:shadow-2xl hover:bg-red-50'>
                        <h1 className='text-gray-400 text-sm mb-1'>Overall Unpaid</h1>
                        <p className='text-red-500 font-bold text-2xl'>{unpaid.length}</p>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
