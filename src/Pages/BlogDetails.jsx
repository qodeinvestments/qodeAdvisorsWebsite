import React, { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faL, faRss } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { CustomSpinner } from "../components/Spinner";

const client = createClient({
  projectId: "8pot9lfd",
  dataset: "production",
  useCdn: true,
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const BlogDetails = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const { slug } = useParams();
  useEffect(() => {
    const fetchPostDetails = async () => {
      const query = `*[_type == 'post' && slug.current == $slug][0] {
        title,
        body,
        publishedAt,
        author->{
          name,
          bio,
          "authorImage": image.asset->url
        },
        mainImage,
      }`;
      const params = { slug };
      const result = await client.fetch(query, params);
      setPost(result);
      setLoading(false);
    };

    fetchPostDetails();
  }, [slug]);

  if (loading) {
    return <CustomSpinner />;
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
    <div className="mx-auto px-4 py-12  graphik-font-regular">
      <div className="rounded-lg max-w-5xl mx-auto p-8">
        <div className="mt-20 mb-2 text-center">
          <p>{formatDate(post.publishedAt)}</p>
        </div>
        <h1 className="text-4xl graphik-font-semibold text-center font-bold mb-12">
          {post.title}
        </h1>

        <img
          src={urlFor(post.mainImage).url()}
          alt={post.title}
          className="w-full object-cover h-auto mb-8"
        />
        <PortableText
          value={post.body}
          components={{
            block: {
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold my-3 text-[#151e29]">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-bold my-2 text-[#151e29]">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-semibold my-1 text-[#151e29]">
                  {children}
                </h3>
              ),
              normal: ({ children }) => (
                <p className="text-md leading-relaxed mb-2">{children}</p>
              ),
              blockquote: ({ children }) => (
                <blockquote className="italic border-l-4 border-gray-300 pl-4 my-4">
                  {children}
                </blockquote>
              ),
            },
            list: {
              bullet: ({ children }) => (
                <ul className="list-disc pl-5 my-3">{children}</ul>
              ),
              number: ({ children }) => (
                <ol className="list-decimal pl-5 my-3">{children}</ol>
              ),
              checkmarks: ({ children }) => (
                <ol className="list-none pl-5 my-3">
                  {children.map((child) => (
                    <li key={child.key}>✅ {child}</li>
                  ))}
                </ol>
              ),
            },
            listItem: {
              bullet: ({ children }) => <li className="ml-2">{children}</li>,
              number: ({ children }) => <li className="ml-2">{children}</li>,
              checkmarks: ({ children }) => (
                <li className="ml-2">✅ {children}</li>
              ),
            },
          }}
        />

        {post.author && (
          <div className="flex items-center mt-8 bg-gray-200 p-4 rounded-lg">
            {post.author.authorImage && (
              <img
                src={post.author.authorImage}
                alt={post.author.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
            )}
            <div>
              <p className="text-lg font-bold">{post.author.name}</p>
              {post.author.bio && <PortableText value={post.author.bio} />}
            </div>
          </div>
        )}
        <div className="bg-white my-5 p-10 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold text-black">Subscribe</h3>
          <p className="text-gray-400 mb-4">
            Subscribe to our newsletter to get the latest updates:
          </p>
          <form className="flex max-w-96 mx-auto">
            <input
              type="email"
              className="w-full px-4 py-2 rounded-l bg-gray-100 text-gray-400 border border-gray-600"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gray-600 text-white rounded-r"
            >
              <p>Subscribe</p>
            </button>
          </form>
          <h3 className="text-lg font-semibold text-black mt-8 mb-4">
            Follow Us
          </h3>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-200">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              <FontAwesomeIcon icon={faRss} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
