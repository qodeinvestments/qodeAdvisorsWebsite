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
  const tableData = [
    { Year: 0, StockPortfolio: 100.0, Tax: 0.0, IndexFundETF: 100.0, TaxIndex: 0.0 },
    { Year: 1, StockPortfolio: 120.0, Tax: 5.0, IndexFundETF: 125.0, TaxIndex: 0.0 },
    { Year: 2, StockPortfolio: 144.0, Tax: 6.0, IndexFundETF: 156.3, TaxIndex: 0.0 },
    { Year: 3, StockPortfolio: 172.8, Tax: 7.2, IndexFundETF: 195.3, TaxIndex: 0.0 },
    { Year: 4, StockPortfolio: 207.4, Tax: 8.6, IndexFundETF: 244.1, TaxIndex: 0.0 },
    { Year: 5, StockPortfolio: 248.8, Tax: 10.4, IndexFundETF: 305.2, TaxIndex: 0.0 },
    { Year: 6, StockPortfolio: 298.6, Tax: 12.4, IndexFundETF: 381.5, TaxIndex: 0.0 },
    { Year: 7, StockPortfolio: 358.3, Tax: 14.9, IndexFundETF: 476.8, TaxIndex: 0.0 },
    { Year: 8, StockPortfolio: 430.0, Tax: 17.9, IndexFundETF: 596.0, TaxIndex: 0.0 },
    { Year: 9, StockPortfolio: 516.0, Tax: 21.5, IndexFundETF: 745.1, TaxIndex: 0.0 },
    { Year: 10, StockPortfolio: 619.2, Tax: 25.8, IndexFundETF: 931.3, TaxIndex: 0.0 },
    { Year: 11, StockPortfolio: 743.0, Tax: 31.0, IndexFundETF: 1164.2, TaxIndex: 0.0 },
    { Year: 12, StockPortfolio: 891.6, Tax: 37.2, IndexFundETF: 1455.2, TaxIndex: 0.0 },
    { Year: 13, StockPortfolio: 1069.9, Tax: 44.6, IndexFundETF: 1819.0, TaxIndex: 0.0 },
    { Year: 14, StockPortfolio: 1283.9, Tax: 53.5, IndexFundETF: 2273.7, TaxIndex: 0.0 },
    { Year: 15, StockPortfolio: 1540.7, Tax: 64.2, IndexFundETF: 2842.2, TaxIndex: 0.0 },
    { Year: 16, StockPortfolio: 1848.8, Tax: 77.0, IndexFundETF: 3552.7, TaxIndex: 0.0 },
    { Year: 17, StockPortfolio: 2218.6, Tax: 92.4, IndexFundETF: 4440.9, TaxIndex: 0.0 },
    { Year: 18, StockPortfolio: 2662.3, Tax: 110.9, IndexFundETF: 5551.1, TaxIndex: 0.0 },
    { Year: 19, StockPortfolio: 3194.8, Tax: 133.1, IndexFundETF: 6938.9, TaxIndex: 0.0 },
    { Year: 20, StockPortfolio: 3833.8, Tax: 159.7, IndexFundETF: 8673.6, TaxIndex: 0.0 },
  ];
  
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
        <link rel="canonical" href="https://www.qodeinvest.com/strategies" />

      </Helmet>

      <div className="mx-auto sm:mt-8 mt-8">
        <div className="mt-4 p-18 max-w-[93%] md:max-w-[1066px] xl:max-w-[1386px] mx-auto sm:mb-1 mb-1">
          <div className="sm:max-w-[820px] mx-auto">
            <h1 className="font-heading playfair-font-display text-mobileHeading sm:text-heading font-semibold text-brown mb-1 text-center">
              {strategyData.title}
            </h1>
          <div className="post-content gh-content">

            <blockquote>
                <strong >
                  <em>Participate in the Growth of Great Companies!</em>
                </strong>
              </blockquote>
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
            </div>

            <LazyChart>
              <MomentumIndicesChart />
            </LazyChart>
            <div className="post-content gh-content">

              <hr />
              <h3 id="why-choose-momentum-over-other-factors">Why Choose Momentum over other Factors?</h3>
              <p>
                Momentum ranks top among strategy indices like the Nifty 500 Value 50 and Nifty 200 Quality 30:
              </p>
            </div>

            <LazyChart>
              <MultiIndexChart />
            </LazyChart>
            <hr />
            <div className="post-content gh-content">

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
            </div>
            <LazyChart>
              <MultiIndexDrawdownLine />
            </LazyChart>
            <div className="post-content gh-content">
              <h3 id="how-do-we-address-these-drawbacks">How do we address these drawbacks?</h3>
              <ol>
                <li>
                  <strong>Tax Efficiency:</strong> Avoid STCG by investing in a momentum mutual fund or ETF, where
                  internal portfolio churn isn't taxed.
                </li>
              </ol>
              {/* <figure className="kg-card kg-image-card">
              <img
                src="https://blogs.qodeinvest.com/content/images/2024/10/image--18-.png"
                className="kg-image"
                alt="Tax Efficiency Comparison"
                loading="lazy"
                width="1031"
                height="667"
              />
            </figure> */}
            </div>
            <div className="overflow-x-auto mb-2">
              <table className="w-full min-w-[640px] border-collapse mt-6">
                <thead>
                  <tr className="text-sm sm:text-body font-body">
                    <th className="sticky border border-brown border-r-0 left-0 z-10 p-18 w-1/6 font-semibold text-center text-black bg-lightBeige">
                      <div className="absolute inset-y-0 right-0 w-[1px] bg-brown" />
                      Year
                    </th>
                    <th className="relative p-18 font-semibold text-center w-1/6 text-black border-t border-r border-b border-brown">
                      Stock Portfolio
                    </th>
                    <th className="relative p-18 font-semibold text-center w-1/6 text-black border-t border-r border-b border-brown">
                      Tax
                    </th>
                    <th className="relative p-18 font-semibold text-center w-1/6 text-black border-t border-r border-b border-brown">
                      Index Fund/ETF
                    </th>
                    <th className="relative p-18 font-semibold text-center w-1/6 text-black border-t border-r border-b border-brown">
                      Tax
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index} className="text-black text-center border-b border-brown">
                      <td className="sticky border border-brown border-r-0 w-44 text-nowrap left-0 z-10 w-1/6 p-18 font-semibold text-sm sm:text-body bg-lightBeige">
                        <div className="absolute inset-y-0 right-0 w-[1px] bg-brown" />
                        {row.Year}
                      </td>
                      <td className="relative p-18 text-black text-center font-body text-sm sm:text-body w-1/6 border-b border-r border-brown">
                        {row.StockPortfolio.toFixed(1)}
                      </td>
                      <td className="relative p-18 text-black text-center font-body text-sm sm:text-body w-1/6 border-b border-r border-brown">
                        {row.Tax.toFixed(1)}
                      </td>
                      <td className="relative p-18 text-black text-center font-body text-sm sm:text-body w-1/6 border-b border-r border-brown">
                        {row.IndexFundETF.toFixed(1)}
                      </td>
                      <td className="relative p-18 text-black text-center font-body text-sm sm:text-body w-1/6 border-b border-r border-brown">
                        {row.TaxIndex.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                  <tr className="text-black text-center font-body font-semibold">
                    <td className="sticky border border-brown  w-44 text-nowrap left-0 z-10 w-1/6 p-18  font-semibold bg-lightBeige">
                      Total
                    </td>
                    <td className="relative p-18 text-black text-center font-body w-1/6 border-b border-r border-brown">
                      3833.8
                    </td>
                    <td className="relative p-18 text-black text-center font-body w-1/6 border-b border-r border-brown">
                      933.4
                    </td>
                    <td className="relative p-18 text-black text-center font-body w-1/6 border-b border-r border-brown">
                      7601.9
                    </td>
                    <td className="relative p-18 text-black text-center font-body w-1/6 border-b border-r border-brown">
                      1071.7
                    </td>
                  </tr>
                  <tr className="text-black text-center font-body font-semibold">
                    <td className="sticky border border-brown  w-44 text-nowrap left-0 z-10 w-1/6 p-18 font-semibold bg-lightBeige">
                      CAGR
                    </td>
                    <td className="relative p-18 text-black text-center font-body w-1/6 border-b border-r border-brown">
                      20.00%
                    </td>
                    <td className="relative p-18 text-black text-center font-body w-1/6 border-b border-r border-brown">
                      -
                    </td>
                    <td className="relative p-18 text-black text-center font-body w-1/6 border-b border-r border-brown">
                      24.18%
                    </td>
                    <td className="relative p-18 text-black text-center font-body w-1/6 border-r border-b border-brown">
                      -
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="post-content gh-content">
              <p><em>LTCG: <strong>12.5%</strong>, STCG: <strong>20%</strong> ; (As of 1st Sept 2024)</em></p>
              <ul><ul><li>The index fund nearly doubles the returns by saving on taxes.</li><li>So we instead build our momentum portfolio using tax-efficient ETFs.</li></ul></ul>
              <ol start="2"><li><strong>Avoiding Market Crashes:</strong> While timing the market or moving into cash during downturns is costly and unreliable, hedging with derivatives can effectively protect against crashes without sacrificing returns. We use a proprietary hedging model that reduces downside risk without giving up on momentum’s upside. Below are the portfolio and drawdown comparisons:</li></ol>
            </div>
            <LazyChart>
              <QvfVsMomentumCurve />
            </LazyChart>
            <LazyChart>
              <QvfVsMomentumDrawdownLine />
            </LazyChart>

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