import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IsAuthContextType } from "../App";

export default function Logout() {

  const [ _isAuthenticated, setIsAuthenticated ] = useOutletContext<IsAuthContextType>();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    const response = await fetch('/api/users/logout', { method: 'delete' });
    
    if (response.status !== 200) {
      throw new Error("/api/users/logout returned HTTP status code: " + response.status);
    }
  
    const result = await response.json();
  
    if (result.redirect) {
      navigate(result.redirect)
    }
  
    setIsAuthenticated(false);
  }

  useEffect( () => {
    handleLogout();
  });
  
  return (
    <p>Logging out...</p>
  )
}