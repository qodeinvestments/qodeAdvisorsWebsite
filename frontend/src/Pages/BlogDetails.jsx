import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet"; // Import Helmet
import { useParams } from "react-router-dom";
import axios from "axios";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import Section from "../components/container/Section";
import { Spinner } from "@material-tailwind/react";

const BlogDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  const key = import.meta.env.VITE_GHOST_BLOG_KEY;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://blogs.qodeinvest.com/ghost/api/v3/content/posts/slug/${slug}/?key=${key}&include=authors`
        );
        setPost(response.data.posts[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug, key]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-40 mt-20">
          {/* You can replace this with a spinner or any preloader UI */}
          <Spinner />
        </div>
      ) : (
        <>
          <Helmet>
            <title>{post.title} - Qode Investments Blog</title>
            <meta
              name="description"
              content={
                post.excerpt ||
                "Read this insightful blog post from Qode Investments."
              }
            />
            <meta
              name="keywords"
              content={`${post.title}, Qode Investments, investing, financial insights, blog`}
            />
            <meta
              name="author"
              content={post.primary_author?.name || "Qode Investments"}
            />
            {post.feature_image && (
              <meta property="og:image" content={post.feature_image} />
            )}
            <meta property="og:title" content={post.title} />
            <meta
              property="og:description"
              content={
                post.excerpt ||
                "Read this insightful blog post from Qode Investments."
              }
            />
            <meta property="og:type" content="article" />
          </Helmet>

          <Section padding="none" className="mt-9 p-18">
            <div className="sm:max-w-[820px] mx-auto">
              <div className="text-center mb-18">
                <Text className="text-primary font-body text-body">
                  {formatDate(post.published_at)} &#x2022; {post.reading_time}{" "}
                  min read
                </Text>
              </div>
              <Heading className="text-mobileHeading sm:text-heading font-heading text-brown mb-6 text-center">
                {post.title}
              </Heading>
              {post.feature_image && (
                <img
                  src={post.feature_image}
                  alt={post.title}
                  className="w-full object-cover h-auto sm:mb-8 mb-5 rounded-lg"
                />
              )}
              <div
                className="post-content gh-content"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </Section>
        </>
      )}
    </>
  );
};

export default BlogDetails;
