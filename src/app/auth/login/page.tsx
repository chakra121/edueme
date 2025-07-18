"use client";
import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Invalid email format";

    if (!formData.password) tempErrors.password = "Password is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors])
      setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      setApiError(result.error || "Login failed. Please try again.");
      setIsSubmitting(false);
      return;
    }

    // Fetch session to get user role
 const res = await fetch("/api/auth/session");
    const session = (await res.json()) as { user?: { role?: string } };

    switch (session?.user?.role) {
      case "teacher":
        router.push("/dashboard/teacherDashboard/dHome");
        break;
      case "superadmin": // ✅ Corrected typo
        router.push("/dashboard/adminDashboard/dAnnounce");
        break;
      case "student":
      default:
        router.push("/dashboard/studentDashboard/dHome");
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
            Login to Edueme
          </h2>

          {apiError && (
            <div className="alert alert-error mb-4">
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label mb-1 text-md">
                <span className="label-text text-base-content">Email:</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input input-bordered w-full text-base-content ${errors.email ? "input-error" : ""}`}
              />
              {errors.email && (
                <span className="text-sm text-error">{errors.email}</span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label mb-1 text-md">
                <span className="label-text text-base-content">Password:</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`input w-full input-bordered text-base-content ${errors.password ? "input-error" : ""}`}
              />
              {errors.password && (
                <span className="text-sm text-error">{errors.password}</span>
              )}
              <div className="flex mt-2 justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="link link-info text-sm font-light"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="card-actions mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="mt-3 text-center text-sm text-base-content">
            Don&apos;t have an account?{" "}
            <a href="/auth/signup" className="link link-info font-medium">
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
