
import { useAuth } from "../../context/AuthContext";
import { NavLink, Routes, Route } from "react-router-dom";



const SideBar = ({ toggle, isOpen }) => {
  ;
    const { user } = useAuth();



 

    const links =
        user?.role === 'superadmin' ? [
            { name: 'Dashboard', path: '/superadmindashboard' },
            { name: 'Admins', path: '/superadmin/admins' },
            { name: 'All Users', path: '/superadmin/users' },
        ]
        : user?.role === 'admin' ? [
             { name: 'Dashboard', path: '/admindashboard' },
    { name: 'Groups', path: '/admin/groups' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Token Draw', path: '/admin/tokendraw' },
    { name: 'Payments', path: '/admin/payments' },
        ]
        : [
            { name: 'Dashboard', path: '/userdashboard'  },
            { name: 'Payment', path: '/user/payment' },
            { name: 'History', path: '/user/history' },
        ];
 
    return (
        <>
         

            {/* Sidebar */}
            <div className={`fixed flex flex-col top-0 left-0 bg-blue-900 h-full w-64 z-50 
                            transition-transform duration-300 shadow-xl
                            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-blue-800">
                    <div>
                        <h2 className="text-white font-semibold">
                            {user?.name || 'Guest'}
                        </h2>
                        <p className="text-blue-300 text-sm capitalize">
                            {user?.role}
                        </p>
                    </div>
                    <button onClick={toggle} className="text-white text-xl">✕</button>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-1 p-4 flex-1">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={toggle}
                            className={({ isActive }) =>
                                `p-3 rounded-lg block transition
                                ${isActive ? 'bg-white text-blue-900 font-bold' : 'text-white hover:bg-blue-700'}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

             
          
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={toggle}
                />
            )}
        </>
    );
};

export default SideBar;