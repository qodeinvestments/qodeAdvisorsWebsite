import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Tabs from "./Pages/QuantGrowthMomentum.jsx";
import App from "./App.jsx";
import MomentumTabs from "./Pages/QuantGrowthMomentum.jsx";
import OurTeam from "./Pages/OurTeam.jsx";
import OurBelief from "./Pages/OurBeliefs.jsx";
import Blogs from "./Pages/Blogs.jsx";
import BlogDetails from "./Pages/BlogDetails.jsx";
import QuantInvesting from "./Pages/QuantInvesting.jsx";
import QuantInvesting101 from "./Pages/QuantInvesting101.jsx";
import WhatIsQuantInvesting from "./Pages/QuantInvesting101/WhatIsQuantInvesting.jsx";
import HowItWorks from "./Pages/QuantInvesting101/HowItWorks.jsx";
import QuantitativeStrategies from "./Pages/QuantInvesting101/QuantitativeStrategies.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import BenefitsAndRisk from "./Pages/QuantInvesting101/BenefitsAndRisk.jsx";
import QuantGrowthFund from "./Pages/QuantGrowthFund.jsx";
import TheQuantGrowth from "./Pages/TheQuantGrowth.jsx";
import OurBeliefsAndValues from "./Pages/OurBeliefs.jsx";
import FAQs from "./Pages/faqs.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import WeeklyNewsletter from "./Pages/WeeklyNewsletter.jsx";
import Calculators from "./Pages/Calculators.jsx";
import StrategyCalculator from "./Pages/StrategyCalculator.jsx";
import Strategies from "./Pages/Strategies.jsx";
import OpenAccount from "./Pages/OpenAccount.jsx";
import BookAMeet from "./Pages/BookAMeet.jsx";
import LowVolMomentum from "./Pages/LowVolMomentum.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import TermsnConditions from "./Pages/TermsandConditions.jsx";
import Disclosure from "./Pages/Disclosure.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import PythonCalculator from "./Pages/PythonCalculator.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/strategies",
        element: <Strategies />,
      },
      {
        path: "/book-a-meet",
        element: <BookAMeet />,
      },
      {
        path: "/open-account",
        element: <OpenAccount />,
      },
      {
        path: "/strategies/quant-growth-momentum",
        element: <MomentumTabs />,
      },
      {
        path: "/strategies/low-vol-momentum",
        element: <LowVolMomentum />,
      },
      {
        path: "/strategies/quant-growth-fund",
        element: <QuantGrowthFund />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-n-conditions",
        element: <TermsnConditions />,
      },
      {
        path: "/disclosure",
        element: <Disclosure />,
      },
      {
        path: "/about-us/our-team",
        element: <OurTeam />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/about-us/beliefs-and-values",
        element: <OurBeliefsAndValues />,
      },
      {
        path: "/faq",
        element: <FAQs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/weekly-newsletter",
        element: <WeeklyNewsletter />,
      },
      {
        path: "/calculators",
        element: <Calculators />,
      },
      {
        path: "/calculators/:strategyID",
        element: <StrategyCalculator />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/python-calculator",
        element: <PythonCalculator />,
      },
      {
        path: "/blogs/:slug", // This route captures the postId parameter
        element: <BlogDetails />,
      },
      {
        path: "/docs/quant-investing-101", // Parent path for Quant Investing 101 with sub-routes
        element: <QuantInvesting101 />,
        children: [
          {
            path: "introduction/what-is-quant-investing",
            element: <WhatIsQuantInvesting />,
          },
          {
            path: "introduction/how-it-works",
            element: <HowItWorks />,
          },
          {
            path: "introduction/quantitative-strategies",
            element: <QuantitativeStrategies />,
          },
          {
            path: "introduction/benefits-and-risks",
            element: <BenefitsAndRisk />,
          },
        ],
      },
      {
        path: "/docs/the-quant-growth",
        element: <TheQuantGrowth />,
        children: [],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
