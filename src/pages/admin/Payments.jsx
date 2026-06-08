// import React, { useState } from 'react'
// import Layout from '../../components/common/Layout'
// import { useAuth } from '../../context/AuthContext'
// import { FaSearch } from 'react-icons/fa'


// function Payments() {
//   const [selectGroup, setSelectGroup] = useState(null)
//   const [search, setSearch] = useState('')
//   const { user, users, groups } = useAuth()

//   const userGroup = groups.filter((g) => g.createdBy == user.id)
//   const myGroup = userGroup.find((g) => g.id == selectGroup)
//  const myUsers = users.filter((u) => u.createdBy == user.id && (selectGroup? u.groupId == selectGroup: true) )

//  const allUsers = myUsers.filter((u) => {
//   return u.name.toLowerCase().includes(search.toLowerCase())
//  });

//   return (
//     <Layout>
//       <div className='p-6 max-w-5xl mx-auto'>



//       <div className='flex items-center justify-between pt-10'>
//        <h2 className='text-blue-900 text-2xl font-bold mb-6'>
//             Payments History
//           </h2>

//           <div className='relative'>
//       <FaSearch className='absolute top-3 left-58'/>
//             <input type="text" value={search} placeholder='Search' onChange={(e) => setSearch(e.target.value)}  className='mr-2 w-64  border mb-6 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300'/>
//               <select
//             value={selectGroup}
//             onChange={(e) => setSelectGroup(e.target.value)}
//             className='w-64 border mb-6 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300'
//           >
//             <option value=''>-- All Groups --</option>
//             {userGroup.map((g) => (
//               <option key={g.id} value={g.id}>{g.name}</option>
//             ))}
//           </select> 
//           </div>

//       </div>
//           <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
//             <table className='w-full'>
//               <thead>
//                 <tr className='bg-blue-900 text-white text-sm text-left'>
//                   <th className='py-3 px-5 font-medium'>Name</th>
//                   <th className='py-3 px-5 font-medium'>Email</th>
//                   <th className='py-3 px-5 font-medium'>Group Name</th>
//                   <th className='py-3 px-5 font-medium'>Payment Status</th>
//                   <th className='py-3 px-5 font-medium'>Amount</th>
//                 </tr>
//               </thead>

//               <tbody className='divide-y divide-gray-100'>
//                 {allUsers.map((u) => (
//                   <tr key={u.id} className='hover:bg-blue-50 transition-colors text-sm'>

//                     <td className='py-3 px-5 font-medium text-gray-800'>
//                       {u.name}
//                     </td>

//                     <td className='py-3 px-5 text-gray-500'>
//                       {u.email}
//                     </td>

//                     <td className='py-3 px-5 text-gray-600'>
//                       {myGroup?.name}
//                     </td>

//                     <td className='py-3 px-5'>
//                       {u.payments?.length > 0
//                         ? <span className='bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full'>Paid</span>
//                         : <span className='bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full'>Unpaid</span>
//                       }
//                     </td>

//                     <td className='py-3 px-5 font-semibold text-gray-800'>
//                       {u.payments?.length > 0
//                         ? `Rs. ${u.payments.map((p) => p.amount).join(' + ')}`
//                         : <span className='text-gray-400'>—</span>
//                       }
//                     </td>

//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
      

     

//       </div>
//     </Layout>
//   )
// }

// export default Payments

// import React, { useState } from 'react'
// import Layout from '../../components/common/Layout'
// import { useAuth } from '../../context/AuthContext'
// import { FaSearch } from 'react-icons/fa'

// function Payments() {
//   const [search, setSearch] = useState('')
//   const [selectGroup, setSelectGroup] = useState('')
//   const { user, users, groups } = useAuth()

//   const myGroups = groups.filter(g => g.createdBy == user.id)

// const myUser = users.filter((u) => u.createdBy == user.id && (selectGroup? u.groupId == selectGroup : true))

//   const searchedUsers = myUser.filter(u =>
//     u.name.toLowerCase().includes(search.toLowerCase())
//   )

//   return (
//     <Layout>
//       <div className='p-6 max-w-5xl mx-auto'>

