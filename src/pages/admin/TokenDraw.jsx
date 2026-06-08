// import React, { useState } from 'react'
// import Layout from '../../components/common/Layout'
// import { useAuth } from '../../context/AuthContext'

// function TokenDraw() {
//     const [selectedId, setSelectedId] = useState(null)
//     const [winner, setWinner] = useState(null)
//     const [allMembersWon, setAllMembersWon] = useState(false)
//     const [drawComplete, setDrawComplete] = useState(false)

//     const { users, user, groups, tokenDraw, nextPhase, isCycleComplete } = useAuth()

//     const userGroups = groups.filter(g => g.createdBy == user.id)
//     const selectedGroup = userGroups.find(g => g.id == selectedId)
//     const groupMembers = users.filter(u => u.groupId == selectedId)
//     const cycleComplete = selectedId ? isCycleComplete(selectedId) : false;

// const eligible = selectedId ? users.filter((u) => {
//     if(u.groupId !== selectedId)  return false;
//     const phasePayment = u.payments.filter((p) => p.phaseNumber === selectedGroup.currentPhase )
//     return phasePayment.length >= selectedGroup.cycleDays && !u.hasWon
// }):
// []


// const isGroupFull = selectedGroup && groupMembers.length >= Number(selectedGroup.maxMembers);

 

//     const handleDraw = () => {
//         if(!selectedId) return
//         const result = tokenDraw(selectedId);
//         if(!result){
//             setAllMembersWon(true);
//             setWinner(null)
//         }
//         else{
//             setWinner(result);
//             setAllMembersWon(false);
//             setDrawComplete(true)
//         }
//     }


//     return (
//         <Layout>
//             <div className='p-6'>
//                 <div className='bg-white shadow-2xl rounded-xl p-6 max-w-md mx-auto'>
//                     <h2 className='text-blue-700 text-2xl font-bold mb-1'>Token Draw</h2>
//                     <p className='text-gray-400 text-sm mb-6'>Select group and draw lucky winner</p>

//                     <label className='text-gray-600 text-sm font-medium mb-1 block'>Select Group</label>
//                     <select
//                         value={selectedId || ''}
//                         onChange={(e) => {
//                             setSelectedId(Number(e.target.value))
//                             setWinner(null)
//                             setAllMembersWon(false)
//                         }}
//                         className='w-full border border-gray-300 rounded-lg px-4 py-2 mb-4'
//                     >
//                         <option value=''>-- Select Group --</option>
//                         {userGroups.map(g => (
//                             <option key={g.id} value={g.id}>{g.name}</option>
//                         ))}
//                     </select>

//                     {selectedId && (
//                         <div className='bg-blue-50 rounded-lg px-4 py-3 mb-4 flex justify-between'>
//                             <p className='text-blue-600 font-medium text-sm'>Eligible: {eligible.length}</p>
//                             <p className='text-blue-600 font-medium text-sm'>Members: {groupMembers.length} / {selectedGroup?.maxMembers}</p>
//                         </div>
//                     )}

//                     {selectedId && !isGroupFull && (
//                         <p className='text-red-500 text-sm mb-3'>
//                             Group is not full yet — need {selectedGroup.maxMembers - groupMembers.length} more members
//                         </p>
//                     )}

//                     {selectedId && isGroupFull && eligible.length === 0 && (
//                         <p className='text-orange-500 text-sm mb-3'>
//                             No eligible users. All members may have won already or members are moved to next phase.
//                         </p>
//                     )}

