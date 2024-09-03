import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "./common/Button";
import Heading from "./common/Heading";

const Blogs = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const key = import.meta.env.VITE_GHOST_BLOG_KEY;
  const url = `https://blogs.qodeinvest.com/ghost/api/content/posts/?key=${key}&limit=3`;

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await axios.get(url);
        setLatestPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch blog posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);
  // console.log(latestPosts);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Heading
        level={2}
        className="text-3xl font-bold  text-center text-[#151E28] mb-8"
      >
        Related Blogs
      </Heading>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestPosts.map((post) => (
          <BlogCard
            key={post.id}
            html={post.html}
            title={post.title}
            excerpt={post.excerpt}
            // feature_image={post.feature_image}
            reading_time={post.reading_time}
            slug={post.slug}
            primary_author={post.primary_author}
            published_at={post.published_at}
          />
        ))}
      </div>
      <div className="text-center">
        <Button to="/blogs">View All Blogs</Button>
      </div>
    </>
  );
};

export default Blogs;
