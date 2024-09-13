import React from "react";

const Heading = ({ level = 1, children, className = "", ...props }) => {
  const Tag = `h${level}`;
  return (
    <Tag
      className={`font-heading playfair-font-display  font-semibold text-brown ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Heading;
