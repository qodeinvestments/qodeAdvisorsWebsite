import React from "react";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";

const BookAMeet = () => {
  const VITE_ZOOM_URL = import.meta.env.VITE_ZOOM_URL;
  const VITE_INPERSON_URL = import.meta.env.VITE_INPERSON_URL;

  return (
    <div className="relative bg-black bg-opacity-60 backdrop-blur-md flex sm:p-7 p-2 items-center justify-center z-50 font-body  shadow-lg">
      <div className="relative z-10 text-center">
        <Heading
          isItalic
          className="sm:text-semiheading text-mobileSemiHeading text-beige font-heading mb-2"
        >
          Schedule a Meeting
        </Heading>

        <div className="flex flex-col items-center text-lightBeige justify-center gap-5">
          <div>
            <Text className="mb-2">In Mumbai?</Text>

            <Button
              href={VITE_ZOOM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-beige text-black"
            >
              Schedule Office Visit
            </Button>
          </div>
          <div>
            <Text className="mb-2">Outside Mumbai?</Text>

            <Button
              href={VITE_INPERSON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-beige text-black"
            >
              Schedule Zoom Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAMeet;
