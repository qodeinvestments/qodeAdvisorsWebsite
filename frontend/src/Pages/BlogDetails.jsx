import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faRss } from "@fortawesome/free-solid-svg-icons";

// Dummy data for a single blog post
const dummyPost = {
  title: "The Future of AI in Healthcare",
  body: [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Artificial Intelligence is revolutionizing the healthcare industry. From diagnosis to treatment planning, AI is making significant strides in improving patient care and outcomes.",
        },
      ],
    },
    {
      _type: "block",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "AI in Diagnosis",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "AI algorithms can analyze medical images with incredible accuracy, often outperforming human radiologists in detecting certain conditions.",
        },
      ],
    },
    {
      _type: "block",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "Personalized Treatment Plans",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "By analyzing vast amounts of patient data, AI can help create highly personalized treatment plans, taking into account individual genetic makeup, lifestyle factors, and medical history.",
        },
      ],
    },
    {
      _type: "block",
      style: "blockquote",
      children: [
        {
          _type: "span",
          text: "The integration of AI in healthcare is not about replacing doctors, but about augmenting their capabilities and improving patient outcomes.",
        },
      ],
    },
  ],
  publishedAt: "2024-08-01",
  author: {
    name: "Dr. Jane Smith",
    bio: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "AI researcher and healthcare consultant with over 15 years of experience in the field.",
          },
        ],
      },
    ],
    authorImage: "https://example.com/jane-smith.jpg",
  },
  mainImage: "https://example.com/ai-healthcare.jpg",
};

const BlogDetails = () => {
  const { slug } = useParams();

  // In a real application, you would fetch the post based on the slug
  // For this example, we're using the dummy data regardless of the slug
  const post = dummyPost;

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function calculateReadDuration(blocks, wordsPerMinute = 200) {
    // ... (keep the existing function)
  }

  const duration = calculateReadDuration(post.body);

  return (
    <div className="mx-auto px-4 py-12 sophia-pro-font">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mt-20 mb-2 text-center">
          <p className="text-primary">
            {formatDate(post.publishedAt)} &#x2022; {duration} read
          </p>
        </div>
        <h1 className="text-4xl sophia-pro-bold-font mb-12">{post.title}</h1>

        <img
          src={post.mainImage}
          alt={post.title}
          className="w-full object-cover h-auto mb-8"
        />

        {post.body.map((block, index) => {
          switch (block.style) {
            case "h1":
              return (
                <h1 key={index} className="md:text-lg my-3 text-[#151e29]">
                  {block.children[0].text}
                </h1>
              );
            case "h2":
              return (
                <h2 key={index} className="md:text-lg my-2 text-[#151e29]">
                  {block.children[0].text}
                </h2>
              );
            case "h3":
              return (
                <h3 key={index} className="md:text-lg my-1 text-[#151e29]">
                  {block.children[0].text}
                </h3>
              );
            case "normal":
              return (
                <p key={index} className="md:text-lg leading-relaxed my-5">
                  {block.children[0].text}
                </p>
              );
            case "blockquote":
              return (
                <blockquote
                  key={index}
                  className="border-l-4 md:text-lg pl-4 my-20"
                >
                  {block.children[0].text}
                </blockquote>
              );
            default:
              return (
                <p key={index} className="md:text-lg leading-relaxed my-5">
                  {block.children[0].text}
                </p>
              );
          }
        })}

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
              <p className="text-md">{post.author.name}</p>
              {post.author.bio && <p>{post.author.bio[0].children[0].text}</p>}
            </div>
          </div>
        )}

        <div className="bg-white my-5 p-10 rounded-lg shadow-md text-center">
          <h3 className="md:text-lg text-black">Subscribe</h3>
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
          <h3 className="text-md text-black mt-8 mb-4">Follow Us</h3>
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
