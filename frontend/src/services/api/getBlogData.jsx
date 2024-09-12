import axios from "axios";

const BASE_URL = "https://blogs.qodeinvest.com/ghost/api/content";

export const fetchBlogPosts = async (limit = 3) => {
  const key = import.meta.env.VITE_GHOST_BLOG_KEY;
  const url = `${BASE_URL}/posts/?key=${key}&limit=${limit}`;

  try {
    const response = await axios.get(url);
    return response.data.posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error("Failed to fetch blog posts. Please try again later.");
  }
};

export default { fetchBlogPosts };
