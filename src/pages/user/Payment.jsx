import React, { useState } from 'react'
import Layout from '../../components/common/Layout'
import { useAuth } from '../../context/AuthContext'
import { FaCheckCircle, FaMoneyBillWave, FaUsers, FaCalendarAlt } from 'react-icons/fa'

function MakePayment() {
    const { user, users, groups, makePayment} = useAuth()
    const [toast, setToast] = useState(null)

    const currentUser = users.find((u) => u.id == user.id)
    const userGroup = groups.find((g) => g.id == currentUser.groupId)
const userPending = currentUser?.pending || 0;
const totalDue = userPending + (userGroup.cycleDays * userGroup.dailyPayment);
const effectiveDaily = totalDue / userGroup.cycleDays;

    if(!currentUser) {
        return (
            <Layout>
                <div className='p-6 text-center'>
                    <p className='text-red-500'>User not found. Please logout and login again.</p>
                </div>
            </Layout>
        )
    }



    if(!userGroup) {
        return (
            <Layout>
                <div className='p-6 text-center'>
                    <p className='text-red-500'>No group assigned. Please contact admin.</p>
                </div>
            </Layout>
        )
    }

    const today = new Date().toLocaleDateString()
    const paidToday = currentUser.payments?.some(p => p.date === today)

    const showToast = (message, type) => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3000)
    }

    const handlePayment = () => {
        makePayment(user.id)
        showToast('Payment Successfully Done!', 'success')
    }

    return (
        <Layout>
            <div className='p-6'>


                {toast &&  userGroup?.status === 'active' && (
                    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg text-white font-medium transition-all duration-300
                        ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                        <FaCheckCircle className='text-xl'/>
                        {toast.message}
                    </div>
                )}

                <div className='bg-white rounded-xl shadow p-6 max-w-md mx-auto'>

                    {/* Header */}
                    <div className='flex items-center gap-3 mb-6'>
                        <div className='bg-blue-100 p-3 rounded-full'>
                            <FaMoneyBillWave className='text-blue-600 text-2xl'/>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold text-blue-900'>Make Payment</h2>
                            <p className='text-gray-400 text-sm'>Daily committee payment</p>
                        </div>
                    </div>

                    {/* Group Info Cards */}
                    <div className='grid grid-cols-2 gap-3 mb-6'>

                        <div className='bg-blue-50 rounded-lg p-3'>
                            <div className='flex items-center gap-2 mb-1'>
                                <FaUsers className='text-blue-500'/>
                                <p className='text-gray-500 text-xs'>Group</p>
                            </div>
                            <p className='font-bold text-blue-900'>{userGroup.name}</p>
                        </div>

                        <div className='bg-green-50 rounded-lg p-3'>
                            <div className='flex items-center gap-2 mb-1'>
                                <FaMoneyBillWave className='text-green-500'/>
                                <p className='text-gray-500 text-xs'>Daily Amount</p>
                            </div>
                            <p className='font-bold text-green-700'>Rs. {effectiveDaily}</p>
                        </div>

                        <div className='bg-purple-50 rounded-lg p-3'>
                            <div className='flex items-center gap-2 mb-1'>
                                <FaCalendarAlt className='text-purple-500'/>
                                <p className='text-gray-500 text-xs'>Total Payments</p>
                            </div>
                            <p className='font-bold text-purple-900'>{currentUser.payments?.length || 0}</p>
                        </div>

                        <div className='bg-yellow-50 rounded-lg p-3'>
                            <div className='flex items-center gap-2 mb-1'>
                                <FaCalendarAlt className='text-yellow-500'/>
                                <p className='text-gray-500 text-xs'>Today</p>
                            </div>
                            <p className='font-bold text-yellow-700'>{today}</p>
                        </div>

                    </div>

                    {/* Payment Button */}
                    {paidToday ? (
                        <div className='w-full bg-gray-100 border-2 border-gray-200 text-gray-500 py-4 rounded-xl font-medium text-center flex items-center justify-center gap-2'>
                            <FaCheckCircle className='text-green-500 text-xl'/>
                            Already Paid Today
                        </div>
                    ) : (
                        <button
                            onClick={handlePayment}
                            className='w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition font-bold text-lg flex items-center justify-center gap-2'>
                            <FaMoneyBillWave className='text-xl'/>
                            Pay Now Rs. {effectiveDaily}
                        </button>
                      
                    )}
                    
              
                    <p className='text-red-600 mt-2'>{userGroup?.status === 'pending' && 'This group is pending approval from the admin.'}</p>
                </div>
            </div>
        </Layout>
    )
}

export default MakePayment







