const SectionContent = ({ children, className = "" }) => (
  <div className={`py-8 sm:py-12 md:py-16 ${className}`}>{children}</div>
);
export default SectionContent;
