import axios from "axios";
import { useState, useEffect } from "react";

const BASE_URL = "https://blogs.qodeinvest.com/ghost/api/content";

export const useReadingArticles = () => {
  const [blogs, setBlogs] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const key = import.meta.env.VITE_GHOST_BLOG_KEY;
        const url = `${BASE_URL}/posts/?key=${key}&filter=tag:reading-articles&include=tags`;
        const response = await axios.get(url);
        const data = response.data;

        // Find all unique internal tags and create categories
        const internalTags = new Set();
        data.posts.forEach((post) => {
          post.tags.forEach((tag) => {
            if (tag.visibility === "internal" && tag.name.startsWith("#")) {
              internalTags.add(tag.name);
            }
          });
        });

        // Create category metadata for each internal tag
        const categoryList = Array.from(internalTags)
          .map((tagName) => ({
            id: tagName.substring(1), // Remove the # prefix
            title: formatTagTitle(tagName), // Convert #tag-name to "Tag Name"
            tag: tagName,
          }))
          .reverse(); // Reverse the order of categories

        // Group posts by categories
        const categorizedPosts = categoryList.reduce((acc, category) => {
          acc[category.id] = data.posts.filter((post) =>
            post.tags.some(
              (tag) => tag.name === category.tag && tag.visibility === "internal"
            )
          );
          return acc;
        }, {});

        setCategories(categoryList);
        setBlogs(categorizedPosts);
      } catch (err) {
        setError("Failed to fetch blog posts. Please try again later.");
        console.error("Error fetching blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, categories, isLoading, error };
};

// Helper function to format tag names into display titles
function formatTagTitle(tagName) {
  // Remove # prefix and convert kebab-case to Title Case
  return tagName
    .substring(1) // Remove #
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
