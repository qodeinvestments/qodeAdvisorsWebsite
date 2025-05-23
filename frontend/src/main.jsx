import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import App from "./App.jsx";
import QodeTacticalFund from "./Pages/QodeTacticalFund.jsx";
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
import SchemeD from "./Pages/SchemeD.jsx";
import QodeFutureHorizons from "./Pages/QodeFutureHorizons.jsx";
import FeaturedIn from "./Pages/FeaturedIn.jsx";
import NewsDetails from "./Pages/NewsDetails.jsx";
import ReadingArticles from "./Pages/ReadingArticles.jsx";
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

      // {
      //   path: "/book-a-meet",
      //   element: <BookAMeet />,
      // },

      {
        path: "/strategies/qode-tactical-fund",
        element: <QodeTacticalFund />,
      },
      {
        path: "/strategies/qode-future-horizons",
        element: <QodeFutureHorizons/>,
      },
      {
        path: "/strategies/qode-all-weather",
        element: <QodeAllWeather />,
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

      // {
      //   path: "/faq",
      //   element: <FAQs />,
      // },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },

      {
        path: "/blogs",
        element: <Blogs />,
      },
      // {
      //   path: "/portfolio-visualiser",
      //   element: <PythonCalculator />,
      // },
      // {
      //   path: "/support", // This route captures the postId parameter
      //   element: <Support />,
      // },
      {
        path: "/blogs/:slug", // This route captures the postId parameter
        element: <BlogDetails />,
      },
      {
        path: "/news/:slug", // This route captures the postId parameter
        element: <NewsDetails />,
      },
      {
        path: "/featured-in",
        element : <FeaturedIn/>,
      },
      {
        path: "/scheme-d", // This route captures the postId parameter
        element: <SchemeD />,
      },
      {
        path: "/reading-articles", // This route captures the postId parameter
        element: <ReadingArticles />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
