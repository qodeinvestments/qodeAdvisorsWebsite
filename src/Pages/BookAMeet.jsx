import React from "react";

const BookAMeet = () => {
  const calendlyZoomLink = "https://calendly.com/tech-qodeinvest/30min";
  const calendlyOfficeLink =
    "https://calendly.com/tech-qodeinvest/physical-meeting";

  return (
    <div className="min-h-1/2 bg-white flex items-center graphik-font-regular justify-center font-sans">
      <div className="w-full max-w-2xl px-6 py-12 text-center">
        <h1 className="text-5xl  mb-4 text-black tracking-tight">
          Book a Meet
        </h1>
        <p className="text-xl mb-12 text-gray-700">
          Choose how you'd like to connect with us
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
          <a
            href={calendlyZoomLink}
            target="_blank"
            rel="noopener noreferrer"
            className="py-4 px-8 bg-blue-500 text-white  rounded-none hover:bg-white hover:text-blue-500 border-2 border-blue-500 transition duration-300"
          >
            Schedule Zoom Call
          </a>
          <a
            href={calendlyOfficeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="py-4 px-8 bg-red-500 text-white  rounded-none hover:bg-white hover:text-red-500 border-2 border-red-500 transition duration-300"
          >
            Book Office Visit
          </a>
        </div>

        <p className="text-sm text-gray-600">
          Click on your preferred option to be directed to our Calendly
          scheduling page.
        </p>
      </div>
    </div>
  );
};

export default BookAMeet;
