import { useEffect, useState } from "react";
import Button from "../app/UIComponents/Button";
import InputWithLabel from "../app/UIComponents/InputWithLabel";
import {  useNavigate } from "react-router-dom";

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect( () => {
    handleLoginCheck();
  }, [])

  const handleLoginCheck = async () => {
      
    const res = await fetch('/api/users');
    const json = await res.json();
   
    if (res.status === 200) {
      switch(json.role) {
        case 'admin':
          window.location.href = '/admin';
          break;
        case 'client':
          window.location.href = '/client';
          break;
        case 'vendor':
          window.location.href = '/vendor';
          break;
        case 'undefined':
          break;
        default:
          throw new Error("Unknown user role when trying to login.");
      }
    }
  }


  // [TODO] move to API
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