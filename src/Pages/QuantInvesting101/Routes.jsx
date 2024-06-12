import React from "react";
import { Routes, Route } from "react-router-dom";
import Introduction from "./Introduction";
import WhatIsQuantInvesting from "./WhatIsQuantInvesting";
import HowItWorks from "./HowItWorks";
import QuantitativeStrategies from "./QuantitativeStrategies";

const AppRoutes = () => (
  <Routes>
    <Route path="introduction/*" element={<Introduction />}>
      <Route
        path="what-is-quant-investing"
        element={<WhatIsQuantInvesting />}
      />
      <Route path="how-it-works" element={<HowItWorks />} />
    </Route>
    <Route
      path="quantitative-strategies"
      element={<QuantitativeStrategies />}
    />
  </Routes>
);

export default AppRoutes;
