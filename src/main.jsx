import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Tabs from "./Pages/QuantGrowthMomentum.jsx";
import App from "./App";
import MomentumTabs from "./Pages/QuantGrowthMomentum.jsx";
import OurTeam from "./Pages/OurTeam.jsx";
import OurBeliefs from "./Pages/OurBeliefs.jsx";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
