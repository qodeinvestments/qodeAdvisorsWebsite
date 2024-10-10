import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import App from "./App.jsx";
import MomentumTabs from "./Pages/QodeVelocityFund.jsx";
import Blogs from "./Pages/Blogs.jsx";
import BlogDetails from "./Pages/BlogDetails.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import QodeGrowthFund from "./Pages/QodeGrowthFund.jsx";
import FAQs from "./Pages/faqs.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import Strategies from "./Pages/Strategies.jsx";
import BookAMeet from "./Pages/BookAMeet.jsx";
import QodeAllWeather from "./Pages/QodeAllWeather.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import TermsnConditions from "./Pages/TermsandConditions.jsx";
import Disclosure from "./Pages/Disclosure.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import PythonCalculator from "./Pages/PythonCalculator.jsx";
import Tool from "./Pages/Tool.jsx";
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
        path: "/strategies/qode-velocity-fund",
        element: <MomentumTabs />,
      },
      {
        path: "/strategies/qode-all-weather",
        element: <QodeAllWeather />,
      },
      {
        path: "/strategies/quant-growth-fund",
        element: <QodeGrowthFund />,
      },
      {
        path: "/strategies/qode-growth-fund",
        element: <QodeGrowthFund />,
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
        path: "/about-us",
        element: <AboutUs />,
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
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/portfolio-visualiser",
        element: <PythonCalculator />,
      },
      {
        path: "/blogs/:slug", // This route captures the postId parameter
        element: <BlogDetails />,
      },
      {
        path: "/tool", // This route captures the postId parameter
        element: <Tool />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
