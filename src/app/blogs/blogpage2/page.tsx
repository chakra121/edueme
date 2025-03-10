"use client"
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const blogContent = {
  title: "EduMe Blogs",
  description: "Explore insightful articles, expert opinions, and the latest trends in education, technology, and beyond. Stay informed and inspired with EduMe Blogs."
};

export default function BlogPage() {
  const [selectedTab, setSelectedTab] = useState<'featured' | 'recent'>('featured');

  const featuredBlogs = [
    { title: 'Github Repository Controls', date: 'January 24, 2021', img: '/blogs/img1.webp' },
    { title: 'My work from home workstation', date: 'January 24, 2021', img: '/blogs/img1.webp' },
    { title: 'What is a Virtual Assistant', date: 'January 24, 2021', img: '/blogs/img1.webp' },
  ];

  const recentBlogs = [
    { title: 'The Future of AI in Healthcare', date: 'March 10, 2025', img: '/blogs/img1.webp' },
    { title: 'The Impact of Quantum Computing on AI', date: 'March 10, 2025', img: '/blogs/img3.jpg' },
    { title: 'Will Artificial Intelligence Be 100% Equal to Human Intelligence?', date: 'February 10, 2021', img: '/blogs/img1.webp' },
    { title: 'The Role of Blockchain in Education', date: 'March 10, 2025', img: '/blogs/img1.webp' }, // New blog post
  ];

  const blogsToDisplay = selectedTab === 'featured' ? featuredBlogs : recentBlogs;

  return (
    <div className="font-sans">
      <header className="flex justify-between p-5 bg-gray-100">
        <h1 className="text-3xl font-bold">{blogContent.title}</h1>
      </header>
      <main className="p-10 flex gap-8">
        <div className="w-1/2 p-8 flex flex-col items-center justify-center">
          <div className="text-left">
            <h1 className="text-6xl font-bold mb-5 mt-10 text-grey">
              <span className="text-8xl">Welcome</span>!
            </h1>
            <h2 className="text-3xl text-gray-700 mb-5">
              <span className="text-5xl">to {blogContent.title}</span> 
            </h2>
            <p className="text-lg text-gray-700 mb-6 text-left">{blogContent.description}</p>
            <div className="text-left">
              <button className="bg-green-500 text-white py-3 px-6 rounded text-lg hover:bg-green-600 transition-colors">Explore</button>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-8 flex items-center justify-center">
          <img src="/blogsbg.gif" alt="Blog Home GIF" className="max-h-64 object-contain" />
        </div>
      </main>
      <div className="font-sans">
        <main className="p-10 flex gap-8">
          <div className="w-3/4">
            <section className="mb-8 p-6 border rounded shadow-sm">
              <h2 className="text-4xl font-bold mb-4">Featured Post</h2>
              <div className="grid grid-cols-3 gap-4">
                <img src="/blogs/img1.webp" alt="Featured Post" className="col-span-1 w-full h-64 object-cover rounded" />
                <div className="col-span-1">
                  <h3 className="text-2xl font-bold">Future of Robotics: All You Need to Know in 2025</h3>
                  <p className="text-gray-600">by Arka on March 15, 2025</p>
                  <p className="mt-2">Future of Robotics: All You Need to Know in 2023 In recent years, the field of robotics has seen remarkable advancements and breakthroughs, revolutionized various industries and transformed the way we live and work.</p>
                  <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">Read More</button>
                </div>
                <div className="col-span-1 border-l pl-4">
                  <h4 className="text-xl font-bold mb-4">Featured Posts</h4>
                  <div className="space-y-4 h-64 overflow-y-auto pr-2"> {/* Added height and scroll */}
                    <div className="flex items-center">
                      <img src="/blogs/img1.webp" alt="Post Image" className="w-16 h-16 object-cover rounded mr-4" />
                      <div>
                        <h5 className="font-bold">My work from home workstation</h5>
                        <p className="text-gray-600 text-sm">January 24, 2021</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <img src="/blogs/img1.webp" alt="Post Image" className="w-16 h-16 object-cover rounded mr-4" />
                      <div>
                        <h5 className="font-bold">What is a Virtual Assistant</h5>
                        <p className="text-gray-600 text-sm">January 24, 2021</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <img src="/blogs/img3.jpg" alt="Post Image" className="w-16 h-16 object-cover rounded mr-4" />
                      <div>
                        <h5 className="font-bold">The Impact of Quantum Computing</h5>
                        <p className="text-gray-600 text-sm">March 10, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <img src="/blogs/img1.webp" alt="Post Image" className="w-16 h-16 object-cover rounded mr-4" />
                      <div>
                        <h5 className="font-bold">Future of AI in Healthcare</h5>
                        <p className="text-gray-600 text-sm">March 10, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="mb-8 p-6 border rounded shadow-sm">
              <h2 className="text-4xl font-bold mt-8 mb-4">Recent Posts</h2>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col items-center p-6 border rounded shadow-sm">
                  <img src="/blogs/img1.webp" alt="Another Post" className="w-full h-56 object-cover rounded mb-4" />
                  <div className="w-full text-center">
                    <h3 className="text-xl font-bold">Will Artificial Intelligence Be 100% Equal to Human Intelligence?</h3>
                    <p className="text-gray-600">by John Doe on February 10, 2021</p>
                    <p className="mt-2 text-sm">Will Artificial Intelligence Be 100% Equal to Human Intelligence? First, Human intelligence...</p>
                    <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors text-sm">Read More</button>
                  </div>
                </div>
                <div className="flex flex-col items-center p-6 border rounded shadow-sm">
                  <img src="/blogs/img3.jpg" alt="Another Post" className="w-full h-56 object-cover rounded mb-4" />
                  <div className="w-full text-center">
                    <h3 className="text-xl font-bold">The Impact of Quantum Computing on AI</h3>
                    <p className="text-gray-600">by Jane Smith on March 10, 2025</p>
                    <p className="mt-2 text-sm">Quantum computing is poised ...</p>
                    <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors text-sm">Read More</button>
                  </div>
                </div>
                <div className="flex flex-col items-center p-6 border rounded shadow-sm">
                  <img src="/blogs/img1.webp" alt="Another Post" className="w-full h-56 object-cover rounded mb-4" />
                  <div className="w-full text-center">
                    <h3 className="text-xl font-bold">The Future of AI in Healthcare</h3>
                    <p className="text-gray-600">by Alex Johnson on March 10, 2025</p>
                    <p className="mt-2 text-sm">Artificial intelligence (AI) is the...</p>
                    <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors text-sm">Read More</button>
                  </div>
                </div>
                <div className="flex flex-col items-center p-6 border rounded shadow-sm"> {/* New card */}
                  <img src="/blogs/img1.webp" alt="Another Post" className="w-full h-56 object-cover rounded mb-4" />
                  <div className="w-full text-center">
                    <h3 className="text-xl font-bold">The Role of Blockchain in Education</h3>
                    <p className="text-gray-600">by Emily Clark on March 10, 2025</p>
                    <p className="mt-2 text-sm">Blockchain technology is revolutionizing...</p>
                    <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors text-sm">Read More</button>
                  </div>
                </div>
              </section>
            </section>
          </div>
          <div className="w-1/4">
            <section className="mb-8 p-6 border rounded shadow-sm text-center"> {/* New card */}
              <img src="/logo_icon.png" alt="Edueme logo" className="w-16 h-16 object-cover rounded mx-auto mb-4" />
              <h3 className="text-xl font-bold">Edueme Research Labs</h3>
              <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, conse tfctetur adipiscing elit. Vel in in donec iaculis tempasus odio nunc laoreet. Libero ullam rgscorper.</p>
              <div className="flex justify-center space-x-4">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-github"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
              </div>
            </section>
            <section className="mb-8 p-6 border rounded shadow-sm">
              <h2 className="text-3xl font-bold mb-4">Recent Posts</h2>
              <ul className="overflow-y-auto h-64">
                <li className="mb-4 flex items-center">
                  <img src="/blogs/img1.webp" alt="Post Image" className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="text-xl font-bold">My work from home workstation</h3>
                    <p className="text-gray-600">January 24, 2021</p>
                  </div>
                </li>
                <li className="mb-4 flex items-center">
                  <img src="/blogs/img1.webp" alt="Post Image" className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="text-xl font-bold">What is a Virtual Assistant</h3>
                    <p className="text-gray-600">January 24, 2021</p>
                  </div>
                </li>
                <li className="mb-4 flex items-center">
                  <img src="/blogs/img1.webp" alt="Post Image" className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="text-xl font-bold">What you need to know about Programming</h3>
                    <p className="text-gray-600">January 24, 2021</p>
                  </div>
                </li>
                <li className="mb-4 flex items-center">
                  <img src="/blogs/img1.webp" alt="Post Image" className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="text-xl font-bold">Why you need to learn PHP</h3>
                    <p className="text-gray-600">January 24, 2021</p>
                  </div>
                </li>
              </ul>
            </section>
            <section className="mb-8 p-6 border rounded shadow-sm">
              <h2 className="text-3xl font-bold mb-4">Blog Categories</h2>
              <ul>
                <li className="mb-2">
                  <a href="#" className="text-blue-500 hover:underline"> Artificial intelligence</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-blue-500 hover:underline">Assistant</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-blue-500 hover:underline">Drone</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-blue-500 hover:underline">Github</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-blue-500 hover:underline">Programming</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-blue-500 hover:underline">Robotics</a>
                </li>
              </ul>
            </section>
            <section className="p-6 border rounded shadow-sm mt-8">
              <h2 className="text-3xl font-bold mb-4">Blogs</h2>
              <div className="flex mb-4">
                <button
                  className={`py-2 px-4 rounded-l ${selectedTab === 'featured' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setSelectedTab('featured')}
                >
                  Featured
                </button>
                <button
                  className={`py-2 px-4 rounded-r ${selectedTab === 'recent' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setSelectedTab('recent')}
                >
                  Recent
                </button>
              </div>
              <ul>
                {blogsToDisplay.map((blog, index) => (
                  <li key={index} className="mb-4 flex items-center">
                    <img src={blog.img} alt={blog.title} className="w-16 h-16 object-cover rounded mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">{blog.title}</h3>
                      <p className="text-gray-600">{blog.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="p-6 border rounded shadow-sm mt-8"> {/* Newsletter card */}
              <h2 className="text-3xl font-bold mb-4">Newsletter</h2>
              <p className="mb-4">Join thousands of Tiny Salt subscribers and get our best recipes delivered each week!</p>
              <div className="flex mb-4">
                <input type="text" placeholder="Type And Hit Enter" className="flex-grow p-2 border rounded-l" />
                <button className="bg-gray-200 p-2 border-l rounded-r">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m0 0l4-4m-4 4l4 4" />
                  </svg>
                </button>
              </div>
              <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors">Sign In</button>
              <p className="mt-4 text-sm text-gray-600">By Signing Up, You Agree To <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a></p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};



