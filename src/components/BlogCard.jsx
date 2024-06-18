import React from "react";
import { Link } from "react-router-dom";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

function BlogCard({
  title,
  summary,
  readTime,
  detailLink,
  mainImage,
  author,
  authorImage,
  publishedAt,
}) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function calculateReadDuration(blocks, wordsPerMinute = 200) {
    if (!Array.isArray(blocks) || blocks.length === 0) {
      return "0 minutes";
    }

    const textContent = blocks
      .filter(
        (block) => block._type === "block" && Array.isArray(block.children)
      )
      .map((block) =>
        block.children
          .filter(
            (child) => child._type === "span" && typeof child.text === "string"
          )
          .map((child) => child.text)
          .join(" ")
      )
      .join(" ");

    if (!textContent.trim().length) {
      return "0 minutes";
    }

    const words = textContent
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .split(/\s+/)
      .filter(Boolean);
    const wordCount = words.length;
    const readingTimeMinutes = wordCount / wordsPerMinute;
    const roundedMinutes = Math.round(readingTimeMinutes);

    if (roundedMinutes === 0) {
      return "less than a min";
    } else if (roundedMinutes === 1) {
      return "1 min";
    } else {
      return `${roundedMinutes} min`;
    }
  }

  const duration = calculateReadDuration(summary.props.blocks);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="overflow-hidden transition-transform duration-500 max-w-[400px] hover:shadow-lg bg-white graphik-font-regular hover:scale-105 rounded-md"
      >
        <Link to={`${detailLink}`}>
          <div className="flex flex-col justify-between h-full p-6">
            <div className="flex flex-col flex-grow">
              <div className="mb-auto">
                <span className="text-primary-dark font-bold text-sm">
                  Blog
                </span>
                <h3 className="text-xl font-semibold text-[#151E28] multiline-underline typewriter-font mb-2 relative overflow-hidden text-ellipsis">
                  {title}
                  <span className="underline"></span>
                </h3>
                <span className="text-gray-500 text-sm block mb-2">
                  &#x2022; {duration} read
                </span>
              </div>
              <p className="text-gray-600 grayscale transition-filter duration-300 hover:grayscale-0 line-clamp-3">
                {summary}
              </p>
            </div>
            <div className="flex text-primary-dark items-center justify-between">
              <Link
                to={detailLink}
                className="transition-opacity duration-300 opacity-0 hover:opacity-100 arrow-link text-sm"
              >
                Continue Reading
              </Link>
              <div>
                <p className="text-xs">{formatDate(publishedAt)}</p>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
}

export default BlogCard;
