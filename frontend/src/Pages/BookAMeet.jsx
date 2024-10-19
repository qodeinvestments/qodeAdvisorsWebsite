import React from "react";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";

const BookAMeet = () => {
  const VITE_GOOGLE_MEET_URL = import.meta.env.VITE_GOOGLE_MEET_URL;
  const VITE_INPERSON_URL = import.meta.env.VITE_INPERSON_URL;

  return (
    <div className="relative bg-black bg-opacity-60 backdrop-blur-md flex sm:p-7 p-2 py-4 items-center justify-center z-50 font-body  shadow-lg">
      <div className="relative z-10 text-center">
        <Heading
          isItalic
          className="sm:text-semiheading text-mobileSemiHeading text-beige font-heading mb-2"
        >
          Schedule a Meeting
        </Heading>

        <div className="flex flex-col items-center text-lightBeige justify-center gap-18 sm:gap-18 p-2 pb-1">
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

export default BookAMeet;
