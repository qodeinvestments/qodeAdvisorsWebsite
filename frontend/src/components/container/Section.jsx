import Container from "./Container";
import GrayContainer from "./GrayContainer";

const Section = ({ children, gray = false, className = "" }) => {
  const BaseComponent = gray ? GrayContainer : "div";
  return (
    <BaseComponent>
      <Container className={className}>{children}</Container>
    </BaseComponent>
  );
};

export default Section;
