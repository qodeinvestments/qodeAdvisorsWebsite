import React from "react";

const Text = ({ children, className = "", ...props }) => (
  <p className={`minion-pro-font ${className}`} {...props}>
    {children}
  </p>
);

export default Text;
