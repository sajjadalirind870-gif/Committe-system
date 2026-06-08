import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";




const Navbar = ({toggle}) => {
 const { logout} = useAuth();
 const navigate = useNavigate();

 const handlelogout = () => {
    logout();
    navigate('/');
 }
 return (
    <nav className="flex items-center justify-between bg-blue-900 text-white p-8 shadow-md fixed inset-0 z-30 h-16 ">
       
        <div className="flex items-center gap-4">
                        <button onClick={toggle} className="text-2xl "> ☰</button>
            <h4 className="text-white text-xl font-medium">ChitFund Laxmi </h4>
        </div>


     

        <div className="flex gap-4 items-center">

        <button onClick={handlelogout} className="text-white bg-red-600 px-2 py-2 md:px-6   rounded-lg ">logout</button>

        </div>
    </nav>
 )
}

export default Navbar