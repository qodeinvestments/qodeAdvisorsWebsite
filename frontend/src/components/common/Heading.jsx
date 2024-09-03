import React from "react";

const Heading = ({ level = 1, children, className = "", ...props }) => {
  const Tag = `h${level}`;
  return (
    <Tag className={`sophia-pro-bold-font ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;
