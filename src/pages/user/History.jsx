// import React, { useState } from 'react'
// import Layout from '../../components/common/Layout'
// import { useAuth } from '../../context/AuthContext'

// function History() {
//     const [selectPhase, setSelectPhase] = useState('');
//     const { users, groups, user } = useAuth()
 

// const currentUser = users.find((u) => u.id == user.id);
// const userGroup = groups.find((g) => g.id == currentUser?.groupId);

// const phaseToShow = selectPhase ? Number(selectPhase): (userGroup?.currentPhase || 0);
// const phasePayments = currentUser.payments.filter((p) => Number(p.phaseNumber) == phaseToShow) || [];


//   if(!currentUser) {
//     return (
//         <Layout><p className='p-6 text-red-500'>User not found</p></Layout>
//     );
// }

// return (
//     <Layout>
//         <div className='p-6'>
//             <div className='bg-white rounded-xl shadow p-6'>
// <div>
    
//               <div> <h2 className='text-2xl font-bold text-blue-900 mb-1'>Payment History</h2>
//                 <p className='text-gray-400 text-sm mb-6'>Group: <span className='font-bold text-blue-900'>{userGroup?.name}</span></p>
// </div> 

// <select value={selectPhase} onChange={(e) => setSelectPhase(e.target.value)}>
//     <option value="">--Select Phase--</option>
//     {[...Array(userGroup?.currentPhase || 0).keys()].map((i) => (
//         <option value={i + 1} id={i + 1}>Phase {i + 1}</option>
//     ))}
// </select>
                
// </div>

//                 {/* Stats Cards */}
//                 <div className='grid grid-cols-2 gap-4 mb-6'>
//                     <div className='bg-blue-50 rounded-lg p-4 text-center hover:bg-blue-100'>
//                         <p className='text-gray-400 text-sm'>Total Payments</p>
//                         <p className='text-blue-900 font-bold text-2xl'>{currentUser.payments?.length || 0}</p>
//                     </div>
//                     <div className='bg-green-50 rounded-lg p-4 text-center hover:bg-green-100'>
//                         <p className='text-gray-400 text-sm'>Total Amount</p>
//                         <p className='text-green-600 font-bold text-2xl'>
//                             Rs. {currentUser.payments?.reduce((total, p) => total + Number(p.amount), 0) || 0}
//                         </p>
//                     </div>

//                     <div className='bg-yellow-50 rounded-lg p-4 text-center hover:bg-yellow-100'>
//     <p className='text-gray-400 text-sm'>Pending Amount</p>
//     <p className='text-red-600 font-bold text-2xl'>Rs. {currentUser.pending || 0}</p>
// </div>
//                 </div>

//                 {/* Table */}
//                 <table className='w-full text-left'>
//                     <thead>
//                         <tr className='bg-blue-50'>
//                             <th className='px-4 py-2 text-blue-900'>#</th>
//                             <th className='px-4 py-2 text-blue-900'>Date</th>
//                             <th className='px-4 py-2 text-blue-900'>Amount</th>
//                             <th className='px-4 py-2 text-blue-900'>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {phasePayments?.map((p, index) => (
//                             <tr key={p.id} className='border-t hover:bg-gray-50'>
//                                 <td className='px-4 py-2 text-gray-500'>{index + 1}</td>
//                                 <td className='px-4 py-2'>{p.date}</td>
//                                 <td className='px-4 py-2 font-bold text-blue-900'>Rs. {p.amount}</td>
//                                 <td className='px-4 py-2'>
//                                     <span className='bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm'>
//                                         {p.status}
//                                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {currentUser.payments?.length === 0 && (
//                     <p className='text-center text-gray-400 py-8'>Koi payment nahi ki abhi</p>
//                 )}

//             </div>
//         </div>
//     </Layout>
// )

// }

// export default History







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