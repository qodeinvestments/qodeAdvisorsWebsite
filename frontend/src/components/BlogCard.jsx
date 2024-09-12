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
      className="overflow-hidden transition-transform duration-75  max-w-[400px] hover:scale-105 flex flex-col"
    >
      <CustomLink to={`/blogs/${slug}`} className="block flex-grow">
        <div className="p-6 h-full group overflow-hidden relative flex flex-col">
          {feature_image && (
            <img
              src={feature_image}
              alt={title}
              className="w-full h-48 object-cover mb-4"
            />
          )}
          <div className="transition-all duration-500 transform group-hover:-translate-y-5 flex flex-col h-full">
            <div className="mb-auto">
              <span className="text-primary-dark text-xs">Blog</span>
              <Heading
                level={3}
                className="md:text-subheading text-black group-hover:text-brown font-bold  mb-2 relative overflow-hidden text-ellipsis"
              >
                {title}
              </Heading>
            </div>
            <Text className="text-body line-clamp-5 my-4">{excerpt}</Text>
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
              <div className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="mr-1" />
                <span className="text-xs">{reading_time} min read</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
            <CustomLink to={`/blogs/${slug}`} className="text-brown">
              Continue Reading <FontAwesomeIcon icon={faArrowRight} />
            </CustomLink>
          </div>
        </div>
      </CustomLink>
      <hr className="w-full" />
    </motion.div>
  );
}

export default BlogCard;
