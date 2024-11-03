"use client";
import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid";
    }
    if (!formData.subject) tempErrors.subject = "Subject is required";
    if (!formData.message) tempErrors.message = "Message is required";
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
      // Handle form submission here
    }
  };

  return (
    <div
      className="flex min-h-screen flex-row items-center bg-cover bg-center px-4 sm:px-10"
      style={{
        backgroundImage: "url('/contactbgg.png')",
      }}
    >
      <div className="mx-auto -mt-10 w-full max-w-sm rounded-lg bg-white bg-opacity-90 p-6 shadow-md sm:max-w-md sm:p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:text-left">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="mb-2 block">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </label>

          <label className="mb-2 block">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </label>

          <label className="mb-2 block">
            Subject
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2"
            />
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject}</p>
            )}
          </label>

          <label className="mb-4 block">
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 h-32 w-full resize-none rounded-md border p-2"
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message}</p>
            )}
          </label>

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

      {/* Additional Contact Information */}
      <div className="-mt-10 mr-40 w-full max-w-sm rounded-lg bg-white bg-opacity-90 p-6 text-center shadow-md sm:max-w-md">
        <h3 className="mb-2 text-lg font-semibold">Reach Us Directly</h3>

        <p className="text-gray-700">
          Email:{" "}
          <a
            href="mailto:contact@edtechplatform.com"
            className="text-blue-500 hover:text-blue-700"
          >
            edumeintern@gmail.com
          </a>
        </p>

        <p className="mt-2 text-gray-700">
          Phone:{" "}
          <a
            href="tel:+919059508050"
            className="text-blue-500 hover:text-blue-700"
          >
            +91 8341166882
          </a>
        </p>

        <p className="mt-2 text-gray-700">
          WhatsApp Chat:{" "}
          <a
            href="https://wa.me/+919059508050"
            className="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            +91 9059508050
          </a>
        </p>
      </div>
    </div>
  );
}

export default ContactForm;
