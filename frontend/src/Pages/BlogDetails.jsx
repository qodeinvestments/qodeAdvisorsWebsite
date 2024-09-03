import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Header } from "../components";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";

const BlogDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const key = import.meta.env.VITE_GHOST_BLOG_KEY;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://blogs.qodeinvest.com/ghost/api/content/posts/slug/${slug}/?key=${key}&include=authors`
        );
        setPost(response.data.posts[0]);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [slug, key]);

  if (!post) {
    return <div>Loading...</div>;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="mx-auto px-4 py-12 ">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mt-20 mb-2 text-center">
          <Text className="text-primary">
            {formatDate(post.published_at)} &#x2022; {post.reading_time} min
            read
          </Text>
        </div>
        <Heading level={1} className="text-4xl mb-12">
          {post.title}
        </Heading>

        {post.feature_image && (
          <img
            src={post.feature_image}
            alt={post.title}
            className="w-full object-cover h-auto mb-8"
          />
        )}

        <div
          className="post-content  leading-relaxed my-5"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {post.primary_author && (
          <div className="flex items-center mt-8 bg-gray-200 p-4 rounded-lg">
            {post.primary_author.profile_image && (
              <img
                src={post.primary_author.profile_image}
                alt={post.primary_author.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
            )}
            <div>
              <Text className="">{post.primary_author.name}</Text>
              {post.primary_author.bio && (
                <Text>{post.primary_author.bio}</Text>
              )}
            </div>
          </div>
        )}

        {/* Subscribe and social media section remains unchanged */}
      </div>
    </div>
  );
};

export default BlogDetails;
