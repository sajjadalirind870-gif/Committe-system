import React, { useState } from 'react'
import Layout from '../../components/common/Layout'
import { useAuth } from '../../context/AuthContext'
import { FaSearch } from 'react-icons/fa'

function History() {
    const [selectPhase, setSelectPhase] = useState('')
    const { user, users, groups } = useAuth()

    const currentUser = users.find((u) => u.id == user.id)
    const userGroup = groups.find((g) => g.id == currentUser?.groupId && g.status === 'active')

    if (!currentUser || !userGroup) {
        return (
            <Layout>
                <div className='p-6 text-center text-red-500'>User or group not found</div>
            </Layout>
        )
    }

    const phaseToShow = selectPhase ? Number(selectPhase) : userGroup.currentPhase
    const cycleDays = userGroup.cycleDays
  

    // Payments for selected phase
    const phasePayments = currentUser.payments?.filter(p => Number(p.phaseNumber) === phaseToShow) || []
    const paidDays = phasePayments.length
    const remaining = cycleDays - paidDays
    const totalAmount = phasePayments.reduce((sum, p) => sum + Number(p.amount), 0)

    // Pending amount (from previous phases) - for display
    const pendingAmount = currentUser.pending || 0

    return (
        <Layout>
            <div className='p-6 max-w-5xl mx-auto'>
                {/* Header */}
                <div className='flex items-center justify-between mb-6 pt-4'>
                    <div>
                        <h2 className='text-2xl font-bold text-blue-900'>My Payment History</h2>
                        <p className='text-gray-400 text-sm mt-1'>
                            Group: {userGroup.name} | Phase {phaseToShow}
                        </p>
                    </div>

                    {/* Phase Filter */}
                    <div className='flex items-center gap-3'>
                        <div className='relative'>
                            <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs' />
                            <input
                                type='text'
                                placeholder='Search payment...'
                                className='pl-8 w-48 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-600 bg-gray-50'
                            />
                        </div>
                        <select
                            value={selectPhase}
                            onChange={(e) => setSelectPhase(e.target.value)}
                            className='w-48 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300'
                        >
                            <option value="">-- All Phases --</option>
                            {[...Array(userGroup.currentPhase).keys()].map(i => (
                                <option key={i+1} value={i+1}>Phase {i+1}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className='grid grid-cols-4 gap-4 mb-6'>
                    <div className='bg-blue-50 rounded-xl p-3 text-center'>
                        <p className='text-gray-400 text-xs'>Total Payments</p>
                        <p className='text-blue-900 font-bold text-xl'>{currentUser.payments?.length || 0}</p>
                    </div>
                    <div className='bg-green-50 rounded-xl p-3 text-center'>
                        <p className='text-gray-400 text-xs'>Phase Amount</p>
                        <p className='text-green-600 font-bold text-xl'>Rs. {totalAmount}</p>
                    </div>
                    <div className='bg-yellow-50 rounded-xl p-3 text-center'>
                        <p className='text-gray-400 text-xs'>Pending (Carryover)</p>
                        <p className='text-yellow-700 font-bold text-xl'>Rs. {pendingAmount}</p>
                    </div>
                    <div className='bg-purple-50 rounded-xl p-3 text-center'>
                        <p className='text-gray-400 text-xs'>Phase Completion</p>
                        <p className='text-purple-700 font-bold text-xl'>{paidDays}/{cycleDays}</p>
                    </div>
                </div>

                {/* Table */}
                <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-blue-900 text-white text-sm text-left'>
                                <th className='py-4 px-5 font-medium'>#</th>
                                <th className='py-4 px-5 font-medium'>Date</th>
                                <th className='py-4 px-5 font-medium'>Amount</th>
                                <th className='py-4 px-5 font-medium'>Status</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {phasePayments.map((p, idx) => (
                                <tr key={p.id} className='hover:bg-blue-50 transition-colors text-sm'>
                                    <td className='py-4 px-5 text-gray-400 font-medium'>{idx + 1}</td>
                                    <td className='py-4 px-5 font-medium text-gray-800'>{p.date}</td>
                                    <td className='py-4 px-5 font-bold text-gray-800'>Rs. {p.amount}</td>
                                    <td className='py-4 px-5'>
                                        <span className='bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full'>
                                            {p.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {phasePayments.length === 0 && (
                        <div className='text-center py-16'>
                            <p className='text-gray-400 text-sm'>No payments in this phase</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default History
