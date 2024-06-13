import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Container } from "../components";
import { Link } from "react-router-dom"; // Import Link for navigation
import sanityClient, { createClient } from "@sanity/client";
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

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] | order(publishedAt desc)[0...4] {
          title,
          body,
          mainImage,
          "readTime": readTime,
          "detailLink": slug.current,
          author->{ name,bio,"authorImage": image.asset->url },
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
      <div className="py-12">
        <h2 className="text-3xl inter-font font-bold text-center text-[#151E28] mb-8">
          Recent Blogs
        </h2>
        <div className="mb-8 px-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <div className="text-center">
          <Link
            to="/blogs"
            className="text-white bg-[#151E28] hover:bg-[#0d1117] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Blogs;