//                     <button
//                         onClick={handleDraw}
//                         disabled={!isGroupFull || eligible.length === 0 || !cycleComplete || drawComplete}
//                         className='w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
//                     >
//                         Draw Token
//                     </button>
// {drawComplete && (
//   <button
//     onClick={() => {
//       nextPhase(selectedId);
//       setDrawComplete(false);
//       setWinner(null);
//     }}
//     className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
//   >
//     <svg
//       className="w-5 h-5"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M13 10V3L4 14h7v7l9-11h-7z"
//       />
//     </svg>
//     Move to Next Phase {selectedGroup?.currentPhase + 1}
//   </button>
// )}
//                     {winner && (
//                         <div className='mt-6 bg-green-50 border border-green-300 rounded-xl p-6 text-center'>
//                             <p className='text-4xl mb-2'>🎉</p>
//                             <h3 className='text-green-700 font-bold text-2xl mb-1'>{winner.name}</h3>
//                             <p className='text-gray-500 text-sm'>Lucky Winner!</p>
//                         </div>
//                     )}

//                     {allMembersWon && (
//                         <div className='mt-6 bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-center'>
//                             <p className='text-3xl mb-2'>🏆</p>
//                             <p className='text-yellow-600 font-bold text-lg'>Cycle Complete!</p>
//                             <p className='text-gray-400 text-sm'>All members have won</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </Layout>
//     )
// }

// export default TokenDraw


import React, { useState } from 'react'
import Layout from '../../components/common/Layout'
import { useAuth } from '../../context/AuthContext'

