// Add this near your other imports
import { useEffect, useState } from "react";
import { Parallax } from "react-parallax"; // Import Parallax component
import principle from "../assets/principle.jpg"; // Ensure the correct path
import Heading from "./common/Heading";
import Text from "./common/Text";
import Button from "./common/Button";

// Add this function inside your Home component, before the return statement
const InvestmentPrinciples = () => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if the device is iOS
    const checkIsIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    setIsIOS(checkIsIOS());
  }, []);

  return isIOS ? (
    // iOS fallback
    <div className="mb-6 mt-7">
      <div
        className="relative w-full min-h-[585px] bg-cover flex items-center justify-center"
        style={{
          backgroundImage: `url(${principle})`,
          backgroundPosition: "65% 20%",
        }}
      >
        <ParallaxContent />
      </div>
    </div>
  ) : (
    // Normal Parallax for other devices
    <Parallax className="mb-6 mt-7" bgImage={principle} strength={200}>
      <div
        className="relative w-full min-h-[585px] sm:min-h-[485px] bg-fixed bg-right sm:bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage: `url(${principle})`,
          backgroundPosition: "65% 20%",
        }}
      >
        <ParallaxContent />
      </div>
    </Parallax>
  );
};

// Add this component definition as well
const ParallaxContent = () => (
  <>
    <div className="absolute inset-0 bg-black opacity-35"></div>
    <div className="relative z-10 w-full max-w-[93%] lg:max-w-[1066px] xl:max-w-[1386px] mx-auto flex items-center justify-end">
      <div className="w-[820px] text-start p-4 backdrop-filter backdrop-blur-sm bg-white bg-opacity-5 shadow-2xl overflow-auto">
        <Heading className="text-heading font-heading text-lightBeige italic mb-18">
          Our Investing Principles
        </Heading>
        <Text className="text-lightBeige text-body mb-4">
          At Qode, we see things for what they are and ignore all the noise.
        </Text>
        <Button
          href={"/blogs/qodes-principles-of-investing"}
          isGlassmorphism={true}
        >
          Know How
        </Button>
      </div>
    </div>
  </>
);

export default InvestmentPrinciples;
