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
import App from "./App";
import MomentumTabs from "./Pages/QuantGrowthMomentum.jsx";
import OurTeam from "./Pages/OurTeam.jsx";
import OurBeliefs from "./Pages/OurBeliefs.jsx";
import Blogs from "./Pages/Blogs.jsx";
import BlogDetails from "./Pages/BlogDetails.jsx";
import QuantInvesting from "./Pages/QuantInvesting.jsx";
import QuantInvesting101 from "./Pages/QuantInvesting101.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/strategies/quant-growth-momentum",
        element: <MomentumTabs />,
      },
      {
        path: "/about-us/our-team",
        element: <OurTeam />,
      },
      {
        path: "/about-us/beliefs-and-values",
        element: <OurBeliefs />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:slug", // This route captures the postId parameter
        element: <BlogDetails />,
      },
      {
        path: "/docs/quant-investing-101/*", // Parent path for Quant Investing 101 with sub-routes
        element: <QuantInvesting101 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
