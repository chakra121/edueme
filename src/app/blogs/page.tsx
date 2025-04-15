"use client"
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Pagination from '../../components/Pagination'; // Adjust the import path as needed
import Image from 'next/image';

const blogContent = {
  title: "EduMe Blogs",
  description: "Explore insightful articles, expert opinions, and the latest trends in education, technology, and beyond. Stay informed and inspired with EduMe Blogs."
};

const featuredBlogs = [
  { title: 'AI and Robotics: The Perfect Duo', date: 'February 24, 2025', img: '/blogs/img1.webp' },
  { title: 'How does robotics affect our life?', date: 'January 15, 2025', img: '/blogs/img1.webp' },
  { title: 'Robotics in Real life', date: 'December 23, 2024', img: '/blogs/img1.webp' },
  { title: 'The Evolution of Robotics', date: 'October 24, 2024', img: '/blogs/img1.webp' },
];

const recentBlogs = [
  { 
    title: 'Top Robotics Trends in 2025: What’s Next?', 
    date: 'March 12, 2025', 
    img: '/blogs/img8.png', 
    author: 'Alex Johnson', 
    excerpt: 'Artificial intelligence (AI) is the driving force behind the latest advancements in robotics. From humanoid assistants to AI-driven automation, discover the top trends shaping robotics in 2025.' 
  },
  { 
    title: 'AI-Powered Robotics: Transforming Industries in 2025',       
    date: 'March 05, 2025', 
    img: '/blogs/img7.jpg', 
    author: 'Sophia Martinez', 
    excerpt: 'From healthcare to manufacturing, AI-powered robots are revolutionizing industries. Explore the latest breakthroughs and how they’re shaping the future.' 
  },
  { 
    title: 'AI-Powered Robotics: Transforming Industries in 2025',       
    date: 'March 05, 2025', 
    img: '/blogs/img5.jpg', 
    author: 'Sophia Martinez', 
    excerpt: 'From healthcare to manufacturing, AI-powered robots are revolutionizing industries. Explore the latest breakthroughs and how they’re shaping the future.' 
  },
  { 
    title: 'How to Build a Simple Robot at Home', 
    date: 'March 08, 2025', 
    img: '/blogs/img2.jpg', 
    author: 'Jane Smith', 
    excerpt: 'Want to build your first robot? Learn how to create a simple robot using Arduino, motors, and sensors. A step-by-step guide for beginners and hobbyists!' 
  },
  { 
    title: 'Will Artificial Intelligence Be 100% Equal to Human Intelligence?', 
    date: 'February 28, 2025', 
    img: '/blogs/img3.jpg', 
    author: 'John Doe', 
    excerpt: 'Can AI ever match human intelligence? Explore the differences between machine learning, deep learning, and human cognition in this thought-provoking discussion.' 
  },
  { 
    title: 'The Future of Humanoid Robots: How Close Are We?', 
    date: 'March 10, 2025', 
    img: '/blogs/img4.jpg', 
    author: 'Michael Lee', 
    excerpt: 'Humanoid robots are evolving rapidly, with advancements in AI and machine learning pushing them closer to human-like behavior. But how far are we from full autonomy?' 
  },
  { 
    title: 'AI-Powered Robotics: Transforming Industries in 2025',       
    date: 'March 05, 2025', 
    img: '/blogs/img1.webp', 
    author: 'Sophia Martinez', 
    excerpt: 'From healthcare to manufacturing, AI-powered robots are revolutionizing industries. Explore the latest breakthroughs and how they’re shaping the future.' 
  },
  { 
    title: 'AI-Powered Robotics: Transforming Industries in 2025',       
    date: 'March 05, 2025', 
    img: '/blogs/img1.webp', 
    author: 'Sophia Martinez', 
    excerpt: 'From healthcare to manufacturing, AI-powered robots are revolutionizing industries. Explore the latest breakthroughs and how they’re shaping the future.' 
  },
  
  { 
    title: 'AI-Powered Robotics: Transforming Industries in 2025',       
    date: 'March 05, 2025', 
    img: '/blogs/img1.webp', 
    author: 'Sophia Martinez', 
    excerpt: 'From healthcare to manufacturing, AI-powered robots are revolutionizing industries. Explore the latest breakthroughs and how they’re shaping the future.' 
  },
  { 
    title: 'AI-Powered Robotics: Transforming Industries in 2025',       
    date: 'March 05, 2025', 
    img: '/blogs/img1.webp', 
    author: 'Sophia Martinez', 
    excerpt: 'From healthcare to manufacturing, AI-powered robots are revolutionizing industries. Explore the latest breakthroughs and how they’re shaping the future.' 
  },
  { 
    title: 'AI-Powered Robotics: Transforming Industries in 2025',       
    date: 'March 05, 2025', 
    img: '/blogs/img1.webp', 
    author: 'Sophia Martinez', 
    excerpt: 'From healthcare to manufacturing, AI-powered robots are revolutionizing industries. Explore the latest breakthroughs and how they’re shaping the future.' 
  },
  { 
    title: 'How Robots Are Becoming More Human with AI', 
    date: 'February 14, 2025', 
    img: '/blogs/img1.webp', 
    author: 'Emily Clark', 
    excerpt: 'From emotional recognition to natural language processing, AI is making robots more human-like than ever before. Find out how this is changing industries and daily life.' 
  }
];

