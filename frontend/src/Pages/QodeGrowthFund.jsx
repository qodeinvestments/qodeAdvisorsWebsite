import React, { lazy, Suspense, useMemo, useTransition } from "react";
import { Helmet } from "react-helmet";
import { faCheckCircle, faChartLine, faBolt, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import QgfEquityCurve from "../components/Charts/qgf/qgfEquityCurve";
import TrailingReturns from "../components/TrailingReturns";
import useFetchStrategyNavField from "../hooks/useFetchStrategyNavData";
import Heading from "../components/common/Heading";
import PerformanceDashboard from "../components/PerformanceDashboard";

const ChartPlaceholder = () => (
  <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-gray-400">Loading chart...</div>
  </div>
);

const LazyChart = ({ children }) => {
  // Example useInView hook usage if needed
  return (
    <Suspense fallback={<ChartPlaceholder />}>
      {children}
    </Suspense>
  );
};

const QodeGrowthFund = () => {
  const [isPending, startTransition] = useTransition();

  const fields = useMemo(() => ["qgf", "nifty_smallcap_100"], []);
  const options = useMemo(() => ({ refreshInterval: 15000 }), []);

  const { data, isLoading, error } = useFetchStrategyNavField(fields);
  const memoizedData = useMemo(() => data, [data]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const extractDateRange = (data) => {
    if (!data || data.length === 0) return { startDate: "0", endDate: "0" };

    // Convert all date strings to Date objects
    const dates = data.map((entry) => new Date(entry.date));

    // Calculate the minimum and maximum dates
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    // Subtract one day from the minimum date for the start date
    const minDateMinusOne = new Date(minDate);
    minDateMinusOne.setDate(minDateMinusOne.getDate() + 1);
    const maxDatePlusOne = new Date(maxDate);
    maxDatePlusOne.setDate(maxDatePlusOne.getDate() + 1);

    return {
      startDate: formatDate(minDateMinusOne),  // Use decremented date for startDate
      endDate: formatDate(maxDatePlusOne),
    };
  };

  const { startDate, endDate } = extractDateRange(data);

  React.useEffect(() => {
    if (data) {
      startTransition(() => {
        // This will ensure data updates don't cause synchronous suspense
      });
    }
  }, [data]);
  const strategyData = {
    title: "Qode Growth Fund",
    tagLine: "Investing in quality businesses for long-term growth.",
    description:
      "Strategy focusing on high-quality small and midcap companies, driving sustainable growth through a factor-based investment approach.",
    principle:
      "Principle - In the long run the stock price always reflects the business performance.",
    strategyCode: "QGF",
    strategySlug: "quant-growth-fund",
    pptLink: "/Quant Growth Fund Feb.pdf",
    blogUrl: "/qode-growth-fund",
    whitePaperLink: "",
    steps: [
      {
        title: "Step 1: Universe of the Stocks",
        description:
          "The investible universe defines all the stocks you can potentially choose from. Here, it's narrowed to small and mid-cap companies. Liquidity screens are then applied to ensure these chosen stocks are actively traded.",
        icon: faCheckCircle,
      },
      {
        title: "Step 2: Profitability Screener",
        description:
          "A tool used to filter stocks based on their financial performance, focusing on profitability.",
        icon: faChartLine,
      },
      {
        title: "Step 3: Selecting top performers",
        description:
          "After applying our profitability filter to all the companies, we determine a composite rank for each. From these rankings, we identify the 30 strongest performers.",
        icon: faBolt,
      },
      {
        title: "Step 4: Annual Rebalancing",
        description:
          "Portfolio rebalancing is like course correction for your investments. Done annually, it ensures your asset allocation stays on track.",
        icon: faShieldAlt,
      },
    ],
    faqItems: [
      {
        question: "What is the type of stocks in which quant growth fund invests?",
        answer:
          "Quant growth funds typically invest in stocks of companies with strong growth potential.",
      },
      {
        question: "What are the market cap of stocks held?",
        answer:
          "The market capitalization of stocks held in a quant growth fund typically ranges from 500 crore to 20,000 crore.",
      },
      {
        question:
          "Are there any sectors or types of companies Quant Growth fund avoids?",
        answer:
          "Quant growth funds skip volatile sectors like trading, banking and financials, and focuses on profitable companies with long-term growth potential.",
      },
      {
        question:
          "How does the Quant Growth Fund differ from traditional funds?",
        answer:
          "Quant growth funds are driven by algorithms and data",
      },
      {
        question: "What are the benefits of investing in the Quant Growth Fund?",
        answer:
          "Quant Growth Fund, a successful and diversified investment option, offers consistent winners and outperformance. By focusing on annual rebalancing, it maintains diversification and lowers costs, making it an attractive choice for investors.",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{strategyData.title} - Strategy Overview | Qode Advisors LLP</title>
        <meta
          name="description"
          content={`Learn more about the ${strategyData.title} strategy at Qode Advisors LLP. ${strategyData.description}`}
        />
        <meta
          name="keywords"
          content="Qode Growth Fund, small-cap investing, mid-cap stocks, factor-based investing, growth investing, long-term investing"
        />
        <meta name="author" content="Qode Invest" />
        <link rel="canonical" href="https://www.qodeinvest.com/qode-growth-fund" />
      </Helmet>


      <div className="mx-auto sm:mt-8 mt-8">
        <div className="mt-4 p-18 max-w-[93%] md:max-w-[1066px] xl:max-w-[1386px] mx-auto sm:mb-1 mb-1">
          <div className="sm:max-w-[820px] mx-auto">
            <h1 className="font-heading playfair-font-display text-mobileHeading sm:text-heading font-semibold text-brown mb-1 text-center">
              Qode Growth Fund
            </h1>
            <div className="post-content gh-content">
              <blockquote>
                <strong >
                  <em>Investing in quality businesses for long-term growth.</em>
                </strong>
              </blockquote>
            </div>
            <div className="post-content gh-content">
              <p>
                At the heart of every successful investment strategy lies a disciplined approach, clear rules, and a focus on quality. Introducing QGF, our flagship fundamental factor-based strategy that does just that—while setting you on a path to capturing superior returns through high-quality growth investing.
              </p>
              <h3 id="what-are-the-returns-of-this-strategy">What are the returns of this strategy?</h3>
            </div>

            {!isPending && (
              <>
                <div className="mb-3 mt-3">
                  <Heading
                    isItalic
                    className="text-mobileSubHeading sm:text-subheading font-subheading text-brown my-18"
                  >
                    Trailing Returns
                  </Heading>
                  <LazyChart>
                    <TrailingReturns
                      data={memoizedData}
                      isLoading={isLoading}
                      error={error}
                      strategy="qgf"
                      benchmark="nifty_smallcap_100"
                      benchmarkName="Nifty Smallcap 100"
                      name={strategyData.title}
                      startDates={startDate}
                      endDates={endDate}
                    />
                  </LazyChart>
                </div>

                <div className="mb-3 mt-3">
                  <Heading
                    isItalic
                    className="text-mobileSubHeading sm:text-subheading font-subheading text-brown my-18"
                  >
                    Equity Curve
                  </Heading>
                  <LazyChart>
                    <QgfEquityCurve />
                  </LazyChart>
                </div>
              </>
            )}

            <div className="post-content gh-content">
              <h3 id="1-precision-screening-zeroing-in-on-quality">
                1. Precision Screening: Zeroing In on Quality
              </h3>
              <p>1. <strong>Universe Selection</strong></p>
              <ul>
                <li>
                  We focus on companies with a smaller market capitalization which allows us to target small to mid-cap segments of the market with growth potential while maintaining liquidity and stability.
                </li>
              </ul>
              <p>2. <strong>Quantitative Scoring</strong></p>
              <ul>
                <li>
                  <strong>Primary Metric: ROCE:</strong> We prioritize Return on Capital Employed (ROCE) to assess the operational efficiency and quality of a company. A higher ROCE indicates a better use of capital in generating profits.
                </li>
                <li>
                  <strong>Additional Metrics:</strong> Other factors such as Alpha (performance against a benchmark), Debt-to-Equity ratio (to ensure financial stability), and Market Cap to Sales ratio (to evaluate value and growth prospects) are also considered in the scoring.
                </li>
              </ul>
              <p>3. <strong>Ranking</strong></p>
              <ul>
                <li>
                  Companies are ranked based on their overall quantitative scores. This step helps us systematically identify the top performers according to our defined metrics, ensuring that we only invest in the best options available.
                </li>
              </ul>
              <p>4. <strong>Proprietary Checks and Filters</strong></p>
              <ul>
                <li>
                  <strong>Verification:</strong> We conduct additional proprietary checks to ensure the credibility of the selected stocks. This includes scrutinizing trading volumes to avoid manipulated stocks and verifying financials to ensure they are accurate and reliable.
                </li>
              </ul>
              <p>5. <strong>Investment Selection</strong></p>
              <ul>
                <li>
                  <strong>Top 30 Stocks:</strong> Based on the rankings, we select the top 30 stocks that meet our criteria. This concentrated approach allows us to maintain a focused and high-conviction portfolio.
                </li>
              </ul>
              <p>6. <strong>Annual Rebalancing</strong></p>
              <ul>
                <li>
                  To keep the portfolio aligned with our strategy, we rebalance annually. This process involves adjusting the holdings based on the updated scores and rankings to maintain exposure to the best investment opportunities.
                </li>
              </ul>
              <p>
                The rolling bucket analysis below illustrates this clearly: the first bucket consistently outperforms the second, and so forth. This demonstrates a strong cause-and-effect relationship between investing in high-quality growth companies and achieving superior returns.
              </p>
            </div>

            <div className="mb-3 mt-3">
              <Heading
                isItalic
                className="text-mobileSubHeading sm:text-subheading font-subheading text-brown my-18"
              >
                Bucket Trend Analysis
              </Heading>
              <LazyChart>
                <iframe
                  title="Interactive line chart"
                  aria-label="Interactive line chart"
                  id="datawrapper-chart-B5jHk"
                  scrolling="no"
                  frameBorder="0"
                  style={{
                    width: "100%",
                    border: "none",
                    display: "block"
                  }}
                  height="478"
                  data-external="1"
                  src="https://datawrapper.dwcdn.net/B5jHk/2/"
                />
              </LazyChart>
            </div>
            <div className="post-content gh-content">

              <p>Below we can see the rolling returns of the strategy compared with benchmark. We can see that no matter when the investor invests this would be the median return for different holding time periods</p>
            </div>
            <figure className="kg-card kg-embed-card">
              <LazyChart>
                <PerformanceDashboard
                  data={data}
                  strategyKey="qgf"
                  benchmarkKey="nifty_smallcap_100"
                  strategyName="QGF"
                  benchmarkName="Nifty Smallcap 100"
                />
              </LazyChart>
            </figure>
            <div className="post-content gh-content">
              <p>
                Below we can see the rolling returns of the strategy compared with benchmark. We can see that no matter when the investor invested this would be the median return for different holding time periods.
              </p>
              <h3 id="2-strategic-rebalancing-growing-the-strong-trimming-the-weak">
                2. Strategic Rebalancing: Growing the Strong, Trimming the Weak
              </h3>
              <blockquote><strong>"Remove the weeds and water the flowers."</strong></blockquote>
              <ul>
                <li>
                  We consistently hold onto our winning stocks and systematically eliminate the underperformers, fine-tuning our portfolio with each rebalance to increase the likelihood of uncovering more winners.
                </li>
                <li>
                  Below we have a table of our top performers from backtest of this strategy:
                </li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-brown scrollbar-track-black">
                <table className="w-full min-w-[640px] border-collapse">
                  <thead>
                    <tr className="text-sm bg-lightBeige sm:text-body font-body">
                      <th className="sticky left-0 z-10 p-18 w-1/3 font-semibold text-center text-black bg-lightBeige border-t border-l border-b border-brown">
                        <div className="absolute inset-y-0 right-0 w-[1px] bg-brown" />
                        Name of company
                      </th>
                      <th className="p-18 w-1/3 bg-lightBeige font-semibold text-center text-black border-t  border-b border-brown">
                        Returns
                      </th>
                      <th className="p-18 w-1/3 bg-lightBeige font-semibold text-center text-black border border-brown">
                        Holding period
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Tata Elxsi Limited", "1264%", "7 Years"],
                      ["Page Industries Limited", "587%", "5 Years"],
                      ["Sonata Software Limited", "474%", "5 Years"],
                      ["Avanti Feeds Ltd", "458%", "6 Years"],
                      ["Alkyl Amines Chemicals Ltd", "379%", "1 Year"],
                      ["Alembic Pharmaceuticals Ltd", "363%", "3 Years"],
                      ["Ajanta Pharma Ltd", "313%", "5 Years"],
                      ["Britannia Industries Ltd", "296%", "2 Years"],
                      ["Deepak Nitrite Ltd", "292%", "1 Year"],
                      ["Amara Raja Batteries Ltd", "235%", "3 Years"]
                    ].map(([name, returns, period]) => (
                      <tr key={name} className="border-b border-brown text-center text-sm sm:text-body">
                        <td className="sticky left-0 z-10 p-18 w-1/3 font-semibold bg-white text-sm sm:text-body border-l border-b border-brown">
                          <div className="absolute inset-y-0 right-0 w-[1px] bg-brown" />
                          {name}
                        </td>
                        <td className="p-18 text-center w-1/3 border-b border-brown">{returns}</td>
                        <td className="p-18 text-center w-1/3 border border-brown">{period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="post-content gh-content mt-1">
              <ul>
                <li>By adopting this approach, we've observed that the maximum drawdown on the invested capital remains under 10%, effectively reducing the periods where your portfolio might be "underwater."</li>
                <li>Our SIP model helps smooth out volatility and provides a strategic pathway into high-growth investments, ensuring you don't miss out on opportunities when market sentiment turns bleak.</li>
              </ul>
              <ul>
                <li><strong>Advantage of Rebalancing</strong>
                  <ul>
                    <strong> - Tax Efficiency</strong> - We enhance tax efficiency by selling losing positions within a year for tax loss harvesting and holding winners for over a year to defer or reduce taxes. This strategy not only boosts returns but also smartly manages the tax burden
                  </ul>
                </li>
              </ul>
              <h3 id="4-drawdown-protection">3. Drawdown Protection</h3>
              <ul>
                <li>Investing in small and mid-cap stocks often leads to higher returns due to their growth potential and risk premium, but they also experience significant downturns during bear markets, making them highly volatile.</li>
                <li>To address this, we implement dynamic hedging strategies using derivatives to protect your portfolio from sharp and substantial drawdowns.</li>
                <li>This approach allows us to preserve capital while staying invested, ensuring that we capture the upside when markets recover.</li>
                <li>Below you can see how our hedge mechanism was able to reduce drawdowns and sharp fall in Covid-19 crash.</li>
              </ul>

            </div>

            <div className="mb-1 mt-3">

              <LazyChart>
                <iframe
                  title="Covid-19 Impact Chart"
                  aria-label="Interactive line chart"
                  id="datawrapper-chart-dWlhh"
                  scrolling="no"
                  frameBorder="0"
                  style={{
                    width: "100%",
                    border: "none",
                    display: "block"
                  }}
                  height="478"
                  data-external="1"
                  src="https://datawrapper.dwcdn.net/dWlhh/2/"
                />
              </LazyChart>
            </div>

            <div className="post-content gh-content">
              <hr />
              <h3 id="5-diversified-portfolio">4. Diversified Portfolio</h3>
              <ul>
                <li>Our 30-stock, equal-weighted portfolio is designed to be highly diversified, covering a broad range of sectors and industries, which helps to significantly reduce overall unsystematic risk.</li>
                <li>By focusing on the fundamentals of individual businesses rather than making broad macroeconomic predictions, we believe it's more reliable to assess how specific companies will perform.</li>
                <li>This approach avoids concentrating the portfolio in any single sector based on macro calls, allowing us to remain flexible and focused on what truly drives returns: the strength of the businesses themselves.</li>
              </ul>
            </div>

            <div className="mb-3 mt-3">
              <LazyChart>
                <iframe
                  title="Industry Breakdown Chart"
                  aria-label="Interactive line chart"
                  id="datawrapper-chart-xHsZE"
                  scrolling="no"
                  frameBorder="0"
                  style={{
                    width: "100%",
                    border: "none",
                    display: "block"
                  }}
                  height="478"
                  data-external="1"
                  src="https://datawrapper.dwcdn.net/xHsZE/2/"
                />
              </LazyChart>
            </div>

            {/* <div className="post-content gh-content">
              <p>Above is the industry breakdown of the QGF portfolio as of 31-12-2024.</p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default QodeGrowthFund;
