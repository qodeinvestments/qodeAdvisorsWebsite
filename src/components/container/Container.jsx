import React from "react";

const Container = ({ children }) => (
  <div className="mx-auto container lg:max-w-[65rem] px-4 sm:px-0 ">
    {children}
  </div>
);

export default Container;
