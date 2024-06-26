import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Container } from "../components";
import { Link } from "react-router-dom";
import { createClient } from "@sanity/client";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
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
const serializers = {
  types: {
    block: (props) => {
      switch (props.node.style) {
        case "h1":
          return <h1>{props.children}</h1>;
        case "h2":
          return <h2>{props.children}</h2>;
        default:
          return <p>{props.children}</p>;
      }
    },
  },
};

const RelatedArticles = ({ strategySlug, limit = 3 }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!strategySlug) {
      setError("Strategy slug is missing");
      console.log(strategySlug);
      setLoading(false);
      return;
    }
    client
      .fetch(
        `*[_type == "post" && references(*[_type=="strategy" && slug.current == $strategySlug]._id)] | order(publishedAt desc)[0...$limit] {
          _id,
          title,
          body,
          mainImage,
          "readTime": readTime,
          "detailLink": slug.current,
          author->{ name, bio, "authorImage": image.asset->url },
          publishedAt
        }`,
        { strategySlug, limit }
      )
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch related articles");
        setLoading(false);
      });
  }, [strategySlug, limit]);

  if (loading) {
    return <CustomSpinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-2xl text-center my-20">
        No related articles found.
      </div>
    );
  }

  return (
    <Container>
      <div className="py-10">
        <h2 className="text-3xl inter-font font-bold text-[#151E28] mb-6">
          Related Articles
        </h2>
        {/* <p className="text-2xl">
          Check out our latest blog posts on investing and portfolio management.
        </p> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const authorBioText =
              post.author?.bio?.[0]?.children?.[0]?.text ?? "";
            return (
              <BlogCard
                key={post._id}
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
                authorImage={post.author?.authorImage}
                bio={authorBioText}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default RelatedArticles;