function TokenDraw() {
    const [selectedId, setSelectedId] = useState(null)
    const [winner, setWinner] = useState(null)
    const [allMembersWon, setAllMembersWon] = useState(false)
    const [drawComplete, setDrawComplete] = useState(false)
    const [isSpinning, setIsSpinning] = useState(false)

    const { users, user, groups, tokenDraw, nextPhase, isCycleComplete } = useAuth()

    const userGroups = groups.filter(g => g.createdBy == user.id)
    const selectedGroup = userGroups.find(g => g.id == selectedId)
    const groupMembers = users.filter(u => u.groupId == selectedId)
    const cycleComplete = selectedId ? isCycleComplete(selectedId) : false;

    const eligible = selectedId ? users.filter((u) => {
        if(u.groupId !== selectedId) return false;
        const phasePayment = u.payments.filter((p) => p.phaseNumber === selectedGroup.currentPhase)
        return phasePayment.length >= selectedGroup.cycleDays && !u.hasWon
    }) : []

    const isGroupFull = selectedGroup && groupMembers.length >= Number(selectedGroup.maxMembers);

    const handleDraw = () => {
        if(!selectedId || isSpinning) return
        setIsSpinning(true)
        setWinner(null)
        setAllMembersWon(false)

        setTimeout(() => {
            const result = tokenDraw(selectedId);
            if(!result){
                setAllMembersWon(true);
                setWinner(null)
            } else {
                setWinner(result);
                setAllMembersWon(false);
                setDrawComplete(true)
            }
            setIsSpinning(false)
        }, 1000)
    }

    return (
        <Layout>
            <div className='p-6'>
                <div className='bg-white shadow-2xl rounded-xl p-6 max-w-md mx-auto'>
                    <h2 className='text-blue-700 text-2xl font-bold mb-1'>Token Draw</h2>
                    <p className='text-gray-400 text-sm mb-6'>Select group and draw lucky winner</p>

                    <label className='text-gray-600 text-sm font-medium mb-1 block'>Select Group</label>
                    <select
                        value={selectedId || ''}
                        onChange={(e) => {
                            setSelectedId(Number(e.target.value))
                            setWinner(null)
                            setAllMembersWon(false)
                            setDrawComplete(false)
                        }}
                        className='w-full border border-gray-300 rounded-lg px-4 py-2 mb-4'
                    >
                        <option value=''>-- Select Group --</option>
                        {userGroups.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </select>

                    {selectedId && (
                        <div className='bg-blue-50 rounded-lg px-4 py-3 mb-4 flex justify-between'>
                            <p className='text-blue-600 font-medium text-sm'>Eligible: {eligible.length}</p>
                            <p className='text-blue-600 font-medium text-sm'>Members: {groupMembers.length} / {selectedGroup?.maxMembers}</p>
                        </div>
                    )}

                    {selectedId && !isGroupFull && (
                        <p className='text-red-500 text-sm mb-3'>
                            Group is not full yet — need {selectedGroup.maxMembers - groupMembers.length} more members
                        </p>
                    )}

                    {selectedId && isGroupFull && eligible.length === 0 && (
                        <p className='text-orange-500 text-sm mb-3'>
                            No eligible users. All members may have won already or members are moved to next phase.
                        </p>
                    )}

                    <button
                        onClick={handleDraw}
                        disabled={!isGroupFull || eligible.length === 0 || !cycleComplete || drawComplete || isSpinning}
                        className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200'
                    >
                        {isSpinning ? "Drawing..." : "Draw Token"}
                    </button>

                    {/* 🎨 Bada Colorful Spinner – Button ke neeche */}
                    {isSpinning && (
                        <div className='flex justify-center items-center mt-6'>
                            <div className='relative w-16 h-16'>
                                {/* Multiple colorful spinning rings */}
                                <div className='absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-green-500 border-b-yellow-500 border-l-red-500 animate-spin'></div>
                                <div className='absolute inset-2 rounded-full border-4 border-t-purple-500 border-r-pink-500 border-b-indigo-500 border-l-orange-500 animate-spin animation-delay-150' style={{ animationDuration: '0.8s' }}></div>
                                <div className='absolute inset-4 rounded-full border-4 border-t-cyan-500 border-r-teal-500 border-b-emerald-500 border-l-rose-500 animate-spin' style={{ animationDuration: '0.6s' }}></div>
                            </div>
                        </div>
                    )}

                    {drawComplete && (
                        <button
                            onClick={() => {
                                nextPhase(selectedId);
                                setDrawComplete(false);
                                setWinner(null);
                            }}
                            className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Move to Next Phase {selectedGroup?.currentPhase + 1}
                        </button>
                    )}

                    {winner && (
                        <div className='mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-xl p-6 text-center shadow-lg'>
                            <div className='text-5xl mb-2'>🏆</div>
                            <h3 className='text-green-700 font-bold text-2xl mb-1'>{winner.name}</h3>
                            <p className='text-gray-500 text-sm'>Lucky Winner!</p>
                        </div>
                    )}

                    {allMembersWon && (
                        <div className='mt-6 bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-center'>
                            <p className='text-3xl mb-2'>🏆</p>
                            <p className='text-yellow-600 font-bold text-lg'>Cycle Complete!</p>
                            <p className='text-gray-400 text-sm'>All members have won</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default TokenDraw









// import React, { useState } from 'react'
// import Layout from '../../components/common/Layout'
// import { useAuth } from '../../context/AuthContext'


// function TokenDraw() {

//     const [selectedId, setSelectedId] = useState(null)
//     const [winner, setWinner] = useState(null)
//     const [allMembersWon, setAllMembersWon] = useState(false)  // ✅ rename

//     const { users, user, groups, tokenDraw, isCycleComplete, getDaysPassed } = useAuth()

//     const userGroups = groups.filter(g => g.createdBy == user.id)
//     const selectedGroup = userGroups.find(g => g.id == selectedId)
//     const groupMembers = users.filter(u => u.groupId == selectedId)
//     const eligible = users.filter(
//         u => u.groupId == selectedId &&
//         (u.hasWon === false || u.hasWon === undefined)
//     )

//     const cycleComplete = isCycleComplete(selectedId)
//     const daysPassed = getDaysPassed(selectedId)

//     const isGroupFull =
//         selectedGroup &&
//         groupMembers.length >= Number(selectedGroup.maxMembers)

//     const handleDraw = () => {
//         if (!selectedId) return
//         const result = tokenDraw(selectedId)
//         if (!result) {
//             setAllMembersWon(true)   // ✅ rename
//             setWinner(null)
//         } else {
//             setWinner(result)
//             setAllMembersWon(false)  // ✅ rename
//         }
//     }

//     return (
//         <Layout>
//             <div className='p-6'>
//                 <div className='bg-white shadow-2xl rounded-xl p-6 max-w-md mx-auto'>

//                     <h2 className='text-blue-700 text-2xl font-bold mb-1'>Token Draw</h2>
//                     <p className='text-gray-400 text-sm mb-6'>Select group and draw lucky winner</p>

//                     <label className='text-gray-600 text-sm font-medium mb-1 block'>
//                         Select Group
//                     </label>

//                     <select
//                         value={selectedId || ''}
//                         onChange={(e) => setSelectedId(e.target.value)}
//                         className='w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400'
//                     >
//                         <option value=''>-- Select Group --</option>
//                         {userGroups.map((g) => (
//                             <option key={g.id} value={g.id}>{g.name}</option>
//                         ))}
//                     </select>

//                     {/* Members + Days info */}
//                     {selectedId && (
//                         <div className='bg-blue-50 rounded-lg px-4 py-3 mb-4'>
//                             <div className='flex justify-between mb-2'>
//                                 <p className='text-blue-600 font-medium text-sm'>
//                                     Eligible: {eligible.length}
//                                 </p>
//                                 <p className='text-blue-600 font-medium text-sm'>
//                                     Members: {groupMembers.length} / {Number(selectedGroup?.maxMembers)}
//                                 </p>
//                             </div>

//                             {/* ✅ Days progress */}
//                             <div className='border-t border-blue-100 pt-2 mt-1'>
//                                 <p className='text-blue-500 text-xs'>
//                                     Cycle Progress: {daysPassed} / {selectedGroup?.cycleDays} din
//                                 </p>
//                                 {!cycleComplete && (
//                                     <p className='text-blue-400 text-xs mt-0.5'>
//                                         {Number(selectedGroup?.cycleDays) - daysPassed} din baaki hain
//                                     </p>
//                                 )}
//                                 {cycleComplete && (
//                                     <p className='text-yellow-600 font-bold text-xs mt-0.5'>
//                                         ⚠️ Cycle Complete! — Token Draw karo
//                                     </p>
//                                 )}
//                             </div>
//                         </div>
//                     )}

//                     {/* Group not full warning */}
//                     {selectedId && !isGroupFull && (
//                         <p className='text-red-500 text-sm mb-3'>
//                             Group is not full yet — need {Number(selectedGroup?.maxMembers) - groupMembers.length} more members
//                         </p>
//                     )}

//                     {/* Cycle not complete warning */}
//                     {selectedId && isGroupFull && !cycleComplete && (
//                         <p className='text-orange-500 text-sm mb-3'>
//                             Cycle abhi complete nahi hua — {Number(selectedGroup?.cycleDays) - daysPassed} din baaki hain
//                         </p>
//                     )}

//                     {/* ✅ Dono conditions ek mein */}
//                     <button
//                         onClick={handleDraw}
//                         disabled={!isGroupFull || !cycleComplete}
//                         className='w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
//                     >
//                         🎲 Draw Token
//                     </button>

//                     {/* Winner */}
//                     {winner && (
//                         <div className='mt-6 bg-green-50 border border-green-300 rounded-xl p-6 text-center'>
//                             <p className='text-4xl mb-2'>🎉</p>
//                             <h3 className='text-green-700 font-bold text-2xl mb-1'>
//                                 {winner.name}
//                             </h3>
//                             <p className='text-gray-500 text-sm'>Lucky Winner!</p>
//                         </div>
//                     )}

//                     {/* All members won */}
//                     {allMembersWon && (
//                         <div className='mt-6 bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-center'>
//                             <p className='text-3xl mb-2'>🏆</p>
//                             <p className='text-yellow-600 font-bold text-lg'>Cycle Complete!</p>
//                             <p className='text-gray-400 text-sm'>All members have won</p>
//                         </div>
//                     )}

//                 </div>
//             </div>
//         </Layout>
//     )
// }
// export default TokenDraw;