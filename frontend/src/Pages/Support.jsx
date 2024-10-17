import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Container } from "../components";
import axios from "axios";
import Section from "../components/container/Section";
import Heading from "../components/common/Heading";
import { Spinner } from "@material-tailwind/react";
import { Helmet } from "react-helmet"; // Import Helmet

const Support = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const key = import.meta.env.VITE_GHOST_BLOG_KEY;
  const url = `https://blogs.qodeinvest.com/ghost/api/content/posts/?key=${key}&filter=tag:qode-support`; // Corrected URL

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setBlog(response.data.posts);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // console.log(error);
      });
  }, [key]);
  return (
    <>
      <Helmet>
        <title>Qode Blogs - Insights on Data-Driven Investing</title>
        <meta
          name="description"
          content="Read the latest blogs and insights from Qode on data-driven investment strategies, market analysis, and wealth management tips."
        />
        <meta
          name="keywords"
          content="Qode blogs, investment strategies, wealth management, market analysis, data-driven investing"
        />
        <meta name="author" content="Qode" />
      </Helmet>
      <div className="mx-auto mt-8">
        <Section padding="none">
          <Heading
            isItalic
            className="text-center text-brown mb-4 text-heading font-heading"
          >
            Blogs
          </Heading>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              {/* You can replace this with a spinner or any preloader UI */}
              <Spinner />
            </div>
          ) : (
            <div className="mx-auto grid justify-center items-center gap-2 lg:grid-cols-3">
              {blog.map((post) => (
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
          )}
        </Section>
      </div>
    </>
  );
};

export default Support;
