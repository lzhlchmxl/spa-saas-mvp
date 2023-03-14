import { useState } from "react";
import InputWithLabel from "../app/UIComponents/InputWithLabel";

export default function Register() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <InputWithLabel 
      label="Username" 
      name="username"
      type="text"
      value={undefined} 
      setValue={function (value: unknown): void {
      throw new Error("Function not implemented.");
    } }        
    />
  )
}