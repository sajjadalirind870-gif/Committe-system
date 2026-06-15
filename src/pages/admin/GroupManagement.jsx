
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/common/Layout';
import { FaSearch, FaTimes, FaTrash, FaPlay } from 'react-icons/fa';

function GroupManagement() {
    const [groupData, setGroupData] = useState({
        name: '',
        maxMembers: '',
        dailyPayment: '',
        cycleDays: '',
    })
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const { groups, addGroup, deleteGroup, user, startGroup } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGroupData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (groupData.name.trim() === '') return
        addGroup({
            name: groupData.name,
            maxMembers: groupData.maxMembers,
            dailyPayment: groupData.dailyPayment,
            cycleDays: groupData.cycleDays,
            members: [],
        })
        setGroupData({ name: '', maxMembers: '', dailyPayment: '', cycleDays: '' })
        setIsOpen(false)
    }

    const myGroups = groups.filter(g => g.createdBy == user.id)
    const createdGroup = myGroups.filter((g) =>
        g.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout>
            <div className='p-6 max-w-5xl mx-auto'>
                <div className='flex items-center justify-between mb-6 pt-4'>
                    <div>
                        <h2 className='text-2xl font-bold text-blue-900'>Groups Management</h2>
                        <p className='text-gray-400 text-sm mt-1'>Total Groups: {myGroups.length}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='relative'>
                            <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs' />
                            <input
                                type='text'
                                value={search}
                                placeholder='Search group...'
                                onChange={(e) => setSearch(e.target.value)}
                                className='pl-8 w-48 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300'
                            />
                        </div>
                        <button
                            onClick={() => setIsOpen(true)}
                            className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-xl shadow-md transition-all duration-200 flex items-center gap-2'
                        >
                            + Create Group
                        </button>
                    </div>
                </div>

                <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-blue-900 text-white text-sm text-left'>
                                <th className='py-4 px-5 font-medium'>Name</th>
                                <th className='py-4 px-5 font-medium'>Max Members</th>
                                <th className='py-4 px-5 font-medium'>Daily Pay</th>
                                <th className='py-4 px-5 font-medium'>Cycle Days</th>
                                <th className='py-4 px-5 font-medium'>Status</th>
                                <th className='py-4 px-5 font-medium'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {createdGroup.map((group) => (
                                <tr key={group.id} className='hover:bg-blue-50 transition-colors text-sm'>
                                    <td className='py-4 px-5 font-medium text-gray-800'>{group.name}</td>
                                    <td className='py-4 px-5 text-gray-500'>{group.maxMembers}</td>
                                    <td className='py-4 px-5 text-gray-600'>Rs. {group.dailyPayment}</td>
                                    <td className='py-4 px-5 text-gray-600'>{group.cycleDays} days</td>
                                    <td className='py-4 px-5'>
                                        {group.status === 'active' ? (
                                            <span className='bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full'>Active</span>
                                        ) : (
                                            <span className='bg-yellow-100 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full'>Pending</span>
                                        )}
                                    </td>
                                    <td className='py-4 px-5'>
                                        <div className='flex items-center gap-2'>
                                            <button
                                                onClick={() => deleteGroup(group.id)}
                                                className='bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1'
                                            >
                                                <FaTrash className='text-xs' /> Delete
                                            </button>
                                            <button
                                                onClick={() => startGroup(group.id)}
                                                disabled={group.status !== 'pending'}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1 ${
                                                    group.status === 'pending'
                                                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                            >
                                                <FaPlay className='text-xs' /> Start
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {createdGroup.length === 0 && (
                        <div className='text-center py-16'>
                            <p className='text-gray-400 text-sm'>No groups found</p>
                        </div>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto'>
                        <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                            <div>
                                <h2 className='text-2xl font-bold text-blue-900'>Create New Group</h2>
                                <p className='text-gray-400 text-sm mt-1'>Enter group details</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className='text-gray-400 hover:text-gray-600'>
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Group Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={groupData.name}
                                    onChange={handleChange}
                                    placeholder="e.g., Gold Committee"
                                    className='w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Max Members</label>
                                <input
                                    type="number"
                                    name="maxMembers"
                                    value={groupData.maxMembers}
                                    onChange={handleChange}
                                    placeholder="e.g., 10"
                                    className='w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Daily Payment (Rs.)</label>
                                <input
                                    type="number"
                                    name="dailyPayment"
                                    value={groupData.dailyPayment}
                                    onChange={handleChange}
                                    placeholder="e.g., 100"
                                    className='w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Cycle Days</label>
                                <input
                                    type="number"
                                    name="cycleDays"
                                    value={groupData.cycleDays}
                                    onChange={handleChange}
                                    placeholder="e.g., 10"
                                    className='w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                    required
                                />
                            </div>
                            <div className='flex items-center gap-3 pt-4'>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className='flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 py-2.5 rounded-xl font-medium transition-all'
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition-all shadow-md'
                                >
                                    Create Group
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    )
}

export default GroupManagement
