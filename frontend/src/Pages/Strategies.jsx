import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStrategyData from "../components/hooks/strategyCagr";
import { Container } from "../components";
import BookAMeet from "./BookAMeet";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import BlogCard from "../components/BlogCard";

const StrategyCard = ({ strategy, name, description, slug }) => {
  const { loading, error, calculateReturns } = useStrategyData(strategy);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const periods = ["1M", "3M", "6M", "1Y", "3Y", "5Y"];

  return (
    <Link
      to={slug}
      className="mb-20 p-14 pb-20 relative bg-[#fafafa] hover:bg-[#fff] hover:shadow-xl group transition duration-300"
    >
      <div className="transition-all duration-500  transform group-hover:-translate-y-4 ">
        <h1 className="text-2xl  font-black sophia-pro-font mt-4">{name}</h1>
        <p
          className="text-md leading-[2.5rem]"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
      <div className="flex flex-row justify-between items-end gap-16">
        {/* {periods.map((period) => (
      <div key={period} className="flex flex-col mt-9">
        <h1 className="text-lg sophia-pro-font">{period}</h1>
        <p className="text-lg mt-5">{calculateReturns(period)}</p>
      </div>
    ))} */}

        <div className="absolute bottom-0 left-0 right-0 px-14 py-10 transition-all duration-300 opacity-0 group-hover:opacity-100">
          <Link to={"/strategies/quant-growth-momentum"} className="text-black">
            <span className="relative z-10 text-red-600">
              Explore <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </Link>
        </div>
      </div>
    </Link>
  );
};

