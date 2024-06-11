import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Container } from "../components";
import sanityClient, { createClient } from "@sanity/client";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "8pot9lfd",
  dataset: "production",
  useCdn: true, // Set to `false` for development purposes
});
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const serializers = {
  types: {
    block: (props) => {
      switch (props.node.style) {
        case "h1":
          return <h1>{props.children}</h1>;
        case "h2":
          return <h2>{props.children}</h2>;
        case "normal": // Default style
          return <p>{props.children}</p>;
        default:
          return BlockContent.defaultSerializers.types.block(props);
      }
    },
  },
};

const Blogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"]{
          title,
          body,
          mainImage,
          "readTime": readTime,
          "detailLink": slug.current
        }`
      )
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-r from-[#171E27] to-[#2C3E50] rounded-b-[3rem] py-12 md:py-52">
        <Container>
          <div className="flex flex-col items-start">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              Welcome to Our Blog
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Explore our collection of insightful articles and stay up-to-date
              with the latest trends and best practices in the industry.
            </p>
          </div>
        </Container>
      </div>
      <Container>
        <div className="mt-8 my-20 px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.detailLink}
              title={post.title}
              summary={
                <BlockContent
                  blocks={post.body}
                  serializers={serializers}
                  projectId="8pot9lfd"
                  dataset="production"
                />
              }
              mainImage={urlFor(post.mainImage)}
              readTime="6"
              detailLink={`/blogs/${post.detailLink}`}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Blogs;
