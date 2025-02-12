"use client";

import { useState, useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showIcons, setShowIcons] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.name) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.subject) {
      newErrors.subject = "Subject is required.";
    }

    if (!formData.message) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Form submission logic here
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Clear errors after submission
      setErrors({});
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const feather = require("feather-icons");
  //     feather.replace();
  //   }
  // }, [showIcons]);

  return (
    <div
      className="flex min-h-screen flex-col items-center gap-[1rem] bg-cover bg-center px-[1rem] pt-[6rem] lg:flex-row lg:justify-between lg:px-[20%]"
      style={{
        backgroundImage: "url('/contactbg.png')",
      }}
    >
      {/* Form Card */}
      <div
        className="w-full max-w-md rounded-lg bg-gray-500 p-6 shadow-md backdrop-blur-3xl lg:max-w-sm"
        style={{
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <h2 className="mb-4 text-2xl font-bold text-black sm:text-left">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg text-black">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-black"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-black"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="block text-lg text-black">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-black"
            />
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-lg text-black">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 h-32 w-full rounded-md border border-gray-300 p-2 text-black"
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            Send Message
          </button>

          {submitted && (
            <p className="mt-4 text-center text-green-500">
              Message sent successfully!
            </p>
          )}
        </form>
      </div>

      {/* Floating Action Button with Label */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3">
        {!showIcons && (
          <span
            className={`mb-2 text-xl font-semibold text-white transition-opacity duration-500 ease-out ${
              showIcons ? "opacity-0" : "opacity-100"
            }`}
          >
            Get in touch
          </span>
        )}

        <button
          onClick={() => setShowIcons(!showIcons)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700"
          title="Toggle Contact Options"
        >
          <i data-feather="plus"></i>
        </button>
      </div>

      {/* Social Icons */}
      {showIcons && (
        <div className="fixed bottom-24 right-6 flex flex-col items-center gap-3">
          <a
            href="mailto:edumeeresearchlabs.com?subject=Contact%20from%20Website&body=Hello%2C%0A%0AI%20would%20like%20to%20get%20in%20touch%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600"
            title="Email"
          >
            <i data-feather="mail"></i>
          </a>
          <a
            href="https://wa.me/917569605019?text=Hi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
            title="WhatsApp"
          >
            <i data-feather="message-circle"></i>
          </a>
          <a
            href="https://www.instagram.com/edueme_researchlabs/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white shadow-lg hover:bg-purple-600"
            title="Instagram"
          >
            <i data-feather="instagram"></i>
          </a>
        </div>
      )}
    </div>
  );
}

export default ContactForm;
