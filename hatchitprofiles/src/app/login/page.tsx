"use client"
import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { log_in } from "../util/login";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchUserData } from "../store/userslice";
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { _EMAIL: email, _PASSWORD: password };
    console.log('handleSubmit called with data:', data);
    const result = await log_in(data);
    console.log('log_in result:', result);
    if (result.success) {
      const token = Cookies.get('token');
      if(token){
        dispatch(fetchUserData(token));
      }
      
      router.push('/'); // Navigate to dashboard on successful login
    } else {
      setError(result.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4", // Light gray background
      }}
    >
      {/* Card Component */}
      <Card
        title="Log in to your account"
        className="w-full max-w-md"
        style={{ width: "100%", maxWidth: "400px", padding: "20px" }}
      >
        <form onSubmit={handleSubmit} className="p-fluid">
          {/* Email Input */}
          <div className="p-field space-y-6">
            <label htmlFor="email" className="mt-1 block text-sm font-medium text-gray-700">
              Email address
            </label>
            <InputText
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="p-field">
            <label htmlFor="password" className="mt-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <InputText
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Log In Button */}
          <Button
            type="submit"
            label="Log In"
            className="mt-3 p-button-rounded p-button-primary p-mt-3"
            style={{ width: "100%", backgroundColor:"#FA7422", borderColor:"#FA7422" }}
      
          />
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Footer */}
        <p className="p-text-center p-mt-3">
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#FA7422", textDecoration: "none" }}>
            Sign up
          </a>
        </p>
      </Card>
    </div>
  );
}