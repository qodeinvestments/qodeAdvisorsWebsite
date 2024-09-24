import React from "react";
import Button from "../components/common/Button";
import Text from "../components/common/Text";

const GrowMoney = () => {
  const calendlyZoomLink = "https://calendly.com/tech-qodeinvest/30min";
  const calendlyOfficeLink =
    "https://calendly.com/tech-qodeinvest/physical-meeting";

  return (
    <div className="bg-black bg-opacity-10 backdrop-blur-md flex flex-col sm:p-7 p-18 items-center justify-center z-50 font-body">
      <div className="text-center w-full">
        {/* Heading Section */}
        <Text className="sm:text-subheading text-mobileSubHeading text-beige font-heading mb-2 px-2">
          Schedule a meeting with the fund manager to discuss financial goals
          and how you can reach them.
        </Text>

        <div className="flex flex-col items-center text-lightBeige justify-center gap-4 sm:gap-5 p-2">
          {/* Office Visit Section */}
          <div className="w-full">
            <Text className="mb-2 text-sm sm:text-body">
              In Mumbai? <br className="sm:visible hidden" />
              <span className="font-normal text-body">
                We’ll be happy to meet you in person.
              </span>
            </Text>

            <Button
              href={calendlyOfficeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-sm sm:text-body bg-beige text-black"
            >
              Schedule Office Visit
            </Button>
          </div>

          {/* Zoom Call Section */}
          <div className="w-full">
            <Text className="mb-1 text-sm sm:text-body">
              Outside Mumbai? <br className="sm:visible hidden" />
              <span className="font-normal text-body">
                Let’s get on a call.
              </span>
            </Text>

            <Button
              href={calendlyZoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-sm sm:text-body sm:w-auto bg-beige text-black"
            >
              Schedule Zoom Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowMoney;
