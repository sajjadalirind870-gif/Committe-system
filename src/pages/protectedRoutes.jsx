import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

const {user} = useAuth();


if(user === null){
    return <Navigate to ='/'/>
}

return children;
    
}






export default ProtectedRoute;