const Strategies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const strategies = [
    {
      id: "qgf",
      name: "Quality Fund",
      slug: "quant-growth-fund",
      description:
        "<p class='mb-4'>Invest in quality business. Get quality results.</p>",
    },
    {
      id: "momentum",
      name: "High-Return & Churn Fund",
      slug: "quant-growth-momentum",
      description: "<p class='mb-4'>Buy high sell higher.</p> ",
    },
    {
      id: "lowvol",
      name: "Steady Fund",
      slug: "low-vol-momentum",
      description: "<p class='mb-4'>Slow but Steady.</p>",
    },
  ];

  // const strategies = [
  //   {
  //     id: "qgf",
  //     name: "Quality Fund",
  //     slug: "quant-growth-fund",
  //     description:
  //       "<p class='mb-4'>Invest in quality business. Get quality results.</p>This strategy invests in 30 Quality businesses. (Quality Business - A company that generates a high return on invested capital). Principle - In the long run the stock price always matches the business performance.",
  //   },
  //   {
  //     id: "momentum",
  //     name: "High-Return & Churn Fund",
  //     slug: "quant-growth-momentum",
  //     description:
  //       "<p class='mb-4'>Buy high sell higher.</p>  This strategy invests in 30 businesses whose stock price has grown significantly and sells it before they start falling. Principle - The stock price tells the story before the actual story unfolds.",
  //   },
  //   {
  //     id: "lowvol",
  //     name: "Steady Fund",
  //     slug: "low-vol-momentum",
  //     description:
  //       "<p class='mb-4'>Slow but Steady.</p>This strategy invests in the 30 most stable stocks in the market. This strategy outperforms the Index with considerably lower risk.",
  //   },
  // ];
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
      title: "The Psychology of Productivity",
      body: "Uncover the psychological principles behind high productivity...",
      mainImage: "https://example.com/productivity-psychology.jpg",
      readTime: "5 min read",
      detailLink: "psychology-of-productivity",
      author: {
        name: "Dr. Michael Brown",
        bio: "Psychologist and productivity coach",
        authorImage: "https://example.com/michael-brown.jpg",
      },
      publishedAt: "2024-07-19",
    },
    {
      title: "Blockchain Beyond Cryptocurrency",
      body: "Explore the diverse applications of blockchain technology beyond digital currencies...",
      mainImage: "https://example.com/blockchain-apps.jpg",
      readTime: "8 min read",
      detailLink: "blockchain-beyond-crypto",
      author: {
        name: "Sophia Lee",
        bio: "Blockchain researcher and tech enthusiast",
        authorImage: "https://example.com/sophia-lee.jpg",
      },
      publishedAt: "2024-07-16",
    },
    {
      title: "The Art of Mindfulness in a Digital Age",
      body: "Learn how to practice mindfulness in our increasingly digital world...",
      mainImage: "https://example.com/digital-mindfulness.jpg",
      readTime: "6 min read",
      detailLink: "mindfulness-digital-age",
      author: {
        name: "David Wong",
        bio: "Mindfulness coach and digital wellness advocate",
        authorImage: "https://example.com/david-wong.jpg",
      },
      publishedAt: "2024-07-13",
    },
    {
      title: "The Evolution of E-commerce",
      body: "Trace the journey of online shopping from its inception to current trends...",
      mainImage: "https://example.com/ecommerce-evolution.jpg",
      readTime: "7 min read",
      detailLink: "ecommerce-evolution",
      author: {
        name: "Lisa Thompson",
        bio: "E-commerce strategist and business analyst",
        authorImage: "https://example.com/lisa-thompson.jpg",
      },
      publishedAt: "2024-07-10",
    },
    {
      title: "Artificial Intelligence in Creative Industries",
      body: "Discover how AI is transforming art, music, and other creative fields...",
      mainImage: "https://example.com/ai-creativity.jpg",
      readTime: "5 min read",
      detailLink: "ai-creative-industries",
      author: {
        name: "Robert Kim",
        bio: "AI researcher and digital artist",
        authorImage: "https://example.com/robert-kim.jpg",
      },
      publishedAt: "2024-07-07",
    },
    {
      title: "Artificial Intelligence in Creative Industries",
      body: "Discover how AI is transforming art, music, and other creative fields...",
      mainImage: "https://example.com/ai-creativity.jpg",
      readTime: "5 min read",
      detailLink: "ai-creative-industries",
      author: {
        name: "Robert Kim",
        bio: "AI researcher and digital artist",
        authorImage: "https://example.com/robert-kim.jpg",
      },
      publishedAt: "2024-07-07",
    },
  ];
  return (
    <Container>
      <div className="mx-auto p-4 md:p-14">
        <p className="text-lg sm:text-lg md:text-lg lg:text-4xl sophia-pro-font mt-10 sm:mt-16 md:mt-20 font-black mb-6 md:mb-4 ">
          All Strategies
        </p>
        <p className="text-md sm:text-lg md:text-lg lg:text-lg minion-pro-font font-thin mb-8 md:mb-20 ">
          One of these strategies will help you in reaching your financial goal
          based on how much risk you’re willing to take.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 sophia-pro-font mx-auto my-10 md:my-20">
          {strategies.map((strategy) => (
            <StrategyCard
              key={strategy.id}
              strategy={strategy.id}
              name={strategy.name}
              description={strategy.description}
              slug={strategy.slug}
            />
          ))}

          <div className="text-center mt-8 md:mt-10">
            <p className="my-4 text-lg md:text-lg lg:text-lg">
              Not sure which strategy is right for you? <br /> Sign Up to track
              our live portfolio.
            </p>
            <Link target="_blank" to={"https://dashboard.qodeinvest.com"}>
              <button className="bg-red-600 text-md sophia-pro-font md:text-lg lg:text-lg text-white py-3 md:py-4 lg:py-3 px-6 md:px-8 lg:px-6 mt-5 hover:bg-red-500 transition-colors">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <BookAMeet />
          </Modal>
        )}
      </div>
      {/* <h1 className="text-3xl sophia-pro-font mb-10 p-14 font-black">
        Related Blogs
      </h1> */}
      {/* <div className="mb-24 mx-auto flex flex-wrap p-6  justify-center gap-5">
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
      </div> */}
    </Container>
  );
};

export default Strategies;