const mainFeaturedPost = {
  title: 'Future of Robotics: All You Need to Know in 2025',
  author: 'Arka',
  date: 'March 15, 2025',
  img: '/blogs/img1.webp',
  excerpt: 'Future of Robotics: All You Need to Know in 2025 In recent years, the field of robotics has seen remarkable advancements and breakthroughs, revolutionized various industries and transformed the way we live and work...'
};

const sidebarLinks = {
  social: [
    { icon: 'facebook', url: '#' },
    { icon: 'twitter', url: '#' },
    { icon: 'instagram', url: '#' },
    { icon: 'github', url: '#' },
    { icon: 'linkedin', url: '#' }
  ],
  categories: [
    'Artificial intelligence',
    'Assistant',
    'Drone',
    'Github',
    'Programming',
    'Robotics'
  ]
};


interface Blog {
  title: string;
  date: string;
  img: string;
  author: string;
  excerpt: string;
}

const BlogCard = ({ blog }: { blog: Blog }) => (
  <div className="flex flex-col items-center rounded border p-6 shadow-xs">
    <Image
      src={blog.img}
      width={500}
      height={300}
      alt={blog.title}
      className="mb-4 h-56 w-full rounded object-cover"
    />
    <div className="w-full text-center">
      <h3 className="text-xl font-bold">{blog.title}</h3>
      <p className="text-gray-600">
        by {blog.author} on {blog.date}
      </p>
      <p className="mt-2 text-sm">{blog.excerpt}</p>
      <button className="mt-4 rounded bg-green-500 px-4 py-2 text-sm text-white transition-colors hover:bg-green-600">
        Read More
      </button>
    </div>
  </div>
);

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4  ;
  const totalPages = Math.ceil(recentBlogs.length / blogsPerPage);

  const currentBlogs = recentBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const [selectedTab, setSelectedTab] = useState('featured');
  const blogsToDisplay = selectedTab === 'featured' ? featuredBlogs.slice(0, 5) : recentBlogs.slice(0, 5);

  return (
    <div className="font-sans">
      <header className="flex justify-between bg-gray-100 p-5">
        <h1 className="text-3xl font-bold">{blogContent.title}</h1>
      </header>
      <main className="flex gap-8 p-10">
        <div className="flex w-1/2 flex-col items-center justify-center p-8">
          <div className="text-left">
            <h1 className="text-grey mb-5 mt-10 text-6xl font-bold">
              <span className="text-8xl">Welcome</span>
              <span className="ml-4 text-8xl text-green-500">!</span>
            </h1>
            <h2 className="mb-5 text-3xl text-gray-700">
              <span className="text-5xl">to {blogContent.title}</span>
            </h2>
            <p className="mb-6 text-left text-lg text-gray-700">
              {blogContent.description}
            </p>
            <div className="text-left">
              <button className="rounded bg-green-500 px-6 py-3 text-lg text-white transition-colors hover:bg-green-600">
                Explore
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 items-center justify-center p-8">
          <Image
            width={500}
            height={300}
            src="/blogsbg.gif"
            alt="Blog Home GIF"
            className="max-h-64 object-contain"
          />
        </div>
      </main>
      <div className="font-sans">
        <main className="flex gap-8 p-10">
          <div className="w-3/4">
            <section className="mb-8 rounded border p-6 shadow-xs">
              <h2 className="mb-4 text-4xl font-bold">Featured Post</h2>
              <div className="grid grid-cols-3 gap-4">
                <Image
                  width={500}
                  height={300}
                  src={mainFeaturedPost.img}
                  alt="Featured Post"
                  className="col-span-1 h-64 w-full rounded object-cover"
                />
                <div className="col-span-1">
                  <h3 className="text-2xl font-bold">
                    {mainFeaturedPost.title}
                  </h3>
                  <p className="text-gray-600">
                    by {mainFeaturedPost.author} on {mainFeaturedPost.date}
                  </p>
                  <p className="mt-2">{mainFeaturedPost.excerpt}</p>
                  <button className="mt-4 rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600">
                    Read More
                  </button>
                </div>
                <div className="col-span-1 border-l pl-4">
                  <h4 className="mb-4 text-xl font-bold">Featured Posts</h4>
                  <div className="h-64 space-y-4 overflow-y-auto pr-2">
                    {featuredBlogs.map((blog, index) => (
                      <div key={index} className="flex items-center">
                        <Image
                          width={500}
                          height={300}
                          src={blog.img}
                          alt="Post Image"
                          className="mr-4 h-16 w-16 rounded object-cover"
                        />
                        <div>
                          <h5 className="font-bold">{blog.title}</h5>
                          <p className="text-sm text-gray-600">{blog.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8 rounded border p-6 shadow-xs">
              <h2 className="mb-4 mt-8 text-4xl font-bold">Recent Posts</h2>
              <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {currentBlogs.map((blog, index) => (
                  <BlogCard key={index} blog={blog} />
                ))}
              </section>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </section>
          </div>
          <div className="w-1/4">
            <section className="mb-8 rounded border p-6 text-center shadow-xs">
              <Image
                width={500}
                height={300}
                src="/logo_icon.png"
                alt="Edueme logo"
                className="mx-auto mb-4 h-16 w-16 rounded object-cover"
              />
              <h3 className="text-xl font-bold">Edueme Research Labs</h3>
              <p className="mb-4 text-gray-600">
                Lorem ipsum dolor sit amet, conse tfctetur adipiscing elit. Vel
                in in donec iaculis tempasus odio nunc laoreet. Libero ullam
                rgscorper.
              </p>
              <div className="flex justify-center space-x-4">
                {sidebarLinks.social.map((link, index) => (
                  <a key={index} href={link.url}>
                    <i className={`fab fa-${link.icon}`}></i>
                  </a>
                ))}
              </div>
            </section>
            <section className="mb-8 rounded border p-6 shadow-xs">
              <h2 className="mb-4 text-3xl font-bold">Recent Posts</h2>
              <ul className="h-64 overflow-y-auto">
                {recentBlogs.slice(0, 5).map((blog, index) => (
                  <li key={index} className="mb-4 flex items-center">
                    <Image
                      width={500}
                      height={300}
                      src={blog.img}
                      alt="Post Image"
                      className="mr-4 h-16 w-16 rounded object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{blog.title}</h3>
                      <p className="text-gray-600">{blog.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="mb-8 rounded border p-6 shadow-xs">
              <h2 className="mb-4 text-3xl font-bold">Blog Categories</h2>
              <ul>
                {sidebarLinks.categories.map((category, index) => (
                  <li key={index} className="mb-2">
                    <a href="#" className="text-blue-500 hover:underline">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8 rounded border p-6 shadow-xs">
              <h2 className="mb-4 text-3xl font-bold">Blogs</h2>
              <div className="mb-4 flex">
                <button
                  className={`rounded-l px-4 py-2 ${selectedTab === "featured" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => setSelectedTab("featured")}
                >
                  Featured
                </button>
                <button
                  className={`rounded-r px-4 py-2 ${selectedTab === "recent" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => setSelectedTab("recent")}
                >
                  Recent
                </button>
              </div>
              <ul>
                {blogsToDisplay.map((blog, index) => (
                  <li key={index} className="mb-4 flex items-center">
                    <Image
                      width={500}
                      height={300}
                      src={blog.img}
                      alt={blog.title}
                      className="mr-4 h-16 w-16 rounded object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{blog.title}</h3>
                      <p className="text-gray-600">{blog.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8 rounded border p-6 shadow-xs">
              <h2 className="mb-4 text-3xl font-bold">Newsletter</h2>
              <p className="mb-4">
                Join thousands of Tiny Salt subscribers and get our best recipes
                delivered each week!
              </p>
              <div className="mb-4 flex">
                <input
                  type="text"
                  placeholder="Type And Hit Enter"
                  className="grow rounded-l border p-2"
                />
                <button className="rounded-r border-l bg-gray-200 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12H8m0 0l4-4m-4 4l4 4"
                    />
                  </svg>
                </button>
              </div>
              <button className="w-full rounded bg-green-500 py-2 text-white transition-colors hover:bg-green-600">
                Sign In
              </button>
              <p className="mt-4 text-sm text-gray-600">
                By Signing Up, You Agree To{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}


