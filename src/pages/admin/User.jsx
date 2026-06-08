import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import { useAuth } from '../../context/AuthContext';
import { FaSearch } from 'react-icons/fa';

function User() {
    const { users, addUser, groups, user, deleteUser, blockUser } = useAuth()

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        groupId: ''
    })
    const [selectId, setSelectId] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState({})
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }))
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const newError = {}

        if(userData.name.trim() === '') newError.name = 'Name is required'
        if(userData.email.trim() === '') newError.email = 'Email is required'
        if(userData.password.trim() === '') newError.password = 'Password is required'
        if(userData.password.length < 6) newError.password = 'Password must be at least 6 characters'
        if(userData.confirmPassword !== userData.password) newError.confirmPassword = 'Passwords do not match'
        if(userData.groupId === '') newError.groupId = 'Please select a group'

        if(userData.groupId !== '') {
            const selectedGroup = groups.find((g) => g.id == userData.groupId)
            const groupUser = users.filter((u) => u.groupId == userData.groupId)
            if(groupUser.length >= Number(selectedGroup.maxMembers)) {
                newError.groupId = 'Group is full!'
            }
        }

        if(Object.keys(newError).length > 0) {
            setError(newError)
            return
        }

        addUser({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            groupId: userData.groupId,
            status: 'active',
            hasWon: false,
            payments: []
        })

        setUserData({ name:'', email:'', password:'', confirmPassword:'', groupId:'' })
        setError({})
        setIsOpen(false)
    }

   const myGroups = groups.filter((g) => g.createdBy == user.id);
 
   const myUsers = users.filter((u) => u.createdBy == user.id && (selectId ? u.groupId == selectId : true));

 
   const filterdUsers = myUsers.filter((u) => {
    return u.name.toLowerCase().includes(searchTerm.toLowerCase());
   })


    return (
        <Layout>
            <div className='p-6'>

                {/* Modal */}
                {isOpen && (
                    <div className='fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center'>
                        <div className='bg-white rounded-xl shadow p-6 w-full max-w-lg mx-4'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h2 className='text-2xl font-bold text-blue-900 mb-1'>Create User</h2>
                                    <p className='text-gray-400 text-sm mb-6'>Create a new user and assign them to a group</p>
                                </div>
                                <button onClick={() => setIsOpen(false)} className='text-xl mb-12 ml-4'>X</button>
                            </div>

                            <form onSubmit={handleAdd} className='flex flex-col gap-3'>
                                <input type="text" name='name' value={userData.name}
                                    onChange={handleChange} placeholder='Full Name'
                                    className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                />
                                {error.name && <p className='text-red-500 text-sm'>{error.name}</p>}

                                <input type="email" name='email' value={userData.email}
                                    onChange={handleChange} placeholder='Email Address'
                                    className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                />
                                {error.email && <p className='text-red-500 text-sm'>{error.email}</p>}

                                <input type="password" name='password' value={userData.password}
                                    onChange={handleChange} placeholder='Password'
                                    className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                />
                                {error.password && <p className='text-red-500 text-sm'>{error.password}</p>}

                                <input type="password" name='confirmPassword' value={userData.confirmPassword}
                                    onChange={handleChange} placeholder='Confirm Password'
                                    className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                />
                                {error.confirmPassword && <p className='text-red-500 text-sm'>{error.confirmPassword}</p>}

                                <select name='groupId' value={userData.groupId} onChange={handleChange}
                                    className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                >
                                    <option value=''>--Select a Group--</option>
                                    {myGroups.map((group) => (
                                        <option key={group.id} value={group.id}>
                                            {group.name} (Max: {group.maxMembers} members)
                                        </option>
                                    ))}
                                </select>
                                {error.groupId && <p className='text-red-500 text-sm'>{error.groupId}</p>}

                                <div className='flex items-center gap-4 mt-2'>
                                    <button type='button'
                                        onClick={() => setIsOpen(false)}
                                        className='bg-gray-200 w-full text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium'>
                                        Cancel
                                    </button>
                                    <button type='submit'
                                        className='bg-blue-600 w-full text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium'>
                                        Create User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Users Table Card */}
                <div className='bg-white rounded-xl shadow p-6 w-full mx-auto'>

                    {/* Top Row — Title + Filter + Button */}
                    <div className='flex items-center justify-between mb-4 gap-4'>
                        <h2 className='text-xl font-bold text-blue-900 whitespace-nowrap'>
                            Users List ({myUsers.length})
                        </h2>



                        
                    

               <div className='flex gap-4'>

         
<div className='relative'>
      <FaSearch 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={16}
        />
                                <input type="text" value={searchTerm} placeholder='Search User' onChange={(e) => setSearchTerm(e.target.value)} 
className='border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300' />                      
</div>
                      


                         {/* Group Filter */}
                        <select
                            value={selectId}
                            onChange={(e) => setSelectId(e.target.value)}
                            className='border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 '
                        >
                            <option value=''>-- All Groups --</option>
                            {myGroups.map((g) => (
                                <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                        </select>

                        <button
                            onClick={() => setIsOpen(true)}
                            className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition whitespace-nowrap'>
                            + Create User
                        </button>
               </div>
                    </div>

                    <table className='w-full text-left'>
                        <thead>
                            <tr className='bg-blue-900 text-white text-sm'>
                                <th className='px-4 py-3 font-medium'>#</th>
                                <th className='px-4 py-3 font-medium'>Name</th>
                                <th className='px-4 py-3 font-medium'>Email</th>
                                <th className='px-4 py-3 font-medium'>Group</th>
                                <th className='px-4 py-3 font-medium'>Status</th>
                                <th className='px-4 py-3 font-medium'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {filterdUsers.map((u, index) => (
                                <tr key={u.id} className='hover:bg-blue-50 transition-colors text-sm'>
                                    <td className='px-4 py-3 text-gray-400'>{index + 1}</td>
                                    <td className='px-4 py-3 font-medium text-gray-800'>{u.name}</td>
                                    <td className='px-4 py-3 text-gray-500'>{u.email}</td>
                                    <td className='px-4 py-3 text-gray-600'>
                                        {groups.find(g => g.id == u.groupId)?.name || 'No Group'}
                                    </td>
                                    <td className='px-4 py-3'>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                            ${u.status === 'active'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-500'}`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3'>
                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() => blockUser(u.id)}
                                                className={`px-3 py-1 text-xs text-white rounded-lg
                                                    ${u.status === 'active' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}>
                                                {u.status === 'active' ? 'Block' : 'Unblock'}
                                            </button>
                                            <button
                                                onClick={() => deleteUser(u.id)}
                                                className='px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-lg'>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {myUsers.length === 0 && (
                        <div className='text-center py-12 text-gray-400'>
                            <p className='text-sm'>
                                {selectId ? 'No users in this group' : 'No users found'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default User