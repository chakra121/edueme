import { useState } from 'react'

export default function HomePage() {
  const blogPosts = [
    {
      title: "Interactive Learning",
      description: "Discover how our interactive learning methods engage children and enhance their understanding.",
      imageUrl: "/g1.jpg",
    },
    {
      title: "Educational Activities",
      description: "Explore a variety of educational activities designed to make learning fun and effective.",
      imageUrl: "/g2.jpg",
    },
    {
      title: "Parental Involvement",
      description: "Learn how you can be involved in your child's education and support their learning journey.",
      imageUrl: "/g3.jpg",
    },
    {
      title: "Curriculum Overview",
      description: "Get an overview of our curriculum and the skills your child will develop.",
      imageUrl: "/g1.jpg",
    },
    {
      title: "Success Stories",
      description: "Read about the success stories of children who have benefited from our programs.",
      imageUrl: "/g1.jpg",
    },
    {
      title: "Future Programs",
      description: "Find out about upcoming programs and events at CognoSpace.",
      imageUrl: "/g1.jpg",
    },
  ]

  return (
    <div className="bg-white">

      {/* Hero Section */}
      <div className="relative" style={{ backgroundImage: "url('/registerbg.jpg')", backgroundSize: 'cover', height: '400px' }}>
        <div className="absolute inset-0 bg-white bg-opacity-50 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-blue-900">Blogs</h1>
          <p className="text-lg text-black">
            <a href="/" className="text-blue-500 hover:underline">Home</a> {' > '} Blogs
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-gray-100 rounded overflow-hidden shadow-lg">
            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-yellow-400">{post.title}</div>
              <p className="text-gray-700 text-base">{post.description}</p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}