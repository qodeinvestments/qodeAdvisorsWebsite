import urlBuilder from "@sanity/image-url";

const ImageComponent = ({ node }) => {
  const imageUrl = urlBuilder()
    .image(node)
    .width(node.isInline ? 100 : 800)
    .fit("max")
    .auto("format")
    .url();

  return (
    <img
      src={imageUrl}
      alt={node.alt || " "}
      loading="lazy"
      style={{
        display: node.isInline ? "inline-block" : "block",
        aspectRatio: node.width / node.height,
      }}
    />
  );
};

export default ImageComponent;
