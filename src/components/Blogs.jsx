import React from 'react';

const Blogs = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 inter-font">
      <h2 className="text-3xl font-bold text-center mb-8">Recent Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white overflow-hidden transition-transform duration-300 hover:scale-105 relative">
          <div className="p-6">
            <span className="text-red-500 font-bold text-sm">Blog</span>
            <h3 className="text-xl font-semibold typewriter-font mb-2 relative">
              Blog Title 1
              <span className="underline"></span> {/* Crayon effect underline */}
            </h3>
            <p className="text-gray-600 mb-10 grayscale transition-filter duration-300 hover:grayscale-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
              nisl nec tincidunt lacinia, nisl nunc aliquam nisl, eget aliquam nisl...
            </p>
            <a href="/" className="text-red-500 transition-opacity duration-300 opacity-0 hover:opacity-100 absolute bottom-6 left-6 arrow-link text-lg">
              View details
            </a>
          </div>
        </div>
        <div className="bg-white overflow-hidden transition-transform duration-300 hover:scale-105 relative">
          <div className="p-6">
            <span className="text-red-500 font-bold text-sm">Blog</span>
            <h3 className="text-xl font-semibold typewriter-font mb-2 relative">
              Blog Title 1
              <span className="underline"></span> {/* Crayon effect underline */}
            </h3>
            <p className="text-gray-600 mb-10 grayscale transition-filter duration-300 hover:grayscale-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
              nisl nec tincidunt lacinia, nisl nunc aliquam nisl, eget aliquam nisl...
            </p>
            <a href="/" className="text-red-500 transition-opacity duration-300 opacity-0 hover:opacity-100 absolute bottom-6 left-6 arrow-link text-lg">
              View details
            </a>
          </div>
        </div>
        <div className="bg-white overflow-hidden transition-transform duration-300 hover:scale-105 relative">
          <div className="p-6">
            <span className="text-red-500 font-bold text-sm">Blog</span>
            <h3 className="text-xl font-semibold typewriter-font mb-2 relative">
              Blog Title 1
              <span className="underline"></span> {/* Crayon effect underline */}
            </h3>
            <p className="text-gray-600 mb-10 grayscale transition-filter duration-300 hover:grayscale-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
              nisl nec tincidunt lacinia, nisl nunc aliquam nisl, eget aliquam nisl...
            </p>
            <a href="/" className="text-red-500 transition-opacity duration-300 opacity-0 hover:opacity-100 absolute bottom-6 left-6 arrow-link text-lg">
              View details
            </a>
          </div>
        </div>
        {/* Repeat the same structure for other blogs */}
      </div>
    </div>
  );
};

export default Blogs;