//         {/* Filters */}
//         <div className='flex gap-4 mb-4'>
//           <select
//             value={selectGroup}
//             onChange={(e) => setSelectGroup(e.target.value)}
//             className='border rounded-lg px-4 py-2 text-sm'
//           >
//             <option value=''>-- All Groups --</option>
//             {myGroups.map(g => (
//               <option key={g.id} value={g.id}>{g.name}</option>
//             ))}
//           </select>

//           <input
//             type='text'
//             placeholder='Search User'
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className='border rounded-lg px-4 py-2 text-sm'
//           />
//         </div>

//         <p className='text-sm text-gray-500 mb-3'>
//           Total Users: {searchedUsers.length}
//         </p>

//         {/* Table */}
//         <div className='bg-white rounded-xl shadow overflow-hidden'>
//           <table className='w-full'>
//             <thead>
//               <tr className='bg-blue-900 text-white text-sm text-left'>
//                 <th className='py-3 px-4'>Name</th>
//                 <th className='py-3 px-4'>Email</th>
//                 <th className='py-3 px-4'>Group</th>
//                 <th className='py-3 px-4'>Amount</th>
//                 <th className='py-3 px-4'>Status</th>
//               </tr>
//             </thead>
//             <tbody className='divide-y divide-gray-100'>
//               {searchedUsers.map(u => {
//                 // ✅ Pehle group nikalo
//                 const userGroup = myGroups.find(g => g.id == u.groupId)
//                 // ✅ cycleDays Number mein
//                 const totalDays = Number(userGroup?.cycleDays) || 0
//                 const paidDays = u.payments.length
//                 // ✅ Sahi calculation
//                 const remaining = totalDays - paidDays

//                 return (
//                   <tr key={u.id} className='hover:bg-blue-50 text-sm'>
//                     <td className='py-3 px-4'>{u.name}</td>
//                     <td className='py-3 px-4 text-gray-500'>{u.email}</td>
//                     <td className='py-3 px-4'>{userGroup?.name || '—'}</td>
//                     <td className='py-3 px-4'>
//                       {paidDays > 0
//                         ? `Rs. ${u.payments.map(p => p.amount).join(' + ')}`
//                         : '—'
//                       }
//                     </td>
//                     <td className='py-3 px-4'>
//                       <div className='text-xs'>
//                         <span className='text-green-600 font-medium'>
//                           Paid: {paidDays}
//                         </span>
//                         {' — '}
//                         <span className='text-red-500 font-medium'>
//                           Remaining: {remaining}
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 )
//               })}
//             </tbody>
//           </table>

//           {searchedUsers.length === 0 && (
//             <p className='text-center text-gray-400 py-8 text-sm'>
//               No users found
//             </p>
//           )}
//         </div>
//       </div>
//     </Layout>
//   )
// }

// export default Payments



import React, { useState } from 'react'
import Layout from '../../components/common/Layout'
import { useAuth } from '../../context/AuthContext'
import { FaSearch } from 'react-icons/fa'

function Payments() {
  const [selectGroup, setSelectGroup] = useState('')
  const [search, setSearch] = useState('')
  const { user, users, groups } = useAuth()
  const [selectPhase, setSelectPhase] = useState('')

  const myGroups = groups.filter(g => g.createdBy == user.id)

  const myUsers = users.filter(u =>
    u.createdBy == user.id &&
    (selectGroup ? u.groupId == selectGroup : true) &&
    u.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleGroupChange = (groupId) => {
  const group = groups.find(g => g.id === Number(groupId));
  setSelectGroup(groupId);
  setSelectPhase('');
};






const selectedGroup = myGroups.find(g => g.id == selectGroup);

  return (
    <Layout>
      <div className='p-6 max-w-5xl mx-auto'>

        {/* Header */}
        <div className='flex items-center justify-between mb-6 pt-4'>
          <div>
            <h2 className='text-2xl font-bold text-blue-900'>Payments History</h2>
            <p className='text-gray-400 text-sm mt-1'>Total Users: {myUsers.length}</p>
          </div>

          {/* Filters */}
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs' />
              <input
                type='text'
                value={search}
                placeholder='Search user...'
                onChange={(e) => setSearch(e.target.value)}
                className='pl-8 w-48 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300'
              />
            </div>

            <select
              value={selectGroup}
              onChange={(e) => handleGroupChange(e.target.value)}
              className='w-48 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300'
            >
              <option value=''>-- All Groups --</option>
              {myGroups.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>




{selectGroup && (
  <select
    value={selectPhase}
    onChange={(e) => setSelectPhase(e.target.value)}
    className='w-48 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300'
  >
    <option value="">-- All Phases --</option>
    {[...Array(selectedGroup?.currentPhase).keys()].map((i) => (
      <option key={i+1} value={i+1}>Phase {i+1}</option>
    ))}
  </select>
)}


          </div>
        </div>

       
        <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
          <table className='w-full'>
            <thead>
              <tr className='bg-blue-900 text-white text-sm text-left'>
                <th className='py-4 px-5 font-medium'>#</th>
                <th className='py-4 px-5 font-medium'>Name</th>
                <th className='py-4 px-5 font-medium'>Email</th>
                <th className='py-4 px-5 font-medium'>Group</th>
                <th className='py-4 px-5 font-medium'>Total Amount</th>
                <th className='py-4 px-5 font-medium'>Paid Days</th>
                <th className='py-4 px-5 font-medium'>Remaining</th>
                <th className='py-4 px-5 font-medium'>Status</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-100'>
              {myUsers.map((u, index) => {

            const grp = myGroups.find((g) => g.id == u.groupId);
            const cycleDays = Number(grp?.cycleDays) || 0;
            const phaseToShow = selectPhase ? Number(selectPhase) : (grp?.currentPhase || 1);
            const phasePayments = (u.payments || []).filter((p) => p.phaseNumber === phaseToShow);
            const paidDays = phasePayments.length;
            const remaining = cycleDays - paidDays;
            const totalAmount = phasePayments.reduce((sum, p) => sum + Number(p.amount), 0);


                return (  
                  <tr key={u.id} className='hover:bg-blue-50 transition-colors text-sm'>

                    <td className='py-4 px-5 text-gray-400 font-medium'>
                      {index + 1}
                    </td>

                    <td className='py-4 px-5'>
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase'>
                          {u.name?.charAt(0)}
                        </div>
                        <span className='font-medium text-gray-800'>{u.name}</span>
                      </div>
                    </td>

                    <td className='py-4 px-5 text-gray-400 text-xs'>
                      {u.email}
                    </td>

                    <td className='py-4 px-5'>
                      <span className='bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-lg'>
                        {grp?.name || '—'}
                      </span>
                    </td>

                    <td className='py-4 px-5 font-bold text-gray-800'>
                      {totalAmount > 0
                        ? `Rs. ${totalAmount}`
                        : <span className='text-gray-300'>—</span>
                      }
                    </td>

                    <td className='py-4 px-5'>
                      <span className='bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full'>
                        {paidDays} days
                      </span>
                    </td>

                    <td className='py-4 px-5'>
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full
                        ${remaining <= 0
                          ? 'bg-gray-100 text-gray-400'
                          : 'bg-red-100 text-red-600'
                        }`}>
                        {remaining <= 0 ? '0 days' : `${remaining} days`}
                      </span>
                    </td>

                    <td className='py-4 px-5'>
                      {remaining <= 0
                        ? <span className='inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full'>
                            <span className='w-1.5 h-1.5 bg-green-500 rounded-full'></span>
                            Fully Paid
                          </span>
                        : paidDays > 0
                          ? <span className='inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1.5 rounded-full'>
                              <span className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></span>
                              Partial
                            </span>
                          : <span className='inline-flex items-center gap-1.5 bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full'>
                              <span className='w-1.5 h-1.5 bg-red-500 rounded-full'></span>
                              Unpaid
                            </span>
                      }
                    </td>

                  </tr>
                )
              })}
            </tbody>
          </table>

          {myUsers.length === 0 && (
            <div className='text-center py-16'>
              <p className='text-gray-400 text-sm'>No users found</p>
            </div>
          )}
        </div>

      </div>
    </Layout>
  )
}

export default Payments




