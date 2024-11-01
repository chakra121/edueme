"use client";
import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid";
    }
    if (!formData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      // Handle login API or functionality here
    }
  };

  return (
    <div
      className="flex items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/loginbg.jpeg')",
      }}
    >
      <div className="flex-1"></div> {/* Empty space on the left */}

      <div className="w-full max-w-md p-6 bg-white bg-opacity-90 rounded-lg shadow-md mr-20 -mt-10">
        <h2 className="text-2xl text-center font-bold mb-4 text-gray-800">Login</h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            <p></p>
            <input
              type="email"
              name="email"
              placeholder='Enter Email'
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </label>

          <label className="block mb-4">
            
            <input
              type="password"
              name="password"
              placeholder='Enter password'
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </label>

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
            Login
          </button>

          {submitted && <p className="mt-4 text-green-500 text-center">Login successful!</p>}
        </form>
      </div>
    </div>
  );
}




export default Login