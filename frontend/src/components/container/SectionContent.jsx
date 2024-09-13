import React from "react";

const SectionContent = ({ children, className = "", withBorder = false }) => {
  const borderClass = withBorder ? "border border-brown" : "";

  return (
    <div className={`py-2 sm:py-3 md:py-4 ${borderClass} ${className}`}>
      {children}
    </div>
  );
};

export default SectionContent;
