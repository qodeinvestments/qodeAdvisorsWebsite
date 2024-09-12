import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Container } from "../components";
import axios from "axios";

// Dummy data for 9 blog posts
// const dummyPosts = [
//   {
//     title: "The Future of AI in Healthcare",
//     body: "Artificial Intelligence is revolutionizing the healthcare industry...",
//     mainImage: "https://example.com/ai-healthcare.jpg",
//     readTime: "5 min read",
//     detailLink: "future-of-ai-in-healthcare",
//     author: {
//       name: "Dr. Jane Smith",
//       bio: "AI researcher and healthcare consultant",
//       authorImage: "https://example.com/jane-smith.jpg",
//     },
//     publishedAt: "2024-08-01",
//   },
//   {
//     title: "Sustainable Living: Small Changes, Big Impact",
//     body: "Discover how small everyday changes can lead to a more sustainable lifestyle...",
//     mainImage: "https://example.com/sustainable-living.jpg",
//     readTime: "4 min read",
//     detailLink: "sustainable-living-small-changes",
//     author: {
//       name: "Alex Green",
//       bio: "Environmental activist and writer",
//       authorImage: "https://example.com/alex-green.jpg",
//     },
//     publishedAt: "2024-07-28",
//   },
//   {
//     title: "The Rise of Remote Work: Challenges and Opportunities",
//     body: "Explore the pros and cons of the growing trend of remote work...",
//     mainImage: "https://example.com/remote-work.jpg",
//     readTime: "6 min read",
//     detailLink: "rise-of-remote-work",
//     author: {
//       name: "Sam Johnson",
//       bio: "HR consultant and workplace strategist",
//       authorImage: "https://example.com/sam-johnson.jpg",
//     },
//     publishedAt: "2024-07-25",
//   },
//   {
//     title: "Cybersecurity in the Age of IoT",
//     body: "As IoT devices proliferate, learn about the new challenges in cybersecurity...",
//     mainImage: "https://example.com/iot-security.jpg",
//     readTime: "7 min read",
//     detailLink: "cybersecurity-iot-age",
//     author: {
//       name: "Emily Chen",
//       bio: "Cybersecurity expert and tech writer",
//       authorImage: "https://example.com/emily-chen.jpg",
//     },
//     publishedAt: "2024-07-22",
//   },
//   {
//     title: "The Psychology of Productivity",
//     body: "Uncover the psychological principles behind high productivity...",
//     mainImage: "https://example.com/productivity-psychology.jpg",
//     readTime: "5 min read",
//     detailLink: "psychology-of-productivity",
//     author: {
//       name: "Dr. Michael Brown",
//       bio: "Psychologist and productivity coach",
//       authorImage: "https://example.com/michael-brown.jpg",
//     },
//     publishedAt: "2024-07-19",
//   },
//   {
//     title: "Blockchain Beyond Cryptocurrency",
//     body: "Explore the diverse applications of blockchain technology beyond digital currencies...",
//     mainImage: "https://example.com/blockchain-apps.jpg",
//     readTime: "8 min read",
//     detailLink: "blockchain-beyond-crypto",
//     author: {
//       name: "Sophia Lee",
//       bio: "Blockchain researcher and tech enthusiast",
//       authorImage: "https://example.com/sophia-lee.jpg",
//     },
//     publishedAt: "2024-07-16",
//   },
//   {
//     title: "The Art of Mindfulness in a Digital Age",
//     body: "Learn how to practice mindfulness in our increasingly digital world...",
//     mainImage: "https://example.com/digital-mindfulness.jpg",
//     readTime: "6 min read",
//     detailLink: "mindfulness-digital-age",
//     author: {
//       name: "David Wong",
//       bio: "Mindfulness coach and digital wellness advocate",
//       authorImage: "https://example.com/david-wong.jpg",
//     },
//     publishedAt: "2024-07-13",
//   },
//   {
//     title: "The Evolution of E-commerce",
//     body: "Trace the journey of online shopping from its inception to current trends...",
//     mainImage: "https://example.com/ecommerce-evolution.jpg",
//     readTime: "7 min read",
//     detailLink: "ecommerce-evolution",
//     author: {
//       name: "Lisa Thompson",
//       bio: "E-commerce strategist and business analyst",
//       authorImage: "https://example.com/lisa-thompson.jpg",
//     },
//     publishedAt: "2024-07-10",
//   },
//   {
//     title: "Artificial Intelligence in Creative Industries",
//     body: "Discover how AI is transforming art, music, and other creative fields...",
//     mainImage: "https://example.com/ai-creativity.jpg",
//     readTime: "5 min read",
//     detailLink: "ai-creative-industries",
//     author: {
//       name: "Robert Kim",
//       bio: "AI researcher and digital artist",
//       authorImage: "https://example.com/robert-kim.jpg",
//     },
//     publishedAt: "2024-07-07",
//   },
//   {
//     title: "Artificial Intelligence in Creative Industries",
//     body: "Discover how AI is transforming art, music, and other creative fields...",
//     mainImage: "https://example.com/ai-creativity.jpg",
//     readTime: "5 min read",
//     detailLink: "ai-creative-industries",
//     author: {
//       name: "Robert Kim",
//       bio: "AI researcher and digital artist",
//       authorImage: "https://example.com/robert-kim.jpg",
//     },
//     publishedAt: "2024-07-07",
//   },
// ];

const Blogs = () => {
  const [blog, setBlog] = useState([]);
  const key = import.meta.env.VITE_GHOST_BLOG_KEY;
  const url = `https://blogs.qodeinvest.com/ghost/api/content/posts/?key=${key}`;
  // console.log(url);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data.posts);
        setBlog(response.data.posts);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [key]);
  return (
    <Container>
      <div className=" p-14 mx-auto">
        {/* <div className=" py-28 md:py-20"> */}
        {/* <div className="flex flex-col"> */}
        {/* <h1 className="text-primary-dark  text-4xl font-black mb-6 text-start">
              Blogs
            </h1> */}
        {/* <p className="text-gray-600 text-body md:text-subheading text-start">
              Explore our collection of insightful articles and stay up-to-date
              with the latest trends and best practices in the industry.
            </p> */}
        {/* </div> */}
        {/* </div> */}
        <div className=" mx-auto flex flex-wrap justify-center gap-44">
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
      </div>
    </Container>
  );
};

export default Blogs;
