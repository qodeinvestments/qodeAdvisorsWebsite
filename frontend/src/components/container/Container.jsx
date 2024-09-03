import React from "react";

const Container = ({ children, className = "" }) => (
  <div
    className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 ${className}`}
  >
    {children}
  </div>
);

export default Container;
