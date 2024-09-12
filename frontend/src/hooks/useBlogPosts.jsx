// src/hooks/useBlogPosts.js
import { useState, useEffect } from "react";
import fetchBlogPosts from "../services/api/getBlogData";

const useBlogPosts = (limit = 3) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await fetchBlogPosts.fetchBlogPosts(limit);
        setPosts(fetchedPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);

  return { posts, loading, error };
};

export default useBlogPosts;
