import React from "react";

const Text = ({ children, className = "", ...props }) => (
  <p className={`dm-sans-font text-body ${className}`} {...props}>
    {children}
  </p>
);

export default Text;
