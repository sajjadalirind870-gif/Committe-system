import React from 'react'
import AdminDashboard from './pages/admin/AdminDashboard'
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard'
import UserDashboard from './pages/user/UserDashboard'
import Login from './pages/Login'
import ProtectedRoute from './pages/protectedRoutes'
import { BrowserRouter , Router, Routes, Route } from 'react-router-dom'
import GroupManagement from './pages/admin/GroupManagement'
import User from './pages/admin/User'
import AdminManagement from './pages/superadmin/admin'
import AllUsers from './pages/superadmin/allUsers'
import MakePayment from './pages/user/Payment'
import History from './pages/user/History'
import TokenDraw from './pages/admin/TokenDraw'
import Payments from './pages/admin/Payments'






function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Login/>}/>
        <Route path='/userdashboard' element={<ProtectedRoute><UserDashboard/></ProtectedRoute>}/>
        <Route path='/admindashboard' element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}/>
        <Route path='/superadmindashboard' element={<ProtectedRoute><SuperAdminDashboard/></ProtectedRoute>}/>
        <Route path='/admin/groups' element={
  <ProtectedRoute>
    <GroupManagement />
  </ProtectedRoute>
} />
<Route path='/admin/users' element ={<ProtectedRoute>
  <User/>
</ProtectedRoute>}/>


<Route path='/admin/tokendraw' element ={<ProtectedRoute>
  <TokenDraw/>
</ProtectedRoute>}/>

  <Route path = '/superadmin/admins' element ={<ProtectedRoute>
    <AdminManagement/>
  </ProtectedRoute>}/>

     <Route path = '/superadmin/users' element ={<ProtectedRoute>
    <AllUsers/>
  </ProtectedRoute>}/>


      <Route path = '/user/payment' element ={<ProtectedRoute>
    <MakePayment/>
  </ProtectedRoute>}/>

   <Route path = '/user/history' element ={<ProtectedRoute>
    <History/>
  </ProtectedRoute>}/>


   <Route path = '/admin/payments' element ={<ProtectedRoute>
    <Payments/>
  </ProtectedRoute>}/>

  


      </Routes>

   
   
    </BrowserRouter>
     

    </div>
  )
}

export default App
