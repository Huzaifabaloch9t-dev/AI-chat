"use client";
import { signup } from "../../services/authService";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow w-80">
        <h1 className="text-xl mb-4">Signup</h1>

        <input className="border p-2 w-full mb-2" placeholder="Name" onChange={(e)=>setName(e.target.value)} />
        <input className="border p-2 w-full mb-2" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input className="border p-2 w-full mb-2" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={()=>signup(name,email,password)} className="bg-green-600 text-white w-full py-2">
          Signup
        </button>
      </div>
    </div>
  );
}
