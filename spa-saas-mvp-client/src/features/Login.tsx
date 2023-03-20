import { useState } from "react";
import Button from "../app/UIComponents/Button";
import InputWithLabel from "../app/UIComponents/InputWithLabel";
import { useOutletContext, useNavigate } from "react-router-dom";
import { IsAuthContextType } from "../App";
import { useAsync } from "../utilities/customHooks";
import { getLoggedInRole as getUserLoggedInRole } from "../utilities/api";
import LoadingIndicator from "../app/UIComponents/LoadingIndicator";
import ErrorIndicator from "../app/UIComponents/ErrorIndicator";

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [ isAuthenticated, setIsAuthenticated ] = useOutletContext<IsAuthContextType>();

  const userLoginAsync = useAsync(() => getUserLoggedInRole(), []);

  if ( userLoginAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( userLoginAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  setIsAuthenticated(true);
  const loggedInRoleValue = userLoginAsync.value;

  const loggedInRole = () => {
    switch(loggedInRoleValue) {
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

  loggedInRole();

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