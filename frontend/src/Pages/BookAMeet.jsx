import React from "react";

const BookAMeet = () => {
  const calendlyZoomLink = "https://calendly.com/tech-qodeinvest/30min";
  const calendlyOfficeLink =
    "https://calendly.com/tech-qodeinvest/physical-meeting";

  return (
    <div className="min-h-1/2 bg-white flex items-center sophia-pro-font justify-center font-sans">
      <div className="w-full  px-6 py-3 text-center">
        <h1 className="text-4xl  mb-20 text-black font-black tracking-tight">
          Schedule a Meeting
        </h1>
        {/* <p className="md:text-lg mb-12 text-gray-700">
          Choose how you'd like to connect with us
        </p> */}

        <div className="flex flex-col items-center justify-center  gap-5 mb-8">
          <p className="text-2xl font-bold sophia-pro-font">
            In Mumbai? <br />{" "}
            <span className="minion-pro-font font-normal text-md">
              We'll be happy to meet you in person
            </span>
          </p>

          <a
            href={calendlyOfficeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="py-4 w-1/2 bg-red-600 text-white text-md rounded-none hover:bg-white hover:text-black     transition duration-300"
          >
            Book Office Visit
          </a>
          <p className="text-2xl font-bold sophia-pro-font mt-10">
            Outside Mumbai? <br />
            <span className="minion-pro-font font-normal text-md">
              {" "}
              Let's get on a call.
            </span>
          </p>
          <a
            href={calendlyZoomLink}
            target="_blank"
            rel="noopener noreferrer"
            className="py-4 w-1/2 bg-red-600 text-white text-md rounded-none hover:bg-white hover:text-black    transition duration-300"
          >
            Schedule Zoom Call
          </a>
        </div>

        {/* <p className="text-sm text-gray-600">
          Click on your preferred option to be directed to our Calendly
          scheduling page.
        </p> */}
      </div>
    </div>
  );
};

export default BookAMeet;
