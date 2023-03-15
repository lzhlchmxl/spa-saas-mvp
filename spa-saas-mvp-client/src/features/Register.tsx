import { useState } from "react";
import Button from "../app/UIComponents/Button";
import InputWithLabel from "../app/UIComponents/InputWithLabel";
import SelectWithLabel from "../app/UIComponents/SelectWithLabel";
import { createAccount } from "../utilities/api";
import * as T from "../utilities/types";

export default function Register() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [role, setRole] = useState('client');

  const handleTryRegister = async () => {

    if (password.length < 8) {
      window.alert("Password need to be at least 8 characters");
      throw new Error("Password need to be at least 8 characters");
    }

    if (password !== rePassword) {
      window.alert("Passwords do not match");
      throw new Error("Passwords do not match");
    }

    // [TODO] use a cleaner way to handle the type error on user role
    if (role !== 'client' && role !== 'vendor') {
      throw new Error('') 
    }

    const newUser: T.User = {
      username,
      password,
      role,
    }

    const statusCode = await createAccount(newUser);

    if (statusCode === 400) {
      window.alert("Username already exists");
      throw new Error("Username already exists");
    }

    if (statusCode === 200) {
      window.alert("Registeration sucessful, redirecting to dashboard...");
      window.location.href = `/${newUser.role}`
    } else {
      window.alert("Registeration failed.");
    }
  }

  return (
    <div className="flex flex-col">
      <InputWithLabel 
        label="username" 
        name="user-name"
        type="text"
        value={username} 
        setValue={setUsername}        
      />
      <InputWithLabel 
        label="password" 
        name="password"
        type="text"
        value={password} 
        setValue={setPassword}        
      />
      <InputWithLabel 
        label="re-password" 
        name="re-password"
        type="text"
        value={rePassword} 
        setValue={setRePassword}        
      />
      <SelectWithLabel 
        label="role selection" 
        name="role-selection"
        selections={[{ value: 'client', text: 'client' }, { value: 'vendor', text: 'vendor' }]} 
        selected={role} 
        setSelected={setRole}      
      />
      <div className="mt-5 self-center">
        <Button 
          actionType={"primary"} 
          actionText="REGISTER"
          actionHandler={handleTryRegister}      
        />
      </div>
    </div>
  )
}