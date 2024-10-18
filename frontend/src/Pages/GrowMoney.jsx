import React from "react";
import Button from "../components/common/Button";
import Text from "../components/common/Text";

const GrowMoney = () => {
  const VITE_GOOGLE_MEET_URL = import.meta.env.VITE_GOOGLE_MEET_URL;
  const VITE_INPERSON_URL = import.meta.env.VITE_INPERSON_URL;

  return (
    <div className="bg-black bg-opacity-10 backdrop-blur-md flex flex-col sm:p-5 lg:p-4 p-3 items-center justify-center z-50 font-body">
      <div className="text-center w-full">
        {/* Heading Section */}
        <Text className="sm:text-subheading text-mobileSubHeading text-beige font-heading mb-2 px-2">
          Schedule a meeting with our fund manager to discuss your investment
          goals and how you can reach them.
        </Text>

        <div className="flex flex-col items-center text-lightBeige justify-center gap-4 sm:gap-5 p-2 pb-1">
          {/* Office Visit Section */}
          <div className="w-full">
            {/* <Text className="mb-2 text-sm sm:text-body">In Mumbai?</Text> */}

            {/* <Button
              href={VITE_INPERSON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-sm sm:text-body bg-beige text-black"
            >
              Schedule Office Visit
            </Button> */}
          </div>

          {/* Zoom Call Section */}
          <div className="w-full">
            {/* <Text className="mb-1 text-sm sm:text-body">Outside Mumbai?</Text> */}

            <Button
              href={VITE_GOOGLE_MEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-sm sm:text-body sm:w-auto bg-beige text-black"
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowMoney;
