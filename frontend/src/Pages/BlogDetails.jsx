import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import Section from "../components/container/Section";
import { Spinner } from "@material-tailwind/react";
import "./Pages.css";
const BlogDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

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

  useEffect(() => {
    if (post && contentRef.current) {
      const iframes = contentRef.current.querySelectorAll("iframe");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const iframe = entry.target;
              const src = iframe.getAttribute("data-src");
              if (src) {
                iframe.setAttribute("src", src);
                iframe.removeAttribute("data-src");
                observer.unobserve(iframe);
              }
            }
          });
        },
        { rootMargin: "200px" }
      );

      iframes.forEach((iframe) => {
        const src = iframe.getAttribute("src");
        iframe.setAttribute("data-src", src);
        iframe.removeAttribute("src");

        const placeholder = document.createElement("div");
        placeholder.className = "iframe-placeholder";
        placeholder.innerHTML = `
          <div class="animate-pulse flex flex-col items-center justify-center w-full h-[400px] bg-gray-200 rounded">
            <div class="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        `;

        iframe.parentNode.insertBefore(placeholder, iframe);

        observer.observe(iframe);

        iframe.onload = () => {
          placeholder.remove();
          iframe.style.display = "block";
        };

        iframe.style.display = "none";
      });

      return () => {
        iframes.forEach((iframe) => observer.unobserve(iframe));
      };
    }
  }, [post]);

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
      <Helmet>
        <title>{post?.title || "Loading..."} - Qode Blog</title>
        <meta
          name="description"
          content={post?.excerpt || "Read this insightful blog post from Qode."}
        />
        {post?.feature_image && (
          <link rel="preload" as="image" href={post.feature_image} />
        )}
        {/* Add preload for common resources */}
      </Helmet>

      {loading ? (
        <div className="flex justify-center items-center h-40 mt-20">
          <Spinner />
        </div>
      ) : (
        <Section padding="none" className="mt-9 p-18">
          <div className="sm:max-w-[820px] mx-auto">
            <Heading className="text-mobileHeading sm:text-heading font-heading text-brown mb-6 text-center">
              {post.title}
            </Heading>
            <div className="text-center mb-18">
              <Text className="text-primary font-body text-sm">
                {formatDate(post.published_at)} &#x2022;{" "}
              </Text>
            </div>
            {post.feature_image && (
              <img
                src={post.feature_image}
                alt={post.title}
                className="w-full object-cover h-auto sm:mb-8 mb-5 rounded-lg"
              />
            )}
            <div
              ref={contentRef}
              className="post-content gh-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </Section>
      )}
    </>
  );
};

export default BlogDetails;
