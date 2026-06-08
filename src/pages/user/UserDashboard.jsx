import React from 'react'
import { useAuth } from '../../context/AuthContext'
import Layout from '../../components/common/Layout'
import { FaMoneyBill, FaTrophy, FaLayerGroup, FaWallet } from 'react-icons/fa'

function UserDashboard() {
    const { users, user, groups } = useAuth()

    const currentUser = users.find((u) => u.id == user.id)
    const userGroup = groups.find((g) => g.id == currentUser?.groupId)

   
    if(!currentUser || !userGroup) {
        return (
            <Layout>
                <div className='p-6 text-center'>
                    <p className='text-red-500'>User or Group not found. Please logout and login again.</p>
                </div>
            </Layout>
        )
    }

    const totalAmount = currentUser.payments?.reduce((total, p) => total + Number(p.amount), 0) || 0

    return (
        <Layout>
            <div className='p-6'>

                {/* Stats Cards */}
                <div className='grid grid-cols-2 gap-4 mb-8'>

                    <div className='bg-blue-50 flex flex-col items-center justify-center rounded-xl hover:bg-blue-100 p-6'>
                        <FaMoneyBill className='text-blue-500 text-3xl mb-2'/>
                        <h2 className='text-sm font-medium text-gray-500'>Total Payments</h2>
                        <p className='font-bold text-2xl text-blue-900'>{currentUser.payments?.length || 0}</p>
                    </div>

                    <div className='bg-green-50 hover:bg-green-100 flex flex-col items-center justify-center rounded-xl p-6'>
                        <FaWallet className='text-green-500 text-3xl mb-2'/>
                        <h4 className='text-sm font-medium text-gray-500'>Total Amount Paid</h4>
                        <p className='text-2xl font-bold text-green-600'>Rs. {totalAmount}</p>
                    </div>

                    <div className='bg-yellow-50 hover:bg-yellow-100 flex flex-col items-center justify-center rounded-xl p-6'>
                        <FaTrophy className='text-yellow-500 text-3xl mb-2'/>
                        <h4 className='text-sm font-medium text-gray-500'>Token Status</h4>
                        <p className={`text-xl font-bold ${currentUser.hasWon ? 'text-green-500' : 'text-yellow-500'}`}>
                            {currentUser.hasWon ? 'Winner 🎉' : 'Pending ⏳'}
                        </p>
                    </div>

                    <div className='bg-purple-50 hover:bg-purple-100 flex flex-col items-center justify-center rounded-xl p-6'>
                        <FaLayerGroup className='text-purple-500 text-3xl mb-2'/>
                        <h4 className='text-sm font-medium text-gray-500'>My Group</h4>
                        <p className='text-xl font-bold text-purple-900'>{userGroup.name}</p>
                    </div>

                </div>

                {/* Group Detail */}
                <div className='bg-white shadow rounded-xl p-6'>
                    <h2 className='text-blue-900 font-bold text-xl mb-4'>Group Details</h2>
                    <div className='grid grid-cols-2 gap-4'>

                        <div className='bg-gray-50 rounded-lg p-4'>
                            <p className='text-gray-400 text-sm'>Group Name</p>
                            <p className='text-blue-600 font-bold text-lg'>{userGroup.name}</p>
                        </div>

                        <div className='bg-gray-50 rounded-lg p-4'>
                            <p className='text-gray-400 text-sm'>Daily Payment</p>
                            <p className='text-blue-600 font-bold text-lg'>Rs. {userGroup.dailyPayment}</p>
                        </div>

                        <div className='bg-gray-50 rounded-lg p-4'>
                            <p className='text-gray-400 text-sm'>Max Members</p>
                            <p className='text-blue-600 font-bold text-lg'>{userGroup.maxMembers}</p>
                        </div>

                        <div className='bg-gray-50 rounded-lg p-4'>
                            <p className='text-gray-400 text-sm'>Cycle Days</p>
                            <p className='text-blue-600 font-bold text-lg'>{userGroup.cycleDays} Days</p>
                        </div>

                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default UserDashboard