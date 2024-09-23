import React from "react";

const SectionContent = ({ children, className = "" }) => {
  return <div className={` ${className}`}>{children}</div>;
};

export default SectionContent;
