import React from "react";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";

const BookAMeet = () => {
  const calendlyZoomLink = "https://calendly.com/tech-qodeinvest/30min";
  const calendlyOfficeLink =
    "https://calendly.com/tech-qodeinvest/physical-meeting";

  return (
    <div className="min-h-1/2 bg-white flex items-center  justify-center font-sans">
      <div className="w-full  px-6 py-3 text-center">
        <Heading
          level={1}
          className="text-4xl  mb-20 text-black font-black tracking-tight"
        >
          Schedule a Meeting
        </Heading>
        {/* <Text className="md:text-subheading mb-12 text-gray-700">
          Choose how you'd like to connect with us
        </Text> */}

        <div className="flex flex-col items-center justify-center  gap-5 mb-8">
          <Text className="text-2xl font-bold ">
            In Mumbai? <br />{" "}
            <span className=" font-normal text-body">
              We'll be happy to meet you in person
            </span>
          </Text>

          <Button
            href={calendlyOfficeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-1/2 "
          >
            Book Office Visit
          </Button>
          <Text className="text-2xl font-bold  mt-10">
            Outside Mumbai? <br />
            <span className=" font-normal text-body">
              {" "}
              Let's get on a call.
            </span>
          </Text>
          <Button
            href={calendlyZoomLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-1/2  "
          >
            Schedule Zoom Call
          </Button>
        </div>

        {/* <Text className="text-xs text-gray-600">
          Click on your preferred option to be directed to our Calendly
          scheduling page.
        </Text> */}
      </div>
    </div>
  );
};

export default BookAMeet;
