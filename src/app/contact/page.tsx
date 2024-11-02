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
      className="flex flex-row items-center min-h-screen bg-cover bg-center px-4 sm:px-10 "
      style={{
        backgroundImage: "url('/contactbgg.png')",
      }}
    >
      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-6 bg-white bg-opacity-90 rounded-lg shadow-md -mt-10 mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800  sm:text-left">Contact Us</h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </label>

          <label className="block mb-2">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </label>

          <label className="block mb-2">
            Subject
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
          </label>

          <label className="block mb-4">
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md h-32 resize-none"
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </label>

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
            Send Message
          </button>

          {submitted && <p className="mt-4 text-green-500 text-center">Message sent successfully!</p>}
        </form>
      </div>

      {/* Additional Contact Information */}
      <div className="-mt-10 mr-40 p-6 bg-white bg-opacity-90 rounded-lg shadow-md text-center w-full max-w-sm sm:max-w-md ">
        <h3 className="text-lg font-semibold mb-2">Reach Us Directly</h3>
        
        <p className="text-gray-700">
          <a href="mailto:contact@edtechplatform.com" className="text-blue-500 hover:text-blue-700">
            Email: edumeintern@gmail.com
          </a>
        </p>

        <p className="text-gray-700 mt-2">
          <a href="tel:+918341166882" className="text-blue-500 hover:text-blue-700">
            Phone: +91 8341166882
          </a>
        </p>

        <p className="text-gray-700 mt-2">
          <a href="https://wa.me/+918341166882" className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
            WhatsApp Chat: +91 8341166882
          </a>
        </p>
      </div>
    </div>
  );
}

export default ContactForm;
