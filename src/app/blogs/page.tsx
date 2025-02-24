'use client';

import Link from 'next/link';
import Image from 'next/image';

const BlogHomepage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white text-center p-6 pt-24 relative">
      <h1 className="text-5xl font-bold">Create a Blog Worth Sharing</h1>
      <p className="mt-4 text-lg max-w-2xl">
        EduMe provides an intuitive platform to share insights on Robotics and AI, connecting enthusiasts and professionals to foster knowledge and innovation.
      </p>
      <Link href="/blogs/blogpage">
        <button className="mt-6 px-6 py-3 bg-white text-blue-900 font-bold rounded-lg shadow-md hover:bg-gray-300 transition">
          Start Blogging
        </button>
      </Link>
      <p className="mt-2 text-sm text-gray-300">Join EduMe and contribute to the future of education and technology.</p>
      <Image 
        src="/blogpic2.webp" 
        alt="EduMe Blog Preview" 
        layout="intrinsic" 
        width={800} 
        height={500} 
        className="mt-12"
      />
    </div>
  );
};

export default BlogHomepage;