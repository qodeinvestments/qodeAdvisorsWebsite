import React from "react";
import { Link } from "react-router-dom";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    return date.toLocaleDateString("en-US", {
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
      <div className="overflow-hidden transition-transform duration-500  max-w-[300px] hover:shadow-lg bg-white graphik-font-regular hover:scale-105 rounded-md">
        <Link to={`${detailLink}`}>
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="relative">
                <img
                  src={mainImage}
                  alt={title}
                  className="w-full h-48 md:h-48 object-cover"
                />
                <div className=""></div>
              </div>
              <div className="p-4">
                <h3 className="text-xl  graphik-font-semibold font-bold text-[#151E28] mb-2">
                  {title}
                </h3>

                <p className="text-gray-400 text-sm mt-2 mb-4 line-clamp-3">
                  {summary}
                </p>
              </div>
            </div>
            <div className="flex text-gray-400 px-4 items-center justify-between mb-4">
              <div className="">
                <span className="text-xs">
                  <FontAwesomeIcon icon={faClock} /> &nbsp; {duration} read
                </span>
              </div>
              <div>
                <p className="text-xs">{formatDate(publishedAt)}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default BlogCard;
