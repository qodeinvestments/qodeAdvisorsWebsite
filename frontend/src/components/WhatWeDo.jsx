import React from "react";
import reliable from "../assets/reliable.gif";
import repeatable from "../assets/repeat.gif";
import analysis from "../assets/analysis.gif";
import Text from "./common/Text";
import Heading from "./common/Heading";

const WhatWeDo = () => {
  return (
    <div className="text-center inter-font mt-10">
      <Heading level={2} className="md:text-subheading  ">
        What we do?
      </Heading>
      <Text className="text-gray-400 mt-4 md:text-subheading">
        Our Investment process is
      </Text>
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 space-y-8  md:space-y-0 md:space-x-28">
        <div className="flex border rounded-lg w-1/3   flex-col items-center text-center p-4 shadow-md">
          <div className="p-6 rounded-full">
            <img src={reliable} alt="Reliable" className="h-12 w-12" />
          </div>
          <Text className="mt-4 text-gray-700  md:text-subheading ">
            Reliable
          </Text>
          <Text>Consistent Returns through data driven strategies</Text>
        </div>
        <div className="flex border rounded-lg w-1/3   flex-col text-center items-center p-4 shadow-md">
          <div className="p-6 rounded-full">
            <img src={repeatable} alt="Repeatable" className="h-12 w-12" />
          </div>
          <Text className="mt-4 text-gray-700  md:text-subheading ">
            Repeatable
          </Text>
          <Text>
            {" "}
            Proven methods for continuous <br /> growth
          </Text>
        </div>
        <div className="flex border rounded-lg w-1/3   flex-col text-center items-center p-4 shadow-md">
          <div className="p-6 rounded-full">
            <img src={analysis} alt="Emotion Free" className="h-12 w-12" />
          </div>
          <Text className="mt-4 text-gray-700  md:text-subheading ">
            Emotion Free
          </Text>
          <Text>Objective investments, devoid of emotional bias</Text>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
