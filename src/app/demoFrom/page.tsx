"use client";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

const DemoForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    grade: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data: { message: string; success: boolean } =
        (await response.json()) as { message: string; success: boolean };
      setLoading(false);

      if (data.success) {
        alert("Registration saved successfully");
        setFormData({ name: "", phoneNumber: "", email: "", grade: "" });
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong! Please try again later.");
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="flex w-1/2 flex-col items-center justify-center bg-slate-900 p-8 text-white">
          <Image
            width={200}
            height={200}
            className="h-80 w-auto"
            src="/demoimg.png"
            alt="Demo"
          />
          <div className="text-left">
            <h1 className="mb-2 text-2xl font-bold">One step</h1>
            <h1 className="mb-2 text-2xl font-bold">Ahead towards your</h1>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-fuchsia-500">Robotics</h1>
              <h1 className="text-2xl font-bold">Journey...</h1>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center bg-white p-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Book a Free Demo Now!
          </h2>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mb-4 w-full rounded border bg-white p-3 text-black placeholder-gray-500"
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Mobile Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="mb-4 w-full rounded border bg-white p-3 text-black placeholder-gray-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mb-4 w-full rounded border bg-white p-3 text-black placeholder-gray-500"
            />
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
              className="mb-4 w-full rounded border bg-white p-3 text-black placeholder-gray-500"
            >
              <option value="" disabled>
                Select Grade
              </option>
              <option value="2-3">2-3</option>
              <option value="4-5">4-5</option>
              <option value="6-7">6-7</option>
              <option value="8-9">8-9</option>
              <option value="10-12">10-12</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-blue-500 p-3 text-white"
            >
              {loading ? "Submitting..." : "Register"}
            </button>
            {error && (
              <p className="mt-4 text-center text-red-500">
                <CloseIcon />
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DemoForm;
