import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const superAdmin = { 
        email: 'Sajjadalirind870@gmail.com', 
        name: 'Sajjad Ali', 
        password: 'Sajjadali12%', 
        role: 'superadmin' 
    }

    const { login, admins, users } = useAuth();

    const handlelogin = () => {
       
        if(email === superAdmin.email && password === superAdmin.password) {
            login(superAdmin);
            navigate('/superadmindashboard');
            return
        }

        const foundAdmin = admins.find((admin) => admin.email === email && admin.password === password)
        if(foundAdmin) {
            if(foundAdmin.status === 'blocked') {
                setError('Your account has been blocked. Please contact the administrator.')
                return;
            }
            login({...foundAdmin, role:'admin'})
            navigate('/admindashboard');
            return
        }

        const foundUser = users.find((u) => u.email === email && u.password === password)
        if(foundUser) {
            if(foundUser.status === 'blocked') {
                setError('Your account has been blocked. Please contact the administrator.')
                return;
            }
            login({...foundUser, role:'user'})
            navigate('/userdashboard');
            return
        }

        setError('Invalid email or password');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white w-full rounded-2xl shadow-lg max-w-md p-8">
                
             
                <div className="text-center mb-8">
                    <h1 className="text-blue-600 text-3xl font-bold mb-2">ChitFund Pro</h1>
                    <p className="text-gray-400 text-sm">Login to your account</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1 font-medium text-sm">Email Address</label>
                    <input 
                        type="email" 
                        value={email} 
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1 font-medium text-sm">Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-2 rounded-lg mb-4">
                        {error}
                    </div>
                )}

              
                <button 
                    onClick={handlelogin} 
                    className="w-full bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-white mt-2"
                >
                    Login
                </button>

            </div>
        </div>
    )
}

export default Login