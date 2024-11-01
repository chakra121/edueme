import React from 'react'

const demoFrom = () => {
return (
  <div className="flex h-screen items-center justify-center bg-gray-100">
    <div className="flex w-full max-w-6xl overflow-hidden rounded-2xl bg-white hover:shadow-lg">
      {/* Left Section */}
      <div className="flex w-1/2 flex-col items-center justify-center bg-slate-900 p-8 text-white">
        <div className="mb-8 flex space-x-4">
          <img className="h-80 w-auto" src="/demoimg.png"></img>
        </div>
        <div className='text-left'>
          <h1 className="mb-2 text-2xl font-bold">One step</h1>
          <h1 className="mb-2 text-2xl font-bold">ahead towards your</h1>
          <h1 className="mb-2 text-2xl font-bold">Robotics Journey...</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-1/2 flex-col items-center justify-center bg-white p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Book a Free Demo Now!
        </h2>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name of the Student"
              className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 flex">
            <input
              type="tel"
              placeholder="Mobile Number"
              className="rounded border border-gray-300 p-3 pr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full rounded bg-green-500 py-3 pl-2 text-white hover:bg-green-600"
            >
              Send OTP
            </button>
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            {/* Dropdown Field */}
            <select className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Grade</option>
              <option value="admin">2 - 3</option>
              <option value="user">4 - 5</option>
              <option value="guest">6 - 7</option>
              <option value="guest">8 - 9</option>
              <option value="guest">10 - 12</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-3 text-white hover:bg-blue-600"
          >
            Schedule Now !
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-400">
          &copy; 2024 All Rights Reserved
        </p>
      </div>
    </div>
  </div>
);
}

export default demoFrom