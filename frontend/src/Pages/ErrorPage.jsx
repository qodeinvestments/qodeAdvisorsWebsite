import React from "react";
import { Link } from "react-router-dom";
import CustomLink from "../components/common/CustomLink";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl  text-gray-300">404</h1>
        <p className="md:text-subheading  text-gray-700 mt-4">Page Not Found</p>
        <p className="text-body text-gray-500 mt-2">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <CustomLink
          to={"/"}
          className="mt-6 inline-block px-6 py-3 text-xs  text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          Go back to Homepage
        </CustomLink>
      </div>
    </div>
  );
};

export default ErrorPage;
