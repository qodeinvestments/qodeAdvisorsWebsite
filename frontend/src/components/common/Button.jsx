import React from "react";
import { Link } from "react-router-dom";
import CustomLink from "./CustomLink";
import Text from "./Text";

const Button = ({
  children,
  onClick,
  to,
  href,
  className = "",
  disabled = false,
  type = "button",
  isLoading = false,
  target,
  rel,
  isGlassmorphism = false, // New prop for conditional glassmorphism
}) => {
  const baseClassName = "dm-sans-font transition-colors text-black";

  // Check for padding classes in className prop
  const hasPadding =
    /\bp-\d+|\bpy-\d+|\bpx-\d+|\bpt-\d+|\bpb-\d+|\bpl-\d+|\bpr-\d+/.test(
      className
    );

  // Default padding if no padding classes are explicitly provided
  const defaultPadding = hasPadding ? "" : "py-18 px-1";

  // Conditionally apply Glassmorphism styles if isGlassmorphism is true
  const glassmorphismStyles = isGlassmorphism
    ? "bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 text-lightBeige hover:text-black shadow-lg"
    : "";

  const defaultClassName = `${baseClassName} hover:bg-opacity-90 bg-beige ${defaultPadding} text-body ${glassmorphismStyles}`;
  const fullClassName = `${defaultClassName} ${className}`;

  const content = isLoading ? (
    <>
      <Text>
        <span className="inline-flex items-center">Loading...</span>
      </Text>
    </>
  ) : (
    children
  );

  if (to) {
    return (
      <CustomLink to={to} className={fullClassName}>
        {content}
      </CustomLink>
    );
  }

  if (href) {
    return (
      <a href={href} className={fullClassName} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={fullClassName}
      disabled={disabled || isLoading}
      type={type}
    >
      {content}
    </button>
  );
};

export default Button;
