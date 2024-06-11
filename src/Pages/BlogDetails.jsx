import React, { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { useParams } from "react-router-dom"; // Import useParams

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
          return <h1 className="text-4xl font-bold my-6">{props.children}</h1>;
        case "h2":
          return <h2 className="text-3xl font-bold my-6">{props.children}</h2>;
        case "normal":
          return (
            <p className="text-lg leading-relaxed my-6">{props.children}</p>
          );
        default:
          return BlockContent.defaultSerializers.types.block(props);
      }
    },
  },
};

const BlogDetails = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams(); // Use useParams to get the slug

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const query = `*[_type == 'post' && slug.current == $slug][0] {
          title,
          body,
          author->{ // Fetch author details
            name,
            bio,
            "authorImage": image.asset->url // Fetch author image URL
          },
          mainImage,
          // Include other fields you want to fetch
        }`;
        const params = { slug }; // Use slug instead of postId
        const result = await client.fetch(query, params);
        setPost(result);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [slug]);

  if (!post) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="mx-auto px-4 py-12">
      <div className=" rounded-lg max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <img
          src={urlFor(post.mainImage).url()} // Ensure you're calling .url()
          alt={post.title}
          className="max-w-full h-auto mb-8"
        />
        <BlockContent
          blocks={post.body}
          serializers={serializers}
          projectId="8pot9lfd"
          dataset="production"
        />
        {/* Display author if needed */}
        {post.author && (
          <div className="flex items-center mt-8 bg-gray-100 p-4 rounded-lg">
            {post.author.authorImage && (
              <img
                src={post.author.authorImage}
                alt={post.author.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
            )}
            <div>
              <p className="text-lg font-bold">{post.author.name}</p>
              {/* {post.author.bio && (
                <p className="text-gray-600 mt-2">{post.author.bio}</p>
              )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
