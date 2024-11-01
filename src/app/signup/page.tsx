"use client";
import React, { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    course: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = "Full name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid";
    }
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phoneNumber) {
      tempErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = "Phone number must be 10 digits";
    }
    if (!formData.course) tempErrors.course = "Course selection is required";
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
      // Submit form data to API or handle as needed
    }
  };

  return (
    <div className="flex items-center  min-h-screen bg-gray-100 bg-cover bg-center"
    style={{
      backgroundImage: "url('/registerbg.jpg')",
      backgroundPosition: 'center 30%',
    }}
    >

    <div className="flex-1"></div>  {/* Empty space on the left to move the form right */}

      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white bg-opacity-90 rounded-lg shadow-md mr-80 -mt-20">
        <h2 className="mb-6 text-2xl items-center text-center font-bold text-gray-800">Register for a Course</h2>
        
        <label className="block mb-2">
          
          <input
            type="text"
            placeholder='Full Name'
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </label>

        <label className="block mb-2">
          
          <input
            type="email"
            placeholder='Email'
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </label>

        <label className="block mb-2">
          
          <input
            type="text"
            placeholder='Phone Number'
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </label>

        <label className="block mb-2">
          
          <input
            type="password"
            placeholder='Password'
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </label>

        <label className="block mb-2">
          
          <input
            type="password"
            placeholder='Confirm Password'
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </label>

        <label className="block mb-4">
          
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Course</option>
            <option value="rob">Robotics</option>
            <option value="rob-ai">Robotics+AI</option>
            <option value="iot">IoT</option>
          </select>
          {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
        </label>

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
          Register
        </button>

        {submitted && <p className="mt-4 text-green-500 text-center">Registration successful!</p>}
      </form>
    </div>
  

  

  
    /////////
  );
}

export default Signup