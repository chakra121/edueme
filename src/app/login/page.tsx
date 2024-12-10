"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

// Define interfaces for the form data and errors
interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid";
    }
    if (!formData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      // Handle login API or functionality here
    }
  };

  return (
    <div
      className="flex min-h-screen items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/loginbg.jpeg')",
      }}
    >
      <div className="flex-1"></div> {/* Empty space on the left */}
      <div className="-mt-10 mr-20 w-full max-w-md rounded-lg bg-white bg-opacity-90 p-6 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="mb-2 block">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </label>

          <label className="mb-4 block">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            Login
          </button>

          {submitted && (
            <p className="mt-4 text-center text-green-500">Login successful!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
