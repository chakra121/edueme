"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Define interfaces for form data and errors
interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  message?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // Validation Function
  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle Input Change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setApiError(null);

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = (await response.json()) as LoginResponse;

        if (response.ok && result.success) {
          setSubmitted(true);
          localStorage.setItem("token", result.token); // Store JWT Token
          router.push("/dashboard/studentDashboard/dhome");
        } else {
          setApiError(result.message ?? "Login failed");
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
      className="flex min-h-screen justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/loginbg.jpeg')" }}
    >
      <div className="px-[1rem] py-[2rem] mx-[1rem] w-full max-w-md rounded-lg bg-white bg-opacity-90 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="text-black flex flex-col">
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

          <p className="text-center text-sm text-gray-600">
          Dont have an account?{" "}
          <a
            href="/auth/signup"
            className="font-medium text-blue-500 hover:underline"
          >
            Signup
          </a>
        </p>

          <button
            type="submit"
            className={`w-full rounded-md bg-blue-500 py-2 text-white ${
              loading ? "cursor-not-allowed opacity-70" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {apiError && (
            <p className="mt-4 text-center text-red-500">{apiError}</p>
          )}

          {submitted && (
            <p className="mt-4 text-center text-green-500">
              Login successful! Redirecting...
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
