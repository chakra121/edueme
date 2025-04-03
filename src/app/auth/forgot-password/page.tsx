// app/auth/forgot-password/page.tsx
"use client";
import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  const validate = () => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      interface ForgotPasswordResponse {
        message?: string;
      }
      const data = (await response.json()) as ForgotPasswordResponse;

      if (!response.ok) {
        throw new Error(data.message ?? "Something went wrong");
      }

      setSuccess("Password reset link has been sent to your email");
      setEmail("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send reset email. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center pb-[5rem] pt-[6rem]"
      style={{
        backgroundImage: "url('/loginbg.jpeg')",
        backgroundPosition: "center 30%",
      }}
    >
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4 text-2xl font-bold text-base-content">
            Forgot Password
          </h2>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success mb-4">
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Email:</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={handleChange}
                className={`input input-bordered text-base-content ${
                  error ? "input-error" : ""
                }`}
                placeholder="Enter your email"
              />
              {error && <span className="text-sm text-error">{error}</span>}
            </div>

            <div className="card-actions mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Reset Password"}
              </button>
            </div>
          </form>

          <p className="mt-3 text-center text-sm text-base-content">
            Remember your password?{" "}
            <Link href="/auth/login" className="link link-info font-medium">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
