import React from "react";

const Sidebar = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
      <div className="relative max-w-xs w-full bg-white h-full flex flex-col transition-all duration-300 ease-in-out transform translate-x-0">
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <button
            type="button"
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.slug}
                className="block px-3 py-2 rounded-md text-base  text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
