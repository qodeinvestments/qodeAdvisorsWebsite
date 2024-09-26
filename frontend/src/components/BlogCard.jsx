import React from "react";
import { faArrowRight, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Text from "./common/Text";
import Heading from "./common/Heading";
import CustomLink from "./common/CustomLink";
function BlogCard({
  html,
  title,
  excerpt,
  feature_image,
  reading_time,
  slug,
  primary_author,
  published_at,
}) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="overflow-hidden transition-all  duration-75  max-w-[485px] group sm:p-3 hover:bg-lightBeige hover:scale-105 flex flex-col"
    >
      <CustomLink to={`/blogs/${slug}`} className="block flex-grow">
        <div className="h-full group overflow-hidden  relative flex flex-col">
          {feature_image && (
            <img
              src={feature_image}
              alt={title}
              className="w-full h-48 object-cover mb-4"
            />
          )}
          <div className="transition-all  flex flex-col h-full">
            <div className="mb-auto">
              <Heading className="md:sm:text-subheading text-mobileSubHeading text-brown group-hover:text-black font-bold  mb-2 relative overflow-hidden text-ellipsis">
                {title}
              </Heading>
            </div>
            <Text className="text-body line-clamp-6   ">{excerpt}</Text>
            <div className="flex items-center justify-between mt-4">
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
              <div className="flex items-center justify-end  w-full ">
                {/* <div className="group-hover:text-black">
                  <FontAwesomeIcon icon={faClock} className="mr-1" />
                  <span className="text-xs">{reading_time} min read</span>
                </div> */}
                <div className="self-end sm:text-right group-hover:text-black ">
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
            </div>
          </div>
          {/* <div className="absolute bottom-0 left-0 right-0 px-6 py-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
            <CustomLink to={`/blogs/${slug}`} className="text-brown">
              Continue Reading <FontAwesomeIcon icon={faArrowRight} />
            </CustomLink>
          </div> */}
          <hr className="mt-2" />
        </div>
      </CustomLink>
    </motion.div>
  );
}

export default BlogCard;
