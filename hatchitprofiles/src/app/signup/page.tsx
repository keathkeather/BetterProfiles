'use client'

import { useState } from "react";
import { Button } from "primereact/button"; // PrimeReact Button
import { InputText } from "primereact/inputtext"; // PrimeReact InputText
import { Card } from "primereact/card"; // PrimeReact Card
import Link from "next/link";
import { sign_up } from "../util/signup";
import { useRouter } from "next/navigation";


export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { _USERNAME: username, _EMAIL: email, _PASSWORD: password };
    const result = await sign_up(data);
    if (result.success) {
      router.push('/login');
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
      <Card
        title="Create your account"
        className="w-full max-w-md"
        style={{ width: "100%", maxWidth: "400px", padding: "20px" }}
      >
        <form onSubmit={handleSubmit} className="p-fluid space-y-6">
          {/* Full Name Input */}
          <div className="p-field">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
              style={{ marginBottom: "0.25rem" }}
            >
              Full Name
            </label>
            <InputText
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ marginTop: "0.25rem", width: "100%" }}
            />
          </div>

          {/* Email Input */}
          <div className="p-field">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
              style={{ marginBottom: "0.25rem" }}
            >
              Email address
            </label>
            <InputText
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ marginTop: "0.25rem", width: "100%" }}
            />
          </div>

          {/* Password Input */}
          <div className="p-field">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
              style={{ marginBottom: "0.25rem" }}
            >
              Password
            </label>
            <InputText
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ marginTop: "0.25rem", width: "100%" }}
            />
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            label="Sign up"
            className="p-button-rounded p-button-primary"
            style={{
              width: "100%",
              padding: "0.75rem", // Equivalent to py-3
              fontSize: "1rem", // Equivalent to text-base
              fontWeight: "600", // Equivalent to font-medium
              marginTop: "1rem", // Spacing between inputs and button
              backgroundColor: "#FA7422", 
              borderColor: "#FA7422", 
            }}
          />
        </form>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            fontSize: "0.875rem", // Equivalent to text-sm
            color: "#6b7280", // Tailwind's text-gray-600 equivalent
            marginTop: "1.5rem",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              fontWeight: "500", // Equivalent to font-medium
              color: "#FA7422", // Tailwind's text-blue-600 equivalent
              textDecoration: "none",
            }}
          >
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
}
