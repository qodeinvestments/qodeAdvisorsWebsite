import React, { useState, lazy, Suspense, useMemo, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import MomentumIndicesChart from "../components/Charts/qtf/momentumindiceschart";
import MultiIndexChart from "../components/Charts/qtf/MultiIndexChart";
import MultiIndexDrawdownLine from "../components/Charts/qtf/MultiIndexDrawdownLine";
import QvfVsMomentumCurve from "../components/Charts/qtf/QvfVsMomentumCurve";
import QvfVsMomentumDrawdownLine from "../components/Charts/qtf/QvfVsMomentumDrawdownLine";
import useFetchStrategyNavField from "../hooks/useFetchStrategyNavData";
const PerformanceDashboard = lazy(() => import("../components/PerformanceDashboard"));

const ChartPlaceholder = () => (
  <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-gray-400">Loading chart...</div>
  </div>
);

const LazyChart = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="min-h-[300px]">
      <Suspense fallback={<ChartPlaceholder />}>
        {inView && children}
      </Suspense>
    </div>
  );
};

const QodeTacticalFund = () => {
  const [isPending, startTransition] = useTransition();
  const fields = useMemo(() => ["qtf", "nifty_500_momentum_50"], []);
  const options = useMemo(() => ({ refreshInterval: 15000 }), []);
  const { data, isLoading, error } = useFetchStrategyNavField(fields, options);

  const dashboardComponent = useMemo(() => {
    if (!data) return null;
    
    return (
      <PerformanceDashboard
        data={data}
        strategyKey="qtf"
        benchmarkKey="nifty_500_momentum_50"
        strategyName="QTF"
        benchmarkName="Nifty 500 Momentum 50"
      />
    );
  }, [data]);

  const strategyData = {
    title: "Qode Tactical Fund",
    tagLine: "Harnessing Momentum for Superior Returns",
    description:
      "A dynamic investment strategy focusing on momentum investing, balancing high returns with calculated risks through hedging and tax efficiency.",
  };

  return (
    <>
      <Helmet>
        <title>{strategyData.title} - Strategy Overview | Qode Advisors LLP</title>
        <meta
          name="description"
          content={`Learn more about the ${strategyData.title} strategy at Qode Advisors LLP. ${strategyData.description}`}
        />
      </Helmet>

      <div className="mx-auto sm:mt-8 mt-8">
        <div className="mt-4 p-18 max-w-[93%] md:max-w-[1066px] xl:max-w-[1386px] mx-auto sm:mb-1 mb-1">
          <div className="sm:max-w-[820px] mx-auto">
            <h1 className="font-heading playfair-font-display text-mobileHeading sm:text-heading font-semibold text-brown mb-1 text-center">
              {strategyData.title}
            </h1>
            <div className="text-center mb-18">
              <p className="font-body text-body dm-sans-font text-primary text-sm">
                September 19, 2024
              </p>
            </div>

            <div className="post-content gh-content">
              <h3 id="momentum-investing-an-overview">Momentum Investing: An Overview</h3>
              <p>
                Momentum investing focuses on capitalizing on upward trends in asset prices. The basic idea is simple:
                invest in assets that are going up and exit those that are falling. This approach assumes that trends
                are more likely to continue than reverse.
              </p>
              <p>
                Momentum has been one of the most researched equity strategies. There is a study of 212 years on Price
                Momentum (The World's Longest Backtest: 1801-2012) which has shown consistent outperformance in
                markets. Studies done by many demonstrate that stocks with past gains often outperform in the short term.
              </p>
              <hr />
              <h3 id="how-does-momentum-perform-in-indian-markets">How Does Momentum Perform in Indian Markets?</h3>
              <p>
                Let's see how momentum performs against the Nifty 50 TRI, Smallcap 100, and Midcap 100. Using the Nifty
                500 Momentum 50 Index, which selects 50 high-momentum stocks from the Nifty 500, here's the comparison:
              </p>
              <LazyChart>
                <MomentumIndicesChart />
              </LazyChart>
              <hr />
              <h3 id="why-choose-momentum-over-other-factors">Why Choose Momentum over other Factors?</h3>
              <p>
                Momentum ranks top among strategy indices like the Nifty 500 Value 50 and Nifty 200 Quality 30:
              </p>
              <LazyChart>
                <MultiIndexChart />
              </LazyChart>
              <hr />
              <h3 id="drawbacks-of-momentum">Drawbacks of Momentum</h3>
              <ol>
                <li>
                  <strong>Higher Tax:</strong> Frequent portfolio rebalancing results in short-term capital gains (STCG),
                  which can eat into profits.
                </li>
              </ol>
              <figure className="kg-card kg-image-card">
                <img
                  src="https://blogs.qodeinvest.com/content/images/2024/11/STCG-Graphic.png"
                  className="kg-image"
                  alt="STCG Graphic"
                  loading="lazy"
                  width="1583"
                  height="710"
                />
              </figure>
              <ol start="2">
                <li>
                  <strong>Higher Drawdowns:</strong> Momentum stocks see higher returns during bull markets, but also
                  experience significant drops during bear markets.
                </li>
              </ol>
              <LazyChart>
                <MultiIndexDrawdownLine />
              </LazyChart>
              <hr />
              <h3 id="how-do-we-address-these-drawbacks">How do we address these drawbacks?</h3>
              <ol>
                <li>
                  <strong>Tax Efficiency:</strong> Avoid STCG by investing in a momentum mutual fund or ETF, where
                  internal portfolio churn isn't taxed.
                </li>
              </ol>
              <figure className="kg-card kg-image-card">
                <img
                  src="https://blogs.qodeinvest.com/content/images/2024/10/image--18-.png"
                  className="kg-image"
                  alt="Tax Efficiency Comparison"
                  loading="lazy"
                  width="1031"
                  height="667"
                />
              </figure>
              <LazyChart>
                <QvfVsMomentumCurve />
              </LazyChart>
              <hr />
              <LazyChart>
                <QvfVsMomentumDrawdownLine />
              </LazyChart>
            </div>

            <Suspense fallback={<ChartPlaceholder />}>
              {dashboardComponent}
            </Suspense>

            <div className="post-content gh-content">
              <h3 id="conclusions">Conclusions</h3>
              <p>
                Instead of complex, frequent trades, this strategy offers a simple, efficient path to long-term wealth creation.
              </p>
              <p>
                Our strategy aims to outperform the momentum index by using derivatives to hedge against market downturns
                without sacrificing potential gains.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QodeTacticalFund;