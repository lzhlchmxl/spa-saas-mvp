import { useState } from "react";
import Button from "../app/UIComponents/Button";
import InputWithLabel from "../app/UIComponents/InputWithLabel";
import { useOutletContext, useNavigate } from "react-router-dom";
import { IsAuthContextType } from "../App";

export default function Login() {

  const [ isAuthenticated, setIsAuthenticated ] = useOutletContext<IsAuthContextType>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <p>You are already logged in</p>
  }

  const handleLogin = async () => {

    const params = {
      username,
      password
    }

    const requestOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    }
    
    const response = await fetch('/api/users/login', requestOptions);
  
    if (response.status !== 200) {
      throw new Error("/api/users/login returned HTTP status code: " + response.status);
    }

    const result = await response.json();

    if (result.redirect) {
      navigate(result.redirect)
    }
  
    setIsAuthenticated(true);
    
  }
  
  return (
    <div
      className="w-[500px]"
    >
      <InputWithLabel 
        label="Username"
        name="username"
        type="text"
        value={username} 
        setValue={setUsername} 
      />
      <InputWithLabel 
        label="Password"
        name="password"
        type="text"
        value={password} 
        setValue={setPassword} 
      />
      <Button 
        actionType="primary" 
        actionText="Login" 
        actionHandler={handleLogin} 
      />
    </div>
  )
}