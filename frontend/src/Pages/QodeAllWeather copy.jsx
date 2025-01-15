import React, { useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import useFetchStrategyNavField from "../hooks/useFetchStrategyNavData.jsx";
import Text from "../components/common/Text";
import Heading from "../components/common/Heading";

const PerformanceChart = lazy(() => import("../components/Charts/PerformanceChart.jsx"));
const TrailingReturns = lazy(() => import("../components/TrailingReturns"));
const AnnualReturns = lazy(() => import("../components/AnnualReturns"));
const AnnualCalendarDrawdown = lazy(() => import("../components/AnnualCalendarDrawdown"));
const ProbabilityOutperformance = lazy(() => import("../components/ProbabilityOutperformance"));
const PerformanceDashboard = lazy(() => import("../components/PerformanceDashboard"));
const Drawdown = lazy(() => import("../components/Drawdown.jsx"));

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

const QodeAllWeather = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error } = useFetchStrategyNavField('qaw');
  const memoizedData = React.useMemo(() => data, [data]);

  const strategyData = {
    title: "Qode All Weather",
    tagLine: "Lower risk need not mean lower returns",
    description: "A resilient investment strategy designed to weather all market fluctuations while providing consistent growth and superior risk-adjusted returns.",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const extractDateRange = (data) => {
    if (!data || data.length === 0) return { startDate: "0", endDate: "0" };
    const dates = data.map((entry) => new Date(entry.date));
    return {
      startDate: formatDate(Math.min(...dates)),
      endDate: formatDate(Math.max(...dates))
    };
  };

  const { startDate, endDate } = extractDateRange(data);

  return (
    <>
      <Helmet>
        <title>{strategyData.title} - Strategy Overview | Qode Advisors LLP</title>
        <meta name="description" content={`Learn more about the ${strategyData.title} strategy at Qode Advisors LLP. ${strategyData.description}`} />
      </Helmet>

      <div className="mx-auto sm:mt-8 mt-8">
        <div className="flex justify-center flex-col items-center p-18">
          <Heading className="font-bold mb-1 text-brown text-center">
            <span className="block">{strategyData.title}</span>
          </Heading>
          <Text className="text-center sm:text-subheading text-mobileSubHeading font-subheading mb-2">
            {strategyData.tagLine}
          </Text>
          <Text className="text-center dm-sans-font text-body mb-1">
            {strategyData.description}
          </Text>
          <blockquote className="border-l-4 border-gray-300 pl-4 my-2 italic">
            <strong>Lower Risk need not necessarily mean Lower Returns!</strong>
          </blockquote>
        </div>

        <div className="mt-4 p-18 max-w-[93%] md:max-w-[1066px] xl:max-w-[1386px] mx-auto sm:mb-1 mb-1">
          <div className="sm:max-w-[820px] mx-auto">
            {/* Summary Section */}
            <section className="mb-2">
              <Heading className="font-bold mb-1 text-brown">Summary of Strategy</Heading>
              <ul className="mb-4 disc">
                <li>
                  Conventional wisdom in finance often suggests that higher returns come with higher risk. But we believe in thinking outside the box. Our strategy is built on the unconventional idea that it's possible to achieve superior returns while managing and even reducing risk. This mindset drives everything we do, challenging the traditional risk-return trade-off to offer a smarter, more balanced approach to investing.
                </li>
                <li>
                  We believe that by periodically rebalancing a diversified portfolio of ETFs with lower correlation with the market, we could achieve better returns while experiencing less downside risk compared to benchmarks like the Nifty 50 index.
                </li>
                <li>

                  The objective is to build a resilient investment strategy to weather all market fluctuations and enhance long-term wealth accumulation.
                </li>
              </ul>
            </section>
            <blockquote className="border-l-4 border-gray-300 pl-4 my-2 italic">
              <Text>
                The results shown below are based on backtested data and are shared to highlight the strategy’s past performance. While backtesting helps evaluate strategy performance, it may not reflect actual future results. Investing always carries some risk, so please consider doing your own research or consulting with a financial advisor before making any decisions.
              </Text>
            </blockquote>
            {/* Trailing Returns Section */}
            <section className="mb-2">
              <Heading as="h2" className=" font-bold mb-4">
                Performance Overview
              </Heading>
              <LazyChart>
                <TrailingReturns
                  data={memoizedData}
                  isLoading={isLoading}
                  error={error}
                  strategy="qaw"
                  name={strategyData.title}
                  startDates={startDate}
                  endDates={endDate}
                />
              </LazyChart>
            </section>

            {/* Performance Chart Section */}
            <section className="mb-2">
              <Heading as="h2" className=" font-bold mb-4">
                Equity Curve & Drawdown
              </Heading>
              <LazyChart>
                <PerformanceChart
                  data={memoizedData}
                  strategy="qaw"
                  name={strategyData.title}
                  error={error}
                  isLoading={isLoading}
                />
              </LazyChart>
            </section>

            {/* Annual Returns Section */}
            <section className="mb-2">
              <Heading as="h2" className=" font-bold mb-4">
                Annual Performance Analysis
              </Heading>
              <Text className="mb-4">
                From 2015 onwards, the Qode All Weather Portfolio has consistently outperformed the Nifty 50 index in most calendar years. The strategy performs particularly well in bull markets due to its momentum exposure while maintaining protection during market downturns.
              </Text>
              <LazyChart>
                <AnnualReturns
                  data={memoizedData}
                  strategyKey="qaw"
                  title="Qode All Weather vs Nifty 50 Annual Returns"
                />
              </LazyChart>
            </section>

            {/* Drawdown Analysis Section */}
            <section className="mb-2">
              <Heading as="h2" className=" font-bold mb-4">
                Drawdown Analysis
              </Heading>
              <Text className="mb-4">
                Understanding drawdowns is crucial for risk management. Let's examine how our strategy performs during market stress periods compared to the Nifty 50.
              </Text>
              <LazyChart>
                <Drawdown
                  data={memoizedData}
                  strategyKey="qaw"
                  benchmarkKey="nifty_50"
                  strategyName="Qode All Weather"
                />
              </LazyChart>
            </section>

            {/* Calendar Drawdowns Section */}
            <section className="mb-2">
              <Heading as="h2" className=" font-bold mb-4">
                Calendar Year Drawdowns
              </Heading>
              <Text className="mb-4">
                Calendar year drawdowns provide insight into the strategy's risk management capabilities across different market cycles.
              </Text>
              <LazyChart>
                <AnnualCalendarDrawdown
                  data={memoizedData}
                  strategyKey="qaw"
                  benchmarkKey="nifty_50"
                />
              </LazyChart>
            </section>

            {/* Probability of Outperformance Section */}
            <section className="mb-2">
              <Heading as="h2" className=" font-bold mb-4">
                Success Rate Analysis
              </Heading>
              <LazyChart>
                <ProbabilityOutperformance
                  data={data}
                  strategyKey="qaw"
                  benchmarkKey="nifty_50"
                />
              </LazyChart>
              <Text className="mt-4">
                The Qode All Weather portfolio demonstrates remarkable consistency, outperforming the Nifty 50 Index 88% of the time over any 3-year period and 72% of the time on any 1-year period. This performance becomes even more reliable over longer time horizons.
              </Text>
            </section>

            {/* Performance Dashboard Section */}
            <section className="mb-2">
              <Heading as="h2" className=" font-bold mb-4">
                Key Performance Metrics
              </Heading>
              <LazyChart>
                <PerformanceDashboard
                  data={data}
                  strategyKey="qaw"
                  benchmarkKey="nifty_50"
                />
              </LazyChart>
            </section>

            {/* Why It Works Section */}
            <section className="mb-2">
              <Heading as="h2" className=" font-bold mb-4">
                Why This Strategy Works
              </Heading>
              <div className="space-y-4">
                <Text>
                  The strategy's success is built on three key pillars:
                </Text>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Tax Efficiency:</strong> Annual rebalancing and ETF-based portfolio structure minimize tax impact and maximize long-term wealth creation.
                  </li>
                  <li>
                    <strong>Superior Risk-Adjusted Returns:</strong> Higher Sharpe ratio compared to Nifty 50 indicates better returns per unit of risk taken.
                  </li>
                  <li>
                    <strong>Consistent Performance:</strong> Rolling returns demonstrate reliable outperformance across various market cycles.
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default QodeAllWeather;
