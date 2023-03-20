import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {

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
  }

  useEffect( () => {
    handleLogout();
  });
  
  return (
    <p>Logging out...</p>
  )
}