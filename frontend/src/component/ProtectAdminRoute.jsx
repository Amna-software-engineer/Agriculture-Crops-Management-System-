import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"; 
import { jwtDecode } from "jwt-decode";

export const ProtectAdminRoute = ({ children }) => {
    const [isAllowed, setIsAllowed] = useState(null); 
    const accessToken = localStorage.getItem("accessToken");


useEffect(() => {
    if (accessToken) {
           
            const decodedToken = jwtDecode(accessToken);                
                if (decodedToken.role === "admin") {
                    setIsAllowed(true);
                } else {
                    setIsAllowed(false);
                }
          
        } else {
            setIsAllowed(false);
        }
    }, [accessToken]);
    
    if (isAllowed === null) 
      {return <div>Checking Authorization...</div>}  

    return isAllowed ? children : <Navigate to="/login" />
}