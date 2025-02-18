import React, { useState } from "react";
import Section from "../components/container/Section";
import Heading from "../components/common/Heading";
import NewsCard from "../components/NewsCard";

const FeaturedArticles = () => {
  const [activeTab, setActiveTab] = useState("news");

  const articles = [
    {
      date: "February 17, 2025",
      title:
        "Retailers At Risk As Speculative Games Continue; Govt Gets Rewards",
      excerpt:
        "A 2024 study by the regulator revealed that 90 per cent of individual traders incurred losses in the futures and options (F&O) segment of the stock market in FY24, highlighting concerns regarding speculation by retail investors.  The report published by the Securities and Exchange Board of India (Sebi) had indicated that the percentage of individual traders in the F&O segment that experienced losses increased from 89 per cent to 91.1 per cent from to roughly 7.3 million. ",
      url: "https://www.businessworld.in/article/retailers-at-risk-as-speculative-games-continue-govt-gets-rewards-548180",
      imageUrl:
        "https://static.businessworld.in/IMG_7300_20250216213853_original_image_2.webp",
      source: "BW Business World",
      slug: "retailers-at-risk"
    },
    {
      date: "February 13, 2025",
      title:
        "How to play Nifty bears in the current market? Do’s & don’ts for investors",
      excerpt:
        "This one isn't driven by a single catastrophic event. It's more like a slow leak after the post-Covid liquidity surge. Midcaps and smallcaps were priced for perfection -- many doubling in a year. But now, with interest rates rising, global growth slowing, and the rupee steadily weakening, the cracks are showing.",
      additionalParagraph:
        "Indian markets have been in a corrective phase for quite sometime now with the headline index Nifty falling 12% from the peak. However, the extent of damage is varied in different pockets of the market. For instance, the Nifty Smallcap 250 index is down nearly 20% from the highs, officially entering a bearish territory, while the midcap index is still yet to touch those levels.",
      url: "https://economictimes.indiatimes.com/markets/stocks/news/how-to-play-nifty-bears-in-the-current-market-dos-donts-for-investors/articleshow/118201159.cms?from=mdr",
      imageUrl:
        "https://img.etimg.com/thumb/msid-118201136,width-400,height-300,imgsize-88652,resizemode-75/how-to-play-nifty-bears-in-the-current-market-dos-donts-for-investors.jpg",
      source: "Economic Times",
      slug: "dos-and-donts-for-investors"
    },
    {
      date: "February 12, 2025",
      title:
        "The market timing illusion: Why sitting on cash can be a costly mistake",
      excerpt:
        "While waiting for the 'perfect' entry point, investors forgo dividends, reinvestment opportunities, and long-term growth, which can be far more costly than a short-term loss.",
      url: "https://www.moneycontrol.com/news/business/personal-finance/the-market-timing-illusion-why-sitting-on-cash-can-be-a-costly-mistake-12937555.html",
      imageUrl:
        "https://images.moneycontrol.com/static-mcnews/2025/02/20250212015353_cash-trap-1102251.jpg",
      source: "Money Control",
      slug: "the-market-timing-illusion"
    },
    {
      date: "January 27, 2025",
      title:
        "Daily Voice: Incentivizing green energy, attracting foreign investment likely seen in Budget 2025, says this fund manager",
      excerpt:
        "In the FY26 budget, the emphasis will likely be on incentivizing green energy, boosting manufacturing, and attracting more foreign investment into India, said Rishabh Nahar, Partner and Fund Manager at Qode Advisors in an interview to Moneycontrol.",
      url: "https://www.moneycontrol.com/news/business/markets/daily-voice-incentivizing-green-energy-attracting-foreign-investment-likely-seen-in-budget-2025-says-this-fund-manager-12919603.html/amp",
      imageUrl:
        "https://images.moneycontrol.com/static-mcnews/2025/01/20250125224302_Rishabh_Nahar.jpg?impolicy=website&width=350&height=195",
      source: "Money Control",
      slug: "daily-voice-green-energy-budget-2025"
    },
    {
      date: "January 21, 2025",
      title:
        "Taking Stock | Sensex closes below 76,000 mark for first time in 7 months, Nifty near 23,000",
      excerpt:
        "Rishabh Nahar - Partner and Fund Manager at Qode Advisors. The recent rise in India VIX is nothing unusual—volatility always picks up ahead of key events like the Budget. While it's higher than six months ago, a VIX level of 17 is still well within the normal range.",
      slug: "taking-stock-sensex-below-76000-first-time",
      imageUrl:
        "https://images.moneycontrol.com/static-mcnews/2025/01/20250111040413_sensex_nifty_sensexdown.jpg?impolicy=website&width=770&height=431",
      source: "Money Control"
    },
    {
      date: "January 21, 2025",
      title:
        "Markets plunge as Trump's trade tariff plans rattle investors; Sensex tanks 1,235 points",
      excerpt:
        "The key to emerging stronger lies in precision: trim weak holdings, reinforce stability with gold and debt, hedge risks smartly, and seize mispriced opportunities. Adaptation, not reaction, defines long-term outperformance,\" said Rishabh Nahar, Partner and Fund Manager, Qode Advisors.",
      url: "https://economictimes.indiatimes.com/markets/stocks/news/fii-selling-crosses-rs-50000-crore-this-month-trump-sarkar-may-just-deepen-the-exodus/articleshow/117443672.cms?from=mdr",
      source: "The Hindu BusinessLine",
      imageUrl:
        "https://bl-i.thgim.com/public/incoming/wsa63d/article69112900.ece/alternates/LANDSCAPE_1200/IMG_Digitally_enhanced_s_2_1_U7CQLCHT.jpg",
      slug: "fii-selling-crosses-50000-crore"
    },
    {
      date: "January 22, 2025",
      title:
        "FII selling crosses Rs 50,000 crore this month. Trump sarkar may just deepen the exodus",
      excerpt:
        "Investors should actively trim weak holdings—especially those unlikely to meet growth expectations—and redeploy capital into resilient, high-conviction names. A strategic allocation to gold and high-quality debt can dampen volatility while maintaining liquidity for redeployment,\" said Rishabh Nahar, Partner and Fund Manager at Qode Advisors.",
      url: "https://economictimes.indiatimes.com/markets/stocks/news/fii-selling-crosses-rs-50000-crore-this-month-trump-sarkar-may-just-deepen-the-exodus/articleshow/117443672.cms?from=mdr",
      imageUrl:
        "https://img.etimg.com/thumb/msid-117443918,width-650,height-488,imgsize-1092996,resizemode-75/foreign-investors-exit-indian-market.jpg",
      source: "The Economic Times",
      slug: "market-selloff-investor-strategy"
    }
  ];

  // Sort articles by date (newest first)
  const sortedArticles = articles.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Array of insights that can be easily expanded in the future
  const insights = [
    {
      title: "Rishabh Nahar at Laqsa’s Lambda Conference 2025",
      description: (
        <>
          <p className="text-gray-700">
            Rishabh Nahar, Partner &amp; Fund Manager at Qode Advisors, was a panelist at
            Laqsa’s Lambda Conference 2025, held at St. Regis, Mumbai, where he discussed{" "}
            <strong>"How to incorporate fundamental factor Quant vs Quantamental"</strong>.
          </p>
        </>
      ),
      videoUrl: "https://www.youtube.com/embed/Aev4dO8EBH4"
    }
    // Add more insight objects here as needed
  ];

  return (
    <Section className="mt-8">
      <Heading isItalic className="text-center text-brown mb-4 text-heading font-heading">
        Featured In
      </Heading>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-300 mb-4">
        <nav className="flex justify-center space-x-8">
          <button
            onClick={() => setActiveTab("news")}
            className={`py-2 text-lg font-medium transition-colors duration-300 ${
              activeTab === "news"
                ? "border-b-2 border-brown text-brown"
                : "text-gray-600 hover:text-brown"
            }`}
          >
            News
          </button>
          <button
            onClick={() => setActiveTab("insights")}
            className={`py-2 text-lg font-medium transition-colors duration-300 ${
              activeTab === "insights"
                ? "border-b-2 border-brown text-brown"
                : "text-gray-600 hover:text-brown"
            }`}
          >
            Insights
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "news" && (
        <Section padding="none">
          <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {sortedArticles.map((article, index) => (
              <NewsCard
                key={article.url || index}
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                slug={article.slug || article.url}
                feature_image={article.imageUrl}
                primary_author={{ name: article.source }}
              />
            ))}
          </div>
        </Section>
      )}

      {activeTab === "insights" && (
        <Section padding="none">
          {insights.map((insight, index) => (
            <div key={index} className="mb-12">
              <Heading className="text-brown text-xl mb-2">{insight.title}</Heading>
              <div className="mb-4">{insight.description}</div>
              <div className="flex justify-center">
                <iframe
                  className="rounded-lg shadow-lg"
                  width="800"
                  height="450"
                  src={insight.videoUrl}
                  title={insight.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </Section>
      )}
    </Section>
  );
};

export default FeaturedArticles;
