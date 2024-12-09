"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  course: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  course?: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    course: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const validate = (): boolean => {
    let tempErrors: FormErrors = {};
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      // Submit form data to API or handle as needed
    }
  };

  return (
    <div
      className="flex min-h-screen items-center bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: "url('/registerbg.jpg')",
        backgroundPosition: "center 30%",
      }}
    >
      <div className="flex-1"></div>{" "}
      {/* Empty space on the left to move the form right */}
      <form
        onSubmit={handleSubmit}
        className="-mt-20 mr-80 w-full max-w-md rounded-lg bg-white bg-opacity-90 p-6 shadow-md"
      >
        <h2 className="mb-6 items-center text-center text-2xl font-bold text-gray-800">
          Register for a Course
        </h2>

        <label className="mb-2 block">
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName}</p>
          )}
        </label>

        <label className="mb-2 block">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </label>

        <label className="mb-2 block">
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber}</p>
          )}
        </label>

        <label className="mb-2 block">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </label>

        <label className="mb-2 block">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </label>

        <label className="mb-4 block">
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
          {errors.course && (
            <p className="text-sm text-red-500">{errors.course}</p>
          )}
        </label>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          Register
        </button>

        {submitted && (
          <p className="mt-4 text-center text-green-500">
            Registration successful!
          </p>
        )}
      </form>
    </div>
  );
};

export default Signup;
