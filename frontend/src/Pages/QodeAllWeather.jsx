import React, { useState, lazy, Suspense, useMemo, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import useFetchStrategyNavField from "../hooks/useFetchStrategyNavData.jsx";
import Text from "../components/common/Text";
import ProbabilityOutperformance from "../components/ProbabilityOutperformance.jsx";

const PerformanceChart = lazy(() => import("../components/Charts/PerformanceChart.jsx"));
const TrailingReturns = lazy(() => import("../components/TrailingReturns"));
const AnnualReturns = lazy(() => import("../components/AnnualReturns"));
const AnnualCalendarDrawdown = lazy(() => import("../components/AnnualCalendarDrawdown"));
const PerformanceDashboard = lazy(() => import("../components/PerformanceDashboard"));
import Drawdown from "../components/Drawdown";
import LogPerformanceChart from "../components/Charts/qaw/LogPerformanceChart.jsx";
import Heading from "../components/common/Heading.jsx";
import StressPeriodTable from "../components/StressPeriodTable.jsx";

const ChartPlaceholder = () => (
  <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-gray-400">Loading chart...</div>
  </div>
);

const LazyChart = ({ children }) => {
  const [isPending, startTransition] = useTransition();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = useMemo(() => {
    if (!inView) return null;
    return (
      <Suspense fallback={<ChartPlaceholder />}>
        {children}
      </Suspense>
    );
  }, [inView, children]);

  return (
    <div ref={ref} className="min-h-[300px]">
      {isPending ? <ChartPlaceholder /> : content}
    </div>
  );
};

const QodeAllWeather = () => {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fields = useMemo(() => ["qaw", "nifty_50"], []);
  const options = useMemo(() => ({ refreshInterval: 15000 }), []);

  const { data, isLoading, error } = useFetchStrategyNavField(fields, options);
  const memoizedData = useMemo(() => data, [data]);

  const strategyData = {
    title: "Qode All Weather",
    tagLine: "Lower risk need not mean lower returns",
    description:
      "A resilient investment strategy designed to weather all market fluctuations while providing consistent growth and superior risk-adjusted returns.",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const extractDateRange = (data) => {
    if (!data || data.length === 0) return { startDate: "0", endDate: "0" };
    const dates = data.map((entry) => new Date(entry.date));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    return {
      startDate: formatDate(minDate),
      endDate: formatDate(maxDate),
    };
  };

  const { startDate, endDate } = extractDateRange(data);

  React.useEffect(() => {
    if (data) {
      startTransition(() => {
      });
    }
  }, [data]);

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
              Qode All Weather
            </h1>
            <div className="text-center mb-18">
              <p className="font-body text-body dm-sans-font text-primary text-sm">
                September 20, 2024
              </p>
            </div>

            <div className="post-content gh-content">
              <blockquote>
                <strong>
                  <em>Lower Risk need not necessarily mean Lower Returns!</em>
                </strong>
              </blockquote>
              <h2 id="summary-of-strategy">Summary of Strategy</h2>
              <ul>
                <li>
                  Conventional wisdom in finance often suggests that higher
                  returns come with higher risk. But we believe in thinking
                  outside the box. Our strategy is built on the unconventional
                  idea that it's possible to achieve superior returns while
                  managing and even reducing risk.
                </li>
                <li>
                  We believe that by periodically rebalancing a diversified
                  portfolio of ETFs with lower correlation with the market, we
                  could achieve better returns while experiencing less downside
                  risk compared to benchmarks like the Nifty 50 index.
                </li>
                <li>
                  The objective is to build a resilient investment strategy to
                  weather all market fluctuations and enhance long-term wealth
                  accumulation.
                </li>
              </ul>
              <blockquote>
                *The results shown below are based on backtested data and are shared to highlight the
                strategy's past performance. While backtesting helps evaluate strategy performance, it
                may not reflect actual future results. Investing always carries some risk, so please
                consider doing your own research or consulting with a financial advisor before making
                any decisions.
              </blockquote>
            </div>

            {!isPending && (
              <>
                <div className="mb-3 mt-3">
                  <Heading
                    isItalic
                    className="text-mobileSubHeading sm:text-subheading font-subheading text-brown my-18"
                  >Trailing Returns</Heading>
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
                    <StressPeriodTable
                      data={data}
                      strategy="qaw"
                      strategyName="Qode All Weather"
                      benchmark="nifty_50"
                      benchmarkName="Nifty 50"
                      isLoading={isLoading}
                      error={error}
                    />
                  </LazyChart>
                </div>

                <div>
                  <Heading
                    isItalic
                    className="text-mobileSubHeading sm:text-subheading font-subheading text-brown my-18"
                  >Equity Curve & Drawdown Chart</Heading>
                  <LazyChart>
                    <PerformanceChart
                      data={memoizedData}
                      strategy="qaw"
                      name={strategyData.title}
                      error={error}
                      isLoading={isLoading}
                    />
                  </LazyChart>
                </div>

                <div>
                  <Heading
                    isItalic
                    className="text-mobileSubHeading sm:text-subheading font-subheading text-brown my-18"
                  >Drawdown Chart</Heading>
                  <LazyChart>
                    <Drawdown
                      data={memoizedData}
                      strategy="qaw"
                      name={strategyData.title}
                      error={error}
                      isLoading={isLoading}
                    />
                  </LazyChart>
                </div>

                <div className="post-content gh-content">
                  <h3 id="the-specifics">The Specifics</h3>
                  <ul><li>Looks to outperform the Nifty 50 index over holding periods of three years and longer.</li><li>It is an ETF-only portfolio, rebalanced annually at the start of every financial year, or may be changed based on the manager.</li><li>Proprietary models that use sentiments to decide dynamic weights between ETFs according to market situations.</li><li>In periods of extreme fear, our strategy increases exposure to equities, capitalizing on potential recovery opportunities. Conversely, during times of extreme greed, we adopt a more cautious stance by allocating more to gold and low-volatility strategies, prioritizing capital preservation.</li></ul>
                  <h3 id="what-is-the-strategy">What is the Strategy?</h3>
                  <ul><li>This strategy is comprised of ETFs that we hold in this portfolio:<ul><li>Momentum ETF</li><li>Low Volatility ETF</li><li>Gold ETF</li><li>Derivative Hedging</li></ul></li><li><strong>The Momentum Index</strong> chooses 50 stocks from the NSE-listed stock universe based on the Normalized Momentum Score for each company is determined based on its 6-month and 12-month price return, adjusted for volatility.</li><li><strong>Low Volatility Index</strong> chooses 30 stocks from the Nifty 100 with the lowest volatility in the last year.</li><li>For exposure to <strong>Gold,</strong> we use Gold ETF which has historically proven to be uncorrelated with equity markets.</li><li>We use a dynamic <strong>Derivative Hedging</strong> mechanism that helps protect your portfolio during market downturns.</li></ul>
                  <blockquote>All the results in this backtest contains the derivative hedging from 2011 onwards, due unavailability of options data prior to it.<br />The portfolio only has Momentum ETF, Low Volatility ETF and Gold ETF as the components before 2011.</blockquote>
                  <h2 id="how-has-this-strategy-performed">How has this strategy performed?</h2>
                </div>
                <LazyChart>
                  <LogPerformanceChart
                    data={memoizedData}
                    strategy="qaw"
                    strategyName={strategyData.title}
                    name={strategyData.title}
                    error={error}
                    isLoading={isLoading} />
                </LazyChart>

                <div className="post-content gh-content">
                  <p>Below are the annual returns of Qode All Weather compared to the Nifty 50:</p>
                  <h3 id="annual-returns">Annual Returns</h3>
                </div>
                <LazyChart>
                  <AnnualReturns
                    data={data}
                    strategyKey="qaw"
                    benchmarkKey="nifty_50"
                    title="Qode All Weather vs Nifty 50 Annual Returns"
                    strategyName="Qode All Weather"
                    benchmarkName="Nifty 50"
                  />
                </LazyChart>

              </>
            )}

            <div className="post-content gh-content">
              <p>It is observed that from 2015, the Qode All Weather Portfolio has outperformed the Nifty 50 index, almost every calendar year. It performs well in a bull market, sure to the exposure to the momentum, etc. It has underperformed the Nifty 50 index by a very thin margin many times before that. To combat that let's see, how much had the portfolio fallen intra-year and compare it with the Nifty 50.</p>
              <p>We have compared the calendar year drawdowns of Qode All Weather and Nifty 50 index below.</p>
            </div>

            {!isPending && (
              <>
                <div className="post-content gh-content">
                  <h3 id="calendar-drawdowns">Calendar Drawdowns</h3>
                </div>
                <LazyChart>
                  <AnnualCalendarDrawdown
                    data={memoizedData}
                    isLoading={isLoading}
                    error={error}
                    strategyKey="qaw"
                    benchmarkKey="nifty_50"
                    strategyName="Qode All Weather"
                    benchmarkName="Nifty 50"
                  />
                </LazyChart>

                <div className="post-content gh-content">

                  <p>The below donut chart tells us the percentage of times who has outperformed the other on a rolling basis, among Qode All Weather &amp; Nifty 50. </p>
                  <p>We can see that the probability of underperformance goes to zero as we increase our holding period. If an investor were to invest for 5 years and above, the likelihood of outperformance is very high close and above 99%.</p>
                </div>
                <Heading
                  isItalic
                  className="text-mobileSubHeading sm:text-subheading font-subheading text-brown my-18"
                >
                  Probability of Outperformance for Different Holding Periods
                </Heading>

                <figure className="kg-card kg-embed-card">
                  <iframe
                    title="multiple-donuts-title"
                    aria-label="multiple-donuts-title"
                    id="datawrapper-chart-b8gIW"
                    src="https://datawrapper.dwcdn.net/b8gIW/1/"
                    scrolling="no"
                    frameBorder="0"
                    style={{
                      width: "100%",
                      minWidth: "100%",
                      border: "none",
                      height: "431px"
                    }}
                    data-external="1"
                  />
                  <div className="post-content gh-content">

                    <p>The Qode All Weather portfolio outperforms the Nifty 50 Index 88% of the time over any 3-year basis and 72% of the time on any 1-year basis.</p>
                    <p>On a longer time frame, this shrinks significantly underscoring the importance of sticking with it to reap the eventual outperformance.</p>
                    <h3 id="why-does-the-strategy-work">Why does the strategy work?</h3>
                    <p>When we use <strong>uncorrelated assets</strong> we can capitalize on <strong>diversification benefits</strong> thereby reducing the portfolio's unsystematic risk and downside volatility.</p>
                    <h3 id="year-2007-2009">Year 2007-2009:</h3>
                    <figure class="kg-card kg-image-card"><img src="https://blogs.qodeinvest.com/content/images/2024/10/Nifty-50-vs-Gold---2008-comparison.png" class="kg-image" alt="" loading="lazy" width="1835" height="833" srcset="https://blogs.qodeinvest.com/content/images/size/w600/2024/10/Nifty-50-vs-Gold---2008-comparison.png 600w, https://blogs.qodeinvest.com/content/images/size/w1000/2024/10/Nifty-50-vs-Gold---2008-comparison.png 1000w, https://blogs.qodeinvest.com/content/images/size/w1600/2024/10/Nifty-50-vs-Gold---2008-comparison.png 1600w, https://blogs.qodeinvest.com/content/images/2024/10/Nifty-50-vs-Gold---2008-comparison.png 1835w" sizes="(min-width: 720px) 720px" /></figure>

                    <ul><li>This balance allows investors to <strong>participate in the growth</strong> potential of higher-risk assets (For eg. momentum strategy) <strong>while minimizing the downside</strong> through more conservative holdings (For eg. Low Vol and Gold).</li><li><strong>Asset Allocation</strong> doesn’t just focus on maximizing returns; it’s about achieving an optimal risk-adjusted return.</li><li>The median rolling correlation of Nifty and Gold is <strong>-0.02</strong>.</li></ul>
                    <p>By strategically spreading investments, asset allocation helps mitigate the impact of volatility in any one asset class, thus reducing overall portfolio risk. </p>
                    <figure class="kg-card kg-image-card"><img src="https://blogs.qodeinvest.com/content/images/2024/10/image--19-.png" class="kg-image" alt="" loading="lazy" width="1176" height="624" srcset="https://blogs.qodeinvest.com/content/images/size/w600/2024/10/image--19-.png 600w, https://blogs.qodeinvest.com/content/images/size/w1000/2024/10/image--19-.png 1000w, https://blogs.qodeinvest.com/content/images/2024/10/image--19-.png 1176w" sizes="(min-width: 720px) 720px" /></figure>
                    <hr />
                    <h3 id="why-should-someone-invest-in-this-strategy">Why should someone invest in this Strategy?</h3>
                    <ul><li><strong>Tax Efficient</strong><ul><li>We believe our investors should get the highest risk-adjusted returns using the most tax-efficient ways. Since we hold ETFs and only partially rebalance annually we incur low taxes and let the money compound for the long term resulting in wealth creation for our clients.</li></ul></li><li><strong>High Risk-Adjusted Return</strong><ul><li>The Sharpe ratio of the Qode All Weather portfolio when compared to Nifty 50 is much higher. It implies that it generates alpha with a lower standard deviation.</li></ul></li></ul>
                  </div>
                </figure>



                <figure className="kg-card kg-embed-card">
                  <LazyChart>
                    <PerformanceDashboard
                      data={data}
                      strategyKey="qaw"
                      benchmarkKey="nifty_50"
                      strategyName="QAW"
                      benchmarkName="Nifty 50"
                    />
                  </LazyChart>
                </figure>
              </>
            )}

            <div className="post-content gh-content">
              <h3 id="why-should-someone-invest-in-this-strategy">
                Why should someone invest in this Strategy?
              </h3>
              <ul>
                <li>
                  <strong>Tax Efficient</strong>
                  <ul>
                    <li>
                      We believe our investors should get the highest
                      risk-adjusted returns using the most tax-efficient ways.
                      Since we hold ETFs and only partially rebalance annually
                      we incur low taxes and let the money compound for the long
                      term resulting in wealth creation for our clients.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>High Risk-Adjusted Return</strong>
                  <ul>
                    <li>
                      The Sharpe ratio of the Qode All Weather portfolio when
                      compared to Nifty 50 is much higher. It implies that it
                      generates alpha with a lower standard deviation.
                    </li>
                  </ul>
                </li>
              </ul>

              <h3 id="why-should-you-not-invest-in-the-index-directly">
                Why should you not invest in the Index directly?
              </h3>
              <p>
                The Exchange does not structure its indexes to provide people
                with maximum returns. The index is just a tool to be used for
                benchmarking by fund managers and the public as a whole. At
                Qode, our objective is to use the methodology of the index to
                maximize returns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QodeAllWeather;
