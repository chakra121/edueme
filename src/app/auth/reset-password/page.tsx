// app/auth/reset-password/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsTokenValid(false);
        setError("Invalid or missing reset token");
        return;
      }

      try {
        const response = await fetch(
          `/api/auth/verify-reset-token?token=${token}`,
        );
        interface VerifyTokenResponse {
          message?: string;
        }
        const data = await response.json() as VerifyTokenResponse;

        if (!response.ok) {
          throw new Error(data.message ?? "Invalid token");
        }

        setIsTokenValid(true);
      } catch (error) {
        setIsTokenValid(false);
        setError((error as Error).message || "Invalid or expired token");
      }
    };

    void verifyToken();
  }, [token]);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setError(null);
  };

  const validate = () => {
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
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
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Something went wrong");
      }

      setSuccess("Password has been reset successfully");
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (error) {
      setError((error as Error).message ?? "Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isTokenValid === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4">Verifying reset token...</p>
        </div>
      </div>
    );
  }

  if (isTokenValid === false) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/loginbg.jpeg')",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4 text-2xl font-bold text-base-content">
              Invalid Reset Link
            </h2>
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
            <p className="mb-4">
              The password reset link is invalid or has expired.
            </p>
            <Link
              href="/auth/forgot-password"
              className="btn btn-primary w-full"
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            Reset Password
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
                <span className="label-text text-base-content">
                  New Password:
                </span>
              </label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={`input input-bordered text-base-content ${
                  error && !password ? "input-error" : ""
                }`}
                placeholder="Enter new password"
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-base-content">
                  Confirm Password:
                </span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`input input-bordered text-base-content ${
                  error && password !== confirmPassword ? "input-error" : ""
                }`}
                placeholder="Confirm new password"
              />
            </div>

            <div className="card-actions mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Set New Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
