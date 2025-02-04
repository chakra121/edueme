"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  grade: string;
  schoolName: string;
  phoneNumber: string;
  email: string;
  parentEmail: string;
  password: string;
  confirmPassword: string;
  userRole: string;
}

interface FormErrors {
  [key: string]: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    gender: "",
    grade: "",
    schoolName: "",
    phoneNumber: "",
    email: "",
    parentEmail: "",
    password: "",
    confirmPassword: "",
    userRole: "student",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: FormErrors = {};

    if (stepNumber === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.grade) newErrors.grade = "Grade is required";
      if (!formData.schoolName)
        newErrors.schoolName = "School name is required";
    } else if (stepNumber === 2) {
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Invalid phone number (10 digits required)";
      }

      const emailRegex = /\S+@\S+\.\S+/;
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }

      if (!formData.parentEmail) {
        newErrors.parentEmail = "Parent's email is required";
      } else if (!emailRegex.test(formData.parentEmail)) {
        newErrors.parentEmail = "Invalid parent email format";
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (validateStep(1)) setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };
  // ------------------------------------------------------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateStep(2)) {
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Registration successful:", result);
          setSubmitted(true);
        } else {
          console.error("Registration failed:", result.message);
          // Handle error display
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };
  // ------------------------------------------------------------
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center pb-[5rem] pt-[6rem]"
      style={{
        backgroundImage: "url('/registerbg.jpg')",
        backgroundPosition: "center 30%",
      }}
    >
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          {submitted ? (
            <div className="alert">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-info"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span className="text-base font-semibold text-base-content">
                Registration Successful!
                <br />
                <a href="/auth/login" className="link link-info font-medium">
                  Login
                </a>{" "}
                to Continue
                <br />
                Happy Learning 😊
              </span>
            </div>
          ) : (
            <form onSubmit={step === 1 ? handleNext : handleSubmit}>
              {step === 1 && (
                <>
                  <h2 className="card-title mb-4 text-2xl font-bold text-base-content">
                    Register to Edueme
                  </h2>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">
                        First Name:
                      </span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`input input-bordered text-base-content ${errors.firstName ? "input-error" : ""}`}
                    />
                    {errors.firstName && (
                      <span className="text-sm text-error">
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Last Name:
                      </span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`input input-bordered text-base-content ${errors.lastName ? "input-error" : ""}`}
                    />
                    {errors.lastName && (
                      <span className="text-sm text-error">
                        {errors.lastName}
                      </span>
                    )}
                  </div>

                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Gender:
                      </span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`select select-bordered text-base-content ${errors.gender ? "select-error" : ""}`}
                    >
                      <option disabled value="">
                        Select Gender
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    {errors.gender && (
                      <span className="text-sm text-error">
                        {errors.gender}
                      </span>
                    )}
                  </div>

                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Grade:
                      </span>
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className={`select select-bordered text-base-content ${errors.grade ? "select-error" : ""}`}
                    >
                      <option disabled value="">
                        Select Grade
                      </option>
                      <option>2 to 3</option>
                      <option>4 to 5</option>
                      <option>6 to 7</option>
                      <option>8 to 9</option>
                      <option>10 to 12</option>
                    </select>
                    {errors.grade && (
                      <span className="text-sm text-error">{errors.grade}</span>
                    )}
                  </div>

                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text text-base-content">
                        School Name:
                      </span>
                    </label>
                    <input
                      type="text"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      className={`input input-bordered text-base-content ${errors.schoolName ? "input-error" : ""}`}
                    />
                    {errors.schoolName && (
                      <span className="text-sm text-error">
                        {errors.schoolName}
                      </span>
                    )}
                  </div>

                  <div className="card-actions mt-6 justify-end">
                    <button type="submit" className="btn btn-primary w-full">
                      Continue
                    </button>
                  </div>
                  <p className="mt-3 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                      href="/auth/login"
                      className="link link-info font-medium"
                    >
                      Login
                    </a>
                  </p>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="card-title mb-4 text-2xl font-bold text-base-content">
                    Register to Edueme
                  </h2>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Phone Number:
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`input input-bordered text-base-content ${errors.phoneNumber ? "input-error" : ""}`}
                    />
                    {errors.phoneNumber && (
                      <span className="text-sm text-error">
                        {errors.phoneNumber}
                      </span>
                    )}
                  </div>

                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Email:
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input input-bordered text-base-content ${errors.email ? "input-error" : ""}`}
                    />
                    {errors.email && (
                      <span className="text-sm text-error">{errors.email}</span>
                    )}
                  </div>

                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Parent's Email:
                      </span>
                    </label>
                    <input
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      className={`input input-bordered text-base-content ${errors.parentEmail ? "input-error" : ""}`}
                    />
                    {errors.parentEmail && (
                      <span className="text-sm text-error">
                        {errors.parentEmail}
                      </span>
                    )}
                  </div>

                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Password:
                      </span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`input input-bordered text-base-content ${errors.password ? "input-error" : ""}`}
                    />
                    {errors.password && (
                      <span className="text-sm text-error">
                        {errors.password}
                      </span>
                    )}
                  </div>

                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Confirm Password:
                      </span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`input input-bordered text-base-content ${errors.confirmPassword ? "input-error" : ""}`}
                    />
                    {errors.confirmPassword && (
                      <span className="text-sm text-error">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>

                  <div className="card-actions mt-6 justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn btn-neutral"
                    >
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                  <p className="mt-3 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                      href="/auth/login"
                      className="link link-info font-medium"
                    >
                      Login
                    </a>
                  </p>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
