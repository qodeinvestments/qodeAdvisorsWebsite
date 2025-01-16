import React from 'react';

const QodeFutureHorizons = () => {
  return (
    <div className="mt-9 p-18 max-w-[93%] md:max-w-[1066px] xl:max-w-[1386px] mx-auto sm:mb-5 mb-2">
      <div className="p-0">
        <div className="sm:max-w-[820px] mx-auto">
          <h1 className="font-heading playfair-font-display text-mobileHeading sm:text-heading font-semibold text-brown mb-1 text-center">
            Qode Future Horizons
          </h1>
          <div className="post-content gh-content">
          
          <blockquote>
                <strong >
                  <em>Precision stock picking using data-driven models</em>
                </strong>
              </blockquote>
              </div>
          <div className="post-content gh-content">
            <h3>Find the Next Market Outperformer!</h3>
            <p>
              When investing in the stock market, the challenge of sifting through over 6,000 listed stocks highlights the importance of a strong screening model. A robust screening process helps narrow down this large universe to a manageable number of stocks, making it easier to conduct deep research and identify high-conviction investments that could lead to a portfolio of Outperformer stocks or Multibagger stocks.
            </p>
            <p>
              At <strong>Qode Future Horizons</strong>, we've rigorously backtested various screening filters to consistently identify a select group of stocks with Multibagger potential. These filters focus on four key factors:
            </p>
            <ul>
              <li><strong>Growth</strong></li>
              <li><strong>Quality</strong></li>
              <li><strong>Capital Efficiency</strong></li>
              <li><strong>Valuations</strong></li>
            </ul>
            <p>
              Through extensive research and analysis, we've fine-tuned these parameters to isolate stocks that meet these criteria across different market cap buckets.
            </p>
            <hr />
            <h3>Universe Selection</h3>
            <p>
              Our findings suggest that a larger number of stocks meeting our criteria reside in the small-mid-cap range. This indicates significant opportunities in this space, making it a promising area for generating alpha. By honing in on these opportunities, we can potentially unlock superior returns as many of these are <strong>small-mid-cap stocks</strong> exhibit the growth potential that larger caps often lack.
            </p>
            <figure className="kg-card kg-image-card">
              <img
                src="https://blogs.qodeinvest.com/content/images/2024/11/Picture4.png"
                className="kg-image"
                alt=""
                loading="lazy"
                width="1954"
                height="739"
              />
            </figure>
            <p>
              As can be seen in the chart, only by applying a couple of filters, our universe concentration becomes obvious. We usually use 5-7 filters to accurately narrow down to find potential companies.
            </p>
            <hr />
            <h3>Quantitative Backtest based on our Screener</h3>
            <p>We ran a 15-year backtest using a straightforward strategy:</p>
            <ul>
              <li><strong>Buy 30 stocks</strong> in equal weight, which rank the highest based on our screening filters.</li>
              <li><strong>Rebalance the portfolio yearly</strong>, replacing the stocks with the new top 30.</li>
            </ul>
            <figure className="kg-card kg-embed-card">
              <iframe
                title="Performance Metrics"
                aria-label="Table"
                id="datawrapper-chart-psaUl"
                scrolling="no"
                frameBorder="0"
                style={{ width: '100%', border: 'none', minWidth: '100%', display: 'block' }}
                height="268"
                src="https://datawrapper.dwcdn.net/psaUl/3/"
              ></iframe>
            </figure>
            <figure className="kg-card kg-embed-card">
              <iframe
                title="Annual Returns"
                aria-label="Column Chart"
                id="datawrapper-chart-rb0kb"
                scrolling="no"
                frameBorder="0"
                style={{ width: '100%', border: 'none', minWidth: '100%', display: 'block' }}
                height="431"
                src="https://datawrapper.dwcdn.net/rb0kb/7/"
              ></iframe>
            </figure>
            <p>
              The results of this backtest were impressive: not only did this vanilla version of the strategy significantly outperform major indices and most funds, but it also served as a foundation for further refinement. By actively researching and weeding out underperformers, we can use this as a guiding principle to form a concentrated portfolio of high-conviction stocks.
            </p>
            <p>
              This refined strategy forms the backbone of <strong>Qode Future Horizons</strong>.
            </p>
            <hr />
            <h3>Conclusion</h3>
            <p>
              In the 15-year backtest, out of the total companies that the proprietary screeners identified, <strong>25%</strong> of the companies turned out to be Multibagger.
            </p>
            <figure className="kg-card kg-image-card">
              <img
                src="https://blogs.qodeinvest.com/content/images/2024/11/Screenshot-2024-10-08-121949.png"
                className="kg-image"
                alt=""
                loading="lazy"
                width="746"
                height="449"
              />
            </figure>
            <p>
              These multibagger stocks usually make up the largest portion of the total returns and help outperform the overall market. With additional fundamental research from fund managers, we believe the odds of success can be even higher.
            </p>
            <p>
              At <strong>Qode Future Horizons</strong>, we aim to leverage this powerful screening and research methodology to deliver a concentrated portfolio of potential winners for investors seeking significant long-term gains.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QodeFutureHorizons;
