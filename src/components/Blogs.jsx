import React from 'react';
import blogImage1 from '../assets/blog1.jpg';
import blogImage2 from '../assets/blog1.jpg';
import blogImage3 from '../assets/blog1.jpg';

const Blogs = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 inter-font">
      <h2 className="text-3xl font-bold text-center mb-8">Recent Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
          <img
            src={blogImage1}
            alt="Blog 1"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Blog Title 1</h3>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nisl nec tincidunt lacinia, nisl nunc aliquam nisl, eget
              aliquam nisl...
            </p>
            <a
              href="#"
              className="text-start bg-black rounded-lg w-fit text-white px-5 py-2 mt-5 transition-colors duration-300"
            >
              Read More
            </a>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
          <img
            src={blogImage2}
            alt="Blog 2"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Blog Title 2</h3>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nisl nec tincidunt lacinia, nisl nunc aliquam nisl, eget
              aliquam nisl...
            </p>
            <a
              href="#"
              className="text-start bg-black rounded-lg w-fit text-white px-5 py-2 mt-5 transition-colors duration-300"
            >
              Read More
            </a>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
          <img
            src={blogImage3}
            alt="Blog 3"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Blog Title 3</h3>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nisl nec tincidunt lacinia, nisl nunc aliquam nisl, eget
              aliquam nisl...
            </p>
            <a
              href="#"
              className="text-start bg-black rounded-lg w-fit text-white px-5 py-2 mt-5 transition-colors duration-300"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;