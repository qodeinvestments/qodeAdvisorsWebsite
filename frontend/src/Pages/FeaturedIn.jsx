import React, { useState } from "react";
import { motion } from "framer-motion";
import Section from "../components/container/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import NewsCard from "../components/NewsCard";

// Simple Modal component to show video in a popup
const VideoModal = ({ videoUrl, title, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal Content */}
      <div className="bg-white rounded-lg p-1 relative z-10 max-w-7xl w-full ">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-700 font-bold">
            X
          </button>
        </div>
        <div className="mt-1">
          <iframe
            src={`${videoUrl}?autoplay=1`}
            title={title}
            className="w-full h-72 sm:h-96 md:h-[40rem] rounded-md"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

        </div>
      </div>
    </div>
  );
};

const FeaturedArticles = () => {
  const [activeTab, setActiveTab] = useState("news");
  const [modalVideo, setModalVideo] = useState(null); // { videoUrl, title } or null


  const articles = [
    {
      "date": "April 1, 2025",
      "title": "This fund manager expects RBI to cut interest rates by 75 bps in FY26, advises betting on these 4 sectors",
      "excerpt": "Rishabh Nahar of Qode Advisors expects the RBI to implement further rate cuts to the tune of 75 basis points in FY26. This will be contingent on inflation staying within the central bank’s comfort zone and global interest rate movements, he said in an interview with Moneycontrol. In an environment of heightened global trade tensions, domestic-focused sectors appear more resilient, he believes.",
      "imageUrl": "/Rishabh-15.png",
      "source": "Money Control",
      "slug": "rbi-interest-rate-cuts",
      "url": "https://www.moneycontrol.com/news/business/markets/daily-voice-this-fund-manager-expects-rbi-to-cut-interest-rates-by-75-bps-in-fy26-advises-betting-on-these-4-sectors-12980846.html/amp"
    },    
    {
      date: "March 24, 2025",
      title:
        "Five years since pandemic crash: Penny stockholders are celebrating. But for how long can they?",
      excerpt:
        "The covid-led stock market crash in March 2020 birthed a spectacular four-year bull run. Five years on, the boom phase and the subsequent, ongoing correction have brought significant lessons for investors—especially new entrants. While most have moderated return expectations by now, some have exited the market altogether, and others are holding tight in the face of recent corrections.",
      imageUrl:
        "https://www.livemint.com/lm-img/img/2025/03/23/600x338/gccdbfbe1df55fb78eaf53eaaf1b005aa8664a8713b6cbbac2_1727422374094_1742744060141.jpg",
      source: "Mint Markets",
      slug: "penny-stockholders-celebrating",
      url: "https://www.livemint.com/market/stock-market-news/penny-stocks-investors-multi-bagger-covid-pandemic-crash-smallcaps-midcaps-11742702528891.html",
    },
    {
      "date": "March 19, 2025",
      "title": "Why gold shines as a hedge against stock market volatility",
      "excerpt": "Given the rising debt levels in the US and increasing global uncertainty, gold is expected to play a crucial role in future portfolios. While gold may not be a wealth-creation asset in the traditional sense, it remains an essential tool for diversification and capital protection. There are times for wealth creation, and there are times for capital preservation. Striking the right balance in your portfolio is key to successful long-term investing.",
      "imageUrl": "https://images.moneycontrol.com/static-mcnews/2025/03/20250314103723_goldpricertr.png?impolicy=website&width=770&height=431",
      "source": "Money Control",
      "slug": "gold-shines-as-hedge-against-stock-market-volatility",
      "url": "https://www.moneycontrol.com/news/business/personal-finance/why-gold-shines-as-a-hedge-against-stock-market-volatility-12968465.html"
    },
    {
      date: "March 18, 2025",
      title:
        "Top 10 Portfolio Management Schemes for the month of February 2025",
      excerpt:
        "The Top 10 best performing Portfolio Management Schemes across equities saw a mixed performance. The rankings reflect the broader market trends, where large and mid-cap strategies showed resilience, while flexicap and multi-cap funds struggled amid volatility.",
      imageUrl:
        "https://images.moneycontrol.com/static-mcnews/2025/03/20250318055050_slideshow-khushi-1703251.jpg",
      source: "Money Control",
      slug: "top-10-portfolio-management-schemes",
      url: "https://www.moneycontrol.com/news/business/markets/top-10-portfolio-management-schemes-for-the-month-of-february-2025-12967323.html",
    },
    {
      date: "March 10, 2025",
      title:
        "March is Usually Strong for Indian Equities, Will Trump's Policy Swings Disrupt the Trend?",
      excerpt:
        "Stock markets took a breather last week after a prolonged period of downtrend. Historical trends suggest that March is usually considered a strong month for Indian equities. However, markets might succumb to broader pain with Trump's policybook creating uncertainty and China drawing strong FII interests. Here's what analysts are saying.",
      imageUrl:
        "https://media.assettype.com/outlookbusiness/import/uploadimage/library/16_9/16_9_5/IMAGE_1651656523.webp?w=640&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0",
      source: "Outlook Business",
      slug: "march-strong-for-indian-equities",
      url: "https://www.outlookbusiness.com/markets/march-is-usually-strong-for-indian-equities-will-trumps-policy-swings-disrupt-the-trend",
    },
    {
      date: "March 10, 2025",
      title:
        "How to navigate the rollercoaster ride on Dalal Street? Here are 6 strategies to beat stock market volatility",
      excerpt:
        "Long-Term Horizon Over Market Timing: According to Nahar, attempting to predict the exact market bottom is challenging, making investing for a long-term horizon—at least three years—more prudent. He notes that declining markets often lead to attractive valuations in high-quality stocks, which can deliver strong returns once sentiment improves and the market rebounds. - Add this in the Mint article on the website.",
      slug: "dalal-street-strategies",
      url: "https://www.livemint.com/market/how-to-navigate-the-rollercoaster-ride-on-dalal-street-here-are-6-key-strategies-to-beat-stock-market-volatility-11741252507737.html",
      imageUrl: "/Rishabh-15.png",
      source: "Mint Markets",
    },
    {
      date: "February 20, 2025",
      title: "Indian Equity Markets Pain Worsen as Economy, Corporate Profits Slow",
      excerpt:
        "The slide was triggered by a sharp slowdown in profit growth in India's top companies. The earnings growth of the Nifty 50 companies was 5 per cent in the October-December quarter, a third straight quarter of single-digit increases after two years of double-digit growth.",
      slug: "indian-equity-multi",
      imageUrl:
        "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202502/stock-market-ahead-20445435-16x9_0.jpg?VersionId=EAUJ0wPUqEKyM8yTVjOY3w3CAV7RNjko&size=690:388",
      source: "Reuters, Deccan Herald, The Print, India Today",
      externalLinks: [
        {
          id: "reuters",
          source: "Reuters",
          url: "https://www.reuters.com/world/india/indian-equity-markets-pain-worsen-economy-corporate-profits-slow-2025-02-20/",
          date: "February 20, 2025",
          title:
            "Indian Equity Markets Pain Worsen as Economy, Corporate Profits Slow",
        },
        {
          id: "deccan",
          source: "Deccan Herald",
          url: "https://www.deccanherald.com/business/markets/indian-equity-markets-pain-to-worsen-as-economy-corporate-profits-slow-3413569",
          date: "February 20, 2025",
          title:
            "Indian Equity Markets Pain to Worsen as Economy, Corporate Profits Slow",
        },
        {
          id: "theprint",
          source: "The Print",
          url: "https://theprint.in/india/indian-equity-markets-pain-to-worsen-as-economy-corporate-profits-slow/2502953/",
          date: "February 20, 2025",
          title:
            "Indian Equity Markets Pain to Worsen as Economy, Corporate Profits Slow",
        },
        {
          id: "indiatoday",
          source: "India Today",
          url: "https://www.indiatoday.in/business/story/stock-market-ahead-outlook-dalal-streets-losing-streak-why-the-market-fall-may-not-end-soon-nse-bse-2682632-2025-02-20",
          date: "February 20, 2025",
          title:
            "Stock Market Ahead Outlook: Dalal Street Losing Streak, Why the Market Fall May Not End Soon",
        },
      ],
    },
    {
      date: "February 19, 2025",
      title: "One in five PMS schemes hold over 10% in cash",
      excerpt:
        "Forty-four out of the 207 portfolio management services (PMS) schemes held over 10 per cent in cash at the end of January, data from PMS Bazaar show. Ninety-six schemes have raised their cash holdings in the past year.",
      url: "https://www.thehindubusinessline.com/markets/one-in-five-pms-schemes-hold-over-10-in-cash/article69238969.ece",
      imageUrl:
        "https://bl-i.thgim.com/public/incoming/yk5j71/article69239341.ece/alternates/LANDSCAPE_1200/PO19_Coins_stack_chart.jpg",
      source: "The Hindu Businessline",
      slug: "one-in-five-pms-schemes-hold-over-10-in-cash",
    },
    {
      date: "February 17, 2025",
      title: "Retailers At Risk As Speculative Games Continue; Govt Gets Rewards",
      excerpt:
        "A 2024 study by the regulator revealed that 90 per cent of individual traders incurred losses in the futures and options (F&O) segment of the stock market in FY24, highlighting concerns regarding speculation by retail investors.  The report published by the Securities and Exchange Board of India (Sebi) had indicated that the percentage of individual traders in the F&O segment that experienced losses increased from 89 per cent to 91.1 per cent from to roughly 7.3 million. ",
      url: "https://www.businessworld.in/article/retailers-at-risk-as-speculative-games-continue-govt-gets-rewards-548180",
      imageUrl:
        "https://static.businessworld.in/IMG_7300_20250216213853_original_image_2.webp",
      source: "BW Business World",
      slug: "retailers-at-risk",
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
      slug: "dos-and-donts-for-investors",
    },
    {
      date: "February 12, 2025",
      title: "The market timing illusion: Why sitting on cash can be a costly mistake",
      excerpt:
        "While waiting for the 'perfect' entry point, investors forgo dividends, reinvestment opportunities, and long-term growth, which can be far more costly than a short-term loss.",
      url: "https://www.moneycontrol.com/news/business/personal-finance/the-market-timing-illusion-why-sitting-on-cash-can-be-a-costly-mistake-12937555.html",
      imageUrl:
        "https://images.moneycontrol.com/static-mcnews/2025/02/20250212015353_cash-trap-1102251.jpg",
      source: "Money Control",
      slug: "the-market-timing-illusion",
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
      slug: "daily-voice-green-energy-budget-2025",
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
      source: "Money Control",
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
      slug: "fii-selling-crosses-50000-crore",
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
      slug: "market-selloff-investor-strategy",
    },
  ];

  // Sort articles by date (newest first)
  const sortedArticles = articles.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const insights = [
    {
      title: "Rishabh Nahar at Laqsa's Lambda Conference 2025",
      description: (
        <>
          <Text className="text-gray-700">
            Rishabh Nahar, Partner &amp; Fund Manager at Qode Advisors, was a panelist at
            Laqsa's Lambda Conference 2025, held at St. Regis, Mumbai, where he discussed{" "}
            <strong>"How to incorporate fundamental factor Quant vs Quantamental"</strong>.
          </Text>
        </>
      ),
      videoUrl: "https://www.youtube.com/embed/Aev4dO8EBH4",
      thumbnailId: "Aev4dO8EBH4"
    },
    {
      title: "Union Budget 2025 Market Insights | Vidhi Chheda | Indiabulls Securities",
      description: (
        <>
          <Text className="text-gray-700">
            Watch Vidhi Chheda, Partner & Head of Quant Research at Qode, and Rakesh Pujara as they break down the Union Budget 2025 and its impact on markets, sectors, and investment strategies. Hosted by Indiabulls Securities.
          </Text>
        </>
      ),
      videoUrl: "https://www.youtube.com/embed/wnFKxKX_B1Y",
      thumbnailId: "wnFKxKX_B1Y"
    },
    {
      title: "Can Factor Investing Beat the Market? | Rishabh Nahar at PMS AIF World Summit",
      description: (
        <>
          <Text className="text-gray-700">
            At PMS AIF World – Crystal Gazing 6.0, Rishabh Nahar, Partner & Fund Manager at Qode, joins a panel of top industry experts to break down the effectiveness, longevity, and adaptability of factor investing.
          </Text>
        </>
      ),
      videoUrl: "https://www.youtube.com/embed/832UT629_UI",
      thumbnailId: "832UT629_UI"
    }
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
            className={`py-2 text-lg font-medium transition-colors duration-300 ${activeTab === "news"
              ? "border-b-2 border-brown text-brown"
              : "text-gray-600 hover:text-brown"
              }`}
          >
            News
          </button>
          <button
            onClick={() => setActiveTab("insights")}
            className={`py-2 text-lg font-medium transition-colors duration-300 ${activeTab === "insights"
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
                key={article.slug || index}
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                slug={article.slug || article.url}
                feature_image={article.imageUrl}
                primary_author={{ name: article.source }}
                externalLinks={article.externalLinks}
              />
            ))}
          </div>
        </Section>
      )}

      {activeTab === "insights" && (
        <Section padding="none">
          <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="overflow-hidden transition-all duration-75 max-w-[485px] group p-2 sm:p-3 hover:bg-lightBeige rounded-lg hover:scale-105 flex flex-col h-full"
              >
                <div className="h-full group overflow-hidden relative flex flex-col">
                  {/* Video Preview Section with Play Button Overlay */}
                  <div className="mb-2 relative cursor-pointer" onClick={() =>
                    setModalVideo({
                      videoUrl: insight.videoUrl,
                      title: insight.title,
                    })
                  }>
                    {/* YouTube Thumbnail */}
                    <img
                      src={`https://img.youtube.com/vi/${insight.thumbnailId}/maxresdefault.jpg`}
                      alt={insight.title}
                      className="w-full h-48 rounded-md object-cover"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16  bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col h-full">
                    <div className="overflow-hidden h-[4.5em]">
                      <Heading className="md:text-subheading text-mobileSubHeading text-brown group-hover:text-black font-bold line-clamp-2">
                        {insight.title}
                      </Heading>
                    </div>
                    <div className="flex-grow">{insight.description}</div>
                  </div>
                  <div className="flex justify-end mt-2 items-center">
                    <div className="group-hover:text-black -mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        width="44"
                        height="44"
                      >
                        <path
                          d="M66.3 65.5l0.3-32.1-32.1 0.3v4l25.3-0.2-26.3 26.3 2.8 2.8 26.3-26.3-0.2 25.2 4 0z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  <hr className="mt-1 border-t group-hover:border-beige border-lightBeige" />
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Modal for Video */}
      {modalVideo && (
        <VideoModal
          videoUrl={modalVideo.videoUrl}
          title={modalVideo.title}
          onClose={() => setModalVideo(null)}
        />
      )}
    </Section>
  );
};

export default FeaturedArticles;