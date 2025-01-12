"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

// Define interfaces for form data and errors
interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  userRole: string;
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

interface LoginResponse {
  success: boolean;
  token: string;
  message?: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    course: "",
    userRole: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Validation Function
  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!formData.fullName) tempErrors.fullName = "Full name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid";
    }
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";
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

  // Handle Input Change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);
    if (validate()) {
      setLoading(true);
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            grade: formData.course,
          }),
        });

        const result = await response.json() as LoginResponse;

        if (response.ok && result.success) {
          setSubmitted(true);
        } else {
          setApiError(result.message ?? "Registration failed.");
        }
      } catch (error) {
        console.error("Error:", error);
        setApiError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: "url('/registerbg.jpg')",
        backgroundPosition: "center 30%",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="mx-[1rem] w-full max-w-md rounded-lg bg-white bg-opacity-90 p-6 text-black shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Register for a Course
        </h2>

        <label className="mb-2 block">
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-4 text-black focus:ring-2 focus:ring-blue-500"
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
            className="w-full rounded border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500"
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
            className="w-full rounded border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500"
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
            className="w-full rounded border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500"
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
            className="w-full rounded border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500"
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
            className="w-full rounded border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Course</option>
            <option value="Robotics">Robotics</option>
            <option value="Robotics+AI">Robotics+AI</option>
            <option value="IoT">IoT</option>
          </select>
          {errors.course && (
            <p className="text-sm text-red-500">{errors.course}</p>
          )}
        </label>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="font-medium text-blue-500 hover:underline"
          >
            Login
          </a>
        </p>

        <button
          type="submit"
          className={`w-full rounded-md bg-blue-500 py-2 text-white ${
            loading ? "cursor-not-allowed opacity-70" : "hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {apiError && (
          <p className="mt-4 text-center text-red-500">{apiError}</p>
        )}

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
