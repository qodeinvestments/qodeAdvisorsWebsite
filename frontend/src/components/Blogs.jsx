import React from "react";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";

// Commented out Sanity-related imports
// import sanityClient, { createClient } from "@sanity/client";
// import BlockContent from "@sanity/block-content-to-react";
// import imageUrlBuilder from "@sanity/image-url";
// import { CustomSpinner } from "../components/Spinner";

// Commented out Sanity client configuration
//   projectId: "8pot9lfd",
//   dataset: "production",
//   useCdn: true,
// });

// const builder = imageUrlBuilder(client);
// function urlFor(source) {
//   return builder.image(source);
// }

// Dummy data for 3 blog posts
const dummyPosts = [
  {
    title: "The Future of AI in Healthcare",
    body: "Artificial Intelligence is revolutionizing the healthcare industry...",
    mainImage: "https://example.com/ai-healthcare.jpg",
    readTime: "5 min read",
    detailLink: "future-of-ai-in-healthcare",
    author: {
      name: "Dr. Jane Smith",
      bio: "AI researcher and healthcare consultant",
      authorImage: "https://example.com/jane-smith.jpg",
    },
    publishedAt: "2024-08-01",
  },
  {
    title: "Sustainable Living: Small Changes, Big Impact",
    body: "Discover how small everyday changes can lead to a more sustainable lifestyle...",
    mainImage: "https://example.com/sustainable-living.jpg",
    readTime: "4 min read",
    detailLink: "sustainable-living-small-changes",
    author: {
      name: "Alex Green",
      bio: "Environmental activist and writer",
      authorImage: "https://example.com/alex-green.jpg",
    },
    publishedAt: "2024-07-28",
  },
  {
    title: "The Rise of Remote Work: Challenges and Opportunities",
    body: "Explore the pros and cons of the growing trend of remote work...",
    mainImage: "https://example.com/remote-work.jpg",
    readTime: "6 min read",
    detailLink: "rise-of-remote-work",
    author: {
      name: "Sam Johnson",
      bio: "HR consultant and workplace strategist",
      authorImage: "https://example.com/sam-johnson.jpg",
    },
    publishedAt: "2024-07-25",
  },
];

const Blogs = () => {
  return (
    <div className="py-20 p-14">
      <h2 className="text-3xl font-bold sophia-pro-font text-center text-[#151E28] mb-8">
        Related Blogs
      </h2>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyPosts.map((post) => (
          <BlogCard
            key={post.detailLink}
            title={post.title}
            summary={post.body}
            mainImage={post.mainImage}
            readTime={post.readTime}
            detailLink={`/blogs/${post.detailLink}`}
            author={post.author}
            authorImage={post.author.authorImage}
            bio={post.author.bio}
            publishedAt={post.publishedAt}
          />
        ))}
      </div>
      <div className="text-center">
        <Link
          to="/blogs"
          className="text-white bg-red-600 sophia-pro-font text-md hover:bg-red-500 px-5 py-2.5 text-center mr-2 mb-2"
        >
          View All Blogs
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
