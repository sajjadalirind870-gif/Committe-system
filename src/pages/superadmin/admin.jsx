import React, { useState } from 'react'
import Layout from '../../components/common/Layout'
import { useAuth } from '../../context/AuthContext'
import { FaSearch, FaTimes, FaTrash, FaBan, FaCheckCircle } from 'react-icons/fa'

function AdminManagement() {
  const { admins, addAdmin, deleteAdmin, blockAdmin } = useAuth()

  const [error, setError] = useState(null)
  const [adminData, setAdminData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  })
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setAdminData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newError = {}
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const strongPasswordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\\-_+={}\\[\\]|\\\\:;\"'<>,.?/])(?!.*\\s).{8,}$")

    if(adminData.name.trim() === '') newError.name = 'Name is required'
    if(adminData.email.trim() === '') newError.email = 'Email is required'
    else if(!emailRegex.test(adminData.email)) newError.email = 'Please enter a valid email'
    if(adminData.password.trim() === '') newError.password = 'Password is required'
    else if(adminData.password.length < 6) newError.password = 'Password must be at least 6 characters'
    else if(!strongPasswordRegex.test(adminData.password)) newError.password = 'Password must contain uppercase, lowercase, number and special character'
    if(adminData.confirmPassword.trim() === '') newError.confirmPassword = 'Please confirm your password'
    else if(adminData.confirmPassword !== adminData.password) newError.confirmPassword = 'Passwords do not match'

    if(Object.keys(newError).length > 0) { setError(newError); return }

    addAdmin({ name: adminData.name, email: adminData.email, password: adminData.password })
    setAdminData({ name: '', email: '', password: '', confirmPassword: '' })
    setIsOpen(false)
    setError(null)
  }

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(search.toLowerCase()) ||
    admin.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Layout>
      <div className='p-6 max-w-5xl mx-auto'>
        {/* Header with search and create button */}
        <div className='flex items-center justify-between mb-6 pt-4'>
          <div>
            <h2 className='text-2xl font-bold text-blue-900'>Admin Management</h2>
            <p className='text-gray-400 text-sm mt-1'>Total Admins: {admins.length}</p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs' />
              <input
                type='text'
                value={search}
                placeholder='Search admin...'
                onChange={(e) => setSearch(e.target.value)}
                className='pl-8 w-48 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300'
              />
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-xl shadow-md transition-all duration-200 flex items-center gap-2'
            >
              + Create Admin
            </button>
          </div>
        </div>

        {/* Admins Table Card */}
        <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
          <table className='w-full'>
            <thead>
              <tr className='bg-blue-900 text-white text-sm text-left'>
                <th className='py-4 px-5 font-medium'>Name</th>
                <th className='py-4 px-5 font-medium'>Email</th>
                <th className='py-4 px-5 font-medium'>Status</th>
                <th className='py-4 px-5 font-medium'>Actions</th>
             </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className='hover:bg-blue-50 transition-colors text-sm'>
                  <td className='py-4 px-5 font-medium text-gray-800'>{admin.name}</td>
                  <td className='py-4 px-5 text-gray-500'>{admin.email}</td>
                  <td className='py-4 px-5'>
                    {admin.status === 'active' ? (
                      <span className='bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full'>Active</span>
                    ) : (
                      <span className='bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full'>Blocked</span>
                    )}
                  </td>
                  <td className='py-4 px-5'>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => blockAdmin(admin.id)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1 ${
                          admin.status === 'active'
                            ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                        }`}
                      >
                        <FaBan className='text-xs' /> {admin.status === 'active' ? 'Block' : 'Unblock'}
                      </button>
                      <button
                        onClick={() => deleteAdmin(admin.id)}
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
          {filteredAdmins.length === 0 && (
            <div className='text-center py-16'>
              <p className='text-gray-400 text-sm'>No admins found</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Admin Modal */}
      {isOpen && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto'>
            <div className='flex items-center justify-between p-6 border-b border-gray-100'>
              <div>
                <h2 className='text-2xl font-bold text-blue-900'>Create New Admin</h2>
                <p className='text-gray-400 text-sm mt-1'>Enter admin account details</p>
              </div>
              <button onClick={() => setIsOpen(false)} className='text-gray-400 hover:text-gray-600'>
                <FaTimes size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className='p-6 space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                <input
                  type="text" name='name' value={adminData.name} onChange={handleChange}
                  placeholder='e.g., John Doe'
                  className='w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400'
                />
                {error?.name && <p className='text-red-500 text-sm mt-1'>{error.name}</p>}
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
                <input
                  type="email" name='email' value={adminData.email} onChange={handleChange}
                  placeholder='admin@example.com'
                  className='w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400'
                />
                {error?.email && <p className='text-red-500 text-sm mt-1'>{error.email}</p>}
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                <input
                  type="password" name='password' value={adminData.password} onChange={handleChange}
                  placeholder='At least 8 characters'
                  className='w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400'
                />
                {error?.password && <p className='text-red-500 text-sm mt-1'>{error.password}</p>}
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Confirm Password</label>
                <input
                  type="password" name='confirmPassword' value={adminData.confirmPassword} onChange={handleChange}
                  placeholder='Confirm password'
                  className='w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400'
                />
                {error?.confirmPassword && <p className='text-red-500 text-sm mt-1'>{error.confirmPassword}</p>}
              </div>
              <div className='flex items-center gap-3 pt-4'>
                <button type='button' onClick={() => setIsOpen(false)} className='flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 py-2.5 rounded-xl font-medium transition-all'>Cancel</button>
                <button type='submit' className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition-all shadow-md'>Create Admin</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default AdminManagement
