import React from 'react'

const demoFrom = () => {
return (
  <div className="flex h-screen items-center justify-center bg-gray-100">
    <div className="flex w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Left Section */}
      <div className="flex w-1/2 flex-col items-center justify-center bg-gray-800 p-8 text-white">
        <div className="mb-8 flex space-x-4">
          {/* Icons */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-4xl">
            🤔
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-4xl">
            ✍️
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-4xl">
            🖼️
          </div>
        </div>
        <h1 className="mb-4 text-2xl font-bold">Start to Design Wisely</h1>
        <p className="mb-8 text-center text-gray-300">
          A full-value product supporting the design process using Figma's
          auto-layout and variants.
        </p>
        <div className="flex space-x-4">
          <button className="rounded-full bg-gray-600 p-2 text-white hover:bg-gray-500">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a7 7 0 107 7h-4l5-5-5-5v4A7 7 0 0010 3z" />
            </svg>
          </button>
          <button className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-400">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a7 7 0 017 7H5a7 7 0 017-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-1/2 flex-col items-center justify-center bg-white p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Book a Free Demo Now!
        </h2>
        <div className="mb-6 flex space-x-4">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
            <img
              src="https://e7.pngegg.com/pngimages/63/1016/png-clipart-google-logo-google-logo-g-suite-chrome-text-logo.png"
              alt="Google"
              className="h-6 w-6"
            />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
            <img
              src="https://cdn-icons-png.flaticon.com/512/0/747.png"
              alt="Apple"
              className="h-6 w-6"
            />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="h-6 w-6"
            />
          </button>
        </div>
        <p className="mb-4 text-gray-500">or do it via E-mail</p>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-3 text-white hover:bg-blue-600"
          >
            Sign in
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-400">
          &copy; 2021 All Rights Reserved
        </p>
      </div>
    </div>
  </div>
);
}

export default demoFrom