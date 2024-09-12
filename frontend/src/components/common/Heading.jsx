import React from "react";

const Heading = ({ level = 1, children, className = "", ...props }) => {
  const Tag = `h${level}`;
  return (
    <Tag
      className={`playfair-display-font text-brown font-heading ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Heading;
