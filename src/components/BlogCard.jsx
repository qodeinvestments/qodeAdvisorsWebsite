import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ title, summary, readTime, detailLink, mainImage }) {
  return (
    <div className="overflow-hidden transition-transform duration-300 hover:scale-105 relative ">
      <div className=" flex flex-col justify-between h-full">
        <div>
          <img
            src={mainImage}
            alt={title}
            className="w-full h-48 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold text-[#151E28] mb-2">{title}</h3>
          <span className="text-gray-500 text-sm">
            &#x2022; {readTime} min read
          </span>
          <p className="text-gray-600 mt-2 mb-4 truncate-text line-clamp-3">
            {summary}
          </p>
        </div>
        <Link
          to={`${detailLink}`}
          className="text-red-500 transition-opacity duration-300 cursor-pointer mt-4 self-end"
        >
          View details
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
