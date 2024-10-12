import React from "react";
import Container from "./Container";
import GrayContainer from "./GrayContainer";

const Section = ({
  children,
  gray = false,
  className = "",
  containerClassName = "",
  innerBorder = false,
  padding = "",
  fullWidth = false,
}) => {
  const BaseComponent = gray ? GrayContainer : "div";
  const innerBorderClass = innerBorder ? "" : "";

  const paddingClasses = {
    none: "p-0",
    small: "p-2 md:p-3",
    normal: "p-2 sm:p-3 md:p-4",
    large: "p-2 sm:p-3 md:p-4 lg:p-5",
    extralarge: "p-2 sm:p-4 md:p-5 lg:p-6",
  };

  const paddingClass = paddingClasses[padding] || "";

  const widthClass = fullWidth
    ? "w-full"
    : "max-w-[93%] md:max-w-[90%] lg:max-w-[1066px] xl:max-w-[1386px]";

  // Check if the className contains any explicit margin classes for top or bottom
  const hasMarginTop = /mt-\d+/.test(className);
  const hasMarginBottom = /mb-\d+/.test(className);

  // Reduced default margin classes
  const defaultMarginTop = hasMarginTop ? "" : "mt-2 sm:mt-3 md:mt-4";
  const defaultMarginBottom = hasMarginBottom ? "" : "mb-2 sm:mb-3 md:mb-4";

  return (
    <BaseComponent className={`${className}`}>
      <Container
        className={`${widthClass} mx-auto ${defaultMarginTop} ${defaultMarginBottom} ${paddingClass} ${containerClassName}`}
      >
        <div className={`${innerBorderClass}`}>{children}</div>
      </Container>
    </BaseComponent>
  );
};

export default Section;