"use client"
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Pagination from '../../components/Pagination'; // Adjust the import path as needed

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
  <div className="flex flex-col items-center p-6 border rounded shadow-sm">
    <img src={blog.img} alt={blog.title} className="w-full h-56 object-cover rounded mb-4" />
    <div className="w-full text-center">
      <h3 className="text-xl font-bold">{blog.title}</h3>
      <p className="text-gray-600">by {blog.author} on {blog.date}</p>
      <p className="mt-2 text-sm">{blog.excerpt}</p>
      <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors text-sm">
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
      <header className="flex justify-between p-5 bg-gray-100">
        <h1 className="text-3xl font-bold">{blogContent.title}</h1>
      </header>
      <main className="p-10 flex gap-8">
        <div className="w-1/2 p-8 flex flex-col items-center justify-center">
          <div className="text-left">
            <h1 className="text-6xl font-bold mb-5 mt-10 text-grey">
              <span className="text-8xl">Welcome</span>
                <span className="text-green-500 text-8xl ml-4">!</span>
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
                <img src={mainFeaturedPost.img} alt="Featured Post" className="col-span-1 w-full h-64 object-cover rounded" />
                <div className="col-span-1">
                  <h3 className="text-2xl font-bold">{mainFeaturedPost.title}</h3>
                  <p className="text-gray-600">by {mainFeaturedPost.author} on {mainFeaturedPost.date}</p>
                  <p className="mt-2">{mainFeaturedPost.excerpt}</p>
                  <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">Read More</button>
                </div>
                <div className="col-span-1 border-l pl-4">
                  <h4 className="text-xl font-bold mb-4">Featured Posts</h4>
                  <div className="space-y-4 h-64 overflow-y-auto pr-2">
                    {featuredBlogs.map((blog, index) => (
                      <div key={index} className="flex items-center">
                        <img src={blog.img} alt="Post Image" className="w-16 h-16 object-cover rounded mr-4" />
                        <div>
                          <h5 className="font-bold">{blog.title}</h5>
                          <p className="text-gray-600 text-sm">{blog.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section className="mb-8 p-6 border rounded shadow-sm">
              <h2 className="text-4xl font-bold mt-8 mb-4">Recent Posts</h2>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <section className="mb-8 p-6 border rounded shadow-sm text-center">
              <img src="/logo_icon.png" alt="Edueme logo" className="w-16 h-16 object-cover rounded mx-auto mb-4" />
              <h3 className="text-xl font-bold">Edueme Research Labs</h3>
              <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, conse tfctetur adipiscing elit. Vel in in donec iaculis tempasus odio nunc laoreet. Libero ullam rgscorper.</p>
              <div className="flex justify-center space-x-4">
                {sidebarLinks.social.map((link, index) => (
                  <a key={index} href={link.url}><i className={`fab fa-${link.icon}`}></i></a>
                ))}
              </div>
            </section>
            <section className="mb-8 p-6 border rounded shadow-sm">
              <h2 className="text-3xl font-bold mb-4">Recent Posts</h2>
              <ul className="overflow-y-auto h-64">
                {recentBlogs.slice(0, 5).map((blog, index) => (
                  <li key={index} className="mb-4 flex items-center">
                    <img src={blog.img} alt="Post Image" className="w-16 h-16 object-cover rounded mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">{blog.title}</h3>
                      <p className="text-gray-600">{blog.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="mb-8 p-6 border rounded shadow-sm">
              <h2 className="text-3xl font-bold mb-4">Blog Categories</h2>
              <ul>
                {sidebarLinks.categories.map((category, index) => (
                  <li key={index} className="mb-2">
                    <a href="#" className="text-blue-500 hover:underline">{category}</a>
                  </li>
                ))}
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

            <section className="p-6 border rounded shadow-sm mt-8">
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
}


