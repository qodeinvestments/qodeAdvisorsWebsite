import React from "react";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";

const GrowMoney = () => {
  const calendlyZoomLink = "https://calendly.com/tech-qodeinvest/30min";
  const calendlyOfficeLink =
    "https://calendly.com/tech-qodeinvest/physical-meeting";

  return (
    <div className=" bg-black flex  sm:p-7 p-2 items-center justify-center z-50  font-body">
      <div className=" text-center">
        <Text className="sm:text-subheading text-mobileSubHeading  text-beige font-heading mb-2">
          Schedule a meeting with the fund manager to discuss the financial
          goals and how you can reach there.
        </Text>

        <div className="flex flex-col items-center text-lightBeige justify-center gap-5  ">
          <div>
            <Text className="mb-2">
              In Mumbai? <br className="sm:visible hidden" />{" "}
              <span className=" text-body">
                We'll be happy to meet you in person
              </span>
            </Text>

            <Button
              href={calendlyOfficeLink}
              target="_blank"
              rel="noopener noreferrer"
              className=" bg-beige text-black"
            >
              Schedule Office Visit
            </Button>
          </div>
          <div>
            <Text className=" mb-1">
              Outside Mumbai? <br className="sm:visible hidden" />
              <span className="font-normal text-body">
                Let's get on a call.
              </span>
            </Text>

            <Button
              href={calendlyZoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className=" bg-beige text-black"
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
