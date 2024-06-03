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
              The idea of Convergence Investing
              <span className="underline"></span>{" "}
              {/* Crayon effect underline */}
            </h3>
            <span className="text-gray-500 text-sm block mb-2">
              &#x2022; 5 min read
            </span>
            <p className="text-gray-600 mb-10 grayscale transition-filter duration-300 hover:grayscale-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nisl nec tincidunt lacinia, nisl nunc aliquam nisl, eget
              aliquam nisl...
            </p>
            <a
              href="/"
              className="text-red-500 transition-opacity duration-300 opacity-0 hover:opacity-100 absolute bottom-6 left-6 arrow-link text-lg"
            >
              View details
            </a>
          </div>
        </div>
        <div className="bg-white overflow-hidden transition-transform duration-300 hover:scale-105 relative">
          <div className="p-6">
            <span className="text-red-500 font-bold text-sm">Blog</span>
            <h3 className="text-xl font-semibold typewriter-font mb-2 relative">
              Identifying Brokers: Screening Process
              <span className="underline"></span>{" "}
              {/* Crayon effect underline */}
            </h3>
            <span className="text-gray-500 text-sm block mb-2 ">
              &#x2022; 3 min read
            </span>
            <p className="text-gray-600 mb-10 grayscale transition-filter duration-300 hover:grayscale-0">
              In our recent read of “What i learned about investing from
              Darwin”, Pulak prasad talks about the idea of convergence
              investing. We like the way he talks about it and ....
            </p>
            <a
              href="/"
              className="text-red-500 transition-opacity duration-300 opacity-0 hover:opacity-100 absolute bottom-6 left-6 arrow-link text-lg"
            >
              View details
            </a>
          </div>
        </div>
        <div className="bg-white overflow-hidden transition-transform duration-300 hover:scale-105 relative">
          <div className="p-6">
            <span className="text-red-500 font-bold text-sm">Blog</span>
            <h3 className="text-xl font-semibold typewriter-font mb-2 relative">
              Angel One and the rise of options trading
              <span className="underline"></span>{" "}
              {/* Crayon effect underline */}
            </h3>
            <span className="text-gray-500 text-sm block mb-2">
              &#x2022; 7 min read
            </span>
            <p className="text-gray-600 mb-10 grayscale transition-filter duration-300 hover:grayscale-0">
              As a team, with our background in algo trading and Investing, we
              have a good understanding of the broking industry and how the
              inner workings of the business work...
            </p>
            <a
              href="/"
              className="text-red-500 transition-opacity duration-300 opacity-0 hover:opacity-100 absolute bottom-6 left-6 arrow-link text-lg"
            >
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
