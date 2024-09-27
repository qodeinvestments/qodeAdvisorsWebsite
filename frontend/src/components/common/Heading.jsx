import React from "react";

const Heading = ({
  level = 1,
  children,
  className = "",
  isItalic = false,
  ...props
}) => {
  const Tag = `h${level}`;
  return (
    <Tag
      className={`font-heading playfair-font-display  text-mobileHeading sm:text-heading font-semibold ${
        isItalic ? "italic" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Heading;
