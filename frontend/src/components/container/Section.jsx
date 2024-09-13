import React from "react";
import Container from "./Container";
import GrayContainer from "./GrayContainer";

const Section = ({
  children,
  gray = false,
  className = "",
  containerClassName = "",
  withBorder = false,
  innerBorder = false,
}) => {
  const BaseComponent = gray ? GrayContainer : "div";
  const borderClass = withBorder ? "border border-brown" : "";
  const innerBorderClass = innerBorder ? "border border-brown" : "";

  return (
    <BaseComponent className={` ${className}`}>
      <Container
        className={`max-w-7xl mt-2 ${borderClass} ${containerClassName}`}
      >
        <div className={`${innerBorderClass}`}>{children}</div>
      </Container>
    </BaseComponent>
  );
};

export default Section;
