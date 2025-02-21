import React from "react";
import { motion } from "framer-motion";
import Heading from "./common/Heading";
import { Link } from "react-router-dom";

function NewsCard({ title, excerpt, feature_image, slug, primary_author, date, externalLinks }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden transition-all duration-75 max-w-[485px] group p-2 sm:p-3 hover:bg-lightBeige rounded-lg hover:scale-105 flex flex-col h-full"
    >
      {externalLinks && externalLinks.length > 0 && (
        <div className="absolute top-2 right-2 bg-brown text-white text-xs px-2 py-1 rounded">
          Multi Source
        </div>
      )}
      <Link to={`/news/${encodeURIComponent(slug)}`} className="block flex-grow">
        <div className="h-full group overflow-hidden relative flex flex-col">
          {feature_image && (
            <div className="mb-2">
              <img
                src={feature_image}
                alt={title}
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          )}

          <div className="flex flex-col h-full">
            <div className="overflow-hidden h-[4.5em]">
              <Heading className="md:text-subheading text-mobileSubHeading text-brown group-hover:text-black font-bold line-clamp-2">
                {title}
              </Heading>
            </div>
            {date && (
              <span className="text-sm my-1 text-gray-500">{date}</span>
            )}
            <div className="flex-grow">
              <p className="text-body font-body">{excerpt}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              {primary_author && (
                <div className="flex items-center">
                  {primary_author.profile_image && (
                    <img
                      src={primary_author.profile_image}
                      alt={primary_author.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <span className="text-xs">{primary_author.name}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-2 items-center">
            <div className="group-hover:text-black -mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="44"
                height="44"
              >
                <path
                  d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <hr className="mt-1 border-t group-hover:border-beige border-lightBeige" />
        </div>
      </Link>
    </motion.div>
  );
}

export default NewsCard;
