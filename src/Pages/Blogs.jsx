import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Container, GrayContainer } from "../components";
import sanityClient, { createClient } from "@sanity/client";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { Spinner } from "@material-tailwind/react";
import { CustomSpinner } from "../components/Spinner";

// ... (Client and urlFor function setup)
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
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] | order(publishedAt desc) {
          title,
          body,
          mainImage,
          "readTime": readTime,
          "detailLink": slug.current,
          author->{ name, bio, "authorImage": image.asset->url },
          publishedAt
        }`
      )
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CustomSpinner />;
  }

  return (
    <Container>
      <div className=" graphik-font-regular py-12 md:py-44">
        <div className="flex flex-col items-center">
          <h1 className="text-primary-dark graphik-font-medium text-4xl md:text-4xl font-bold mb-6 text-center">
            Welcome to Our Blog
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl text-center">
            Explore our collection of insightful articles and stay up-to-date
            with the latest trends and best practices in the industry.
          </p>
        </div>
      </div>
      <div className=" mb-24  grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-3">
        {posts.map((post) => {
          const authorBioText = post.author.bio[0].children[0].text;
          return (
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
              readTime={post.readTime}
              detailLink={`/blogs/${post.detailLink}`}
              author={post.author}
              authorImage={post.author.authorImage}
              bio={authorBioText}
              publishedAt={post.publishedAt}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Blogs;
