import React from "react";
import { Link } from "react-router-dom";

const CustomLink = ({ to, children, className = "", ...props }) => {
  return (
    <Link
      to={to}
      className={`custom-link sophia-pro-font ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
