import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Layout from '../../components/common/Layout'
import { FaSearch, FaBan, FaTrash } from 'react-icons/fa'

function AllUsers() {
    const { users, deleteUser, blockUser } = useAuth()
    const [search, setSearch] = useState('')

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <Layout>
            <div className='p-6 max-w-5xl mx-auto'>
                <div className='flex items-center justify-between mb-6 pt-4'>
                    <div>
                        <h2 className='text-2xl font-bold text-blue-900'>All Users</h2>
                        <p className='text-gray-400 text-sm mt-1'>Total Users: {users.length}</p>
                    </div>
                    <div className='relative'>
                        <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs' />
                        <input
                            type='text'
                            value={search}
                            placeholder='Search user...'
                            onChange={(e) => setSearch(e.target.value)}
                            className='pl-8 w-64 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300'
                        />
                    </div>
                </div>

                <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-blue-900 text-white text-sm text-left'>
                                <th className='py-4 px-5 font-medium'>Name</th>
                                <th className='py-4 px-5 font-medium'>Email</th>
                                <th className='py-4 px-5 font-medium'>Role</th>
                                <th className='py-4 px-5 font-medium'>Status</th>
                                <th className='py-4 px-5 font-medium'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className='hover:bg-blue-50 transition-colors text-sm'>
                                    <td className='py-4 px-5 font-medium text-gray-800'>{user.name}</td>
                                    <td className='py-4 px-5 text-gray-500'>{user.email}</td>
                                    <td className='py-4 px-5'>
                                        <span className='bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full'>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className='py-4 px-5'>
                                        {user.status === 'active' ? (
                                            <span className='bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full'>Active</span>
                                        ) : (
                                            <span className='bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full'>Blocked</span>
                                        )}
                                    </td>
                                    <td className='py-4 px-5'>
                                        <div className='flex items-center gap-2'>
                                            <button
                                                onClick={() => blockUser(user.id)}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1 ${
                                                    user.status === 'active'
                                                        ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                                                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                                                }`}
                                            >
                                                <FaBan className='text-xs' />
                                                {user.status === 'active' ? 'Block' : 'Unblock'}
                                            </button>
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className='bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1'
                                            >
                                                <FaTrash className='text-xs' /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                        <div className='text-center py-16'>
                            <p className='text-gray-400 text-sm'>No users found</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default AllUsers