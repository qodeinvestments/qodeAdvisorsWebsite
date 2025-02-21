// src/pages/NewsDetails.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Section from "../components/container/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";

// Dummy data representing featured articles. 
// In a production app, replace this with data fetched from an API.
const articles = [
    {
        date: "February 20, 2025",
        title: "Indian Equity Markets Pain Worsen as Economy, Corporate Profits Slow",
        excerpt: "The broader markets may struggle to deliver the returns investors have grown accustomed to,",
        slug: "indian-equity-multi",
        imageUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202502/stock-market-ahead-20445435-16x9_0.jpg?VersionId=EAUJ0wPUqEKyM8yTVjOY3w3CAV7RNjko&size=690:388",
        source: "Multiple Sources",
        externalLinks: [
            {
                id: "reuters",
                source: "Reuters",
                url: "https://www.reuters.com/world/india/indian-equity-markets-pain-worsen-economy-corporate-profits-slow-2025-02-20/",
                date: "February 20, 2025",
                title: "Indian Equity Markets Pain Worsen as Economy, Corporate Profits Slow"
            },
            {
                id: "deccan",
                source: "Deccan Herald",
                url: "https://www.deccanherald.com/business/markets/indian-equity-markets-pain-to-worsen-as-economy-corporate-profits-slow-3413569",
                date: "February 20, 2025",
                title: "Indian Equity Markets Pain to Worsen as Economy, Corporate Profits Slow"
            },
            {
                id: "theprint",
                source: "The Print",
                url: "https://theprint.in/india/indian-equity-markets-pain-to-worsen-as-economy-corporate-profits-slow/2502953/",
                date: "February 20, 2025",
                title: "Indian Equity Markets Pain to Worsen as Economy, Corporate Profits Slow"
            },
            {
                id: "indiatoday",
                source: "India Today",
                url: "https://www.indiatoday.in/business/story/stock-market-ahead-outlook-dalal-streets-losing-streak-why-the-market-fall-may-not-end-soon-nse-bse-2682632-2025-02-20",
                date: "February 20, 2025",
                title: "Stock Market Ahead Outlook: Dalal Street Losing Streak, Why the Market Fall May Not End Soon"
            }
        ]
    },
    {
        date: "February 19, 2025",
        title:
            "One in five PMS schemes hold over 10% in cash",
        excerpt:
            "With the valuations being what they are, it would be very hard for anybody to outperform on new AUM. This explains the reason why some schemes are sitting on high levels of cash.",
        additionalParagraph: "Some portfolio managers are navigating the current market turbulence by bulking up on cash.Forty-four out of the 207 portfolio management services (PMS) schemes held over 10 per cent in cash at the end of January, data from PMS Bazaar show. Ninety-six schemes have raised their cash holdings in the past year.Aequitas’ India Opportunities Product has over 88 per cent of its assets in cash, the most among PMS schemes. Shree Rama Managers’ Vriddhi Plan, Alchemy Capital Management’s Ascent and Turtle Wealth Management’s Wealth Mantra are other schemes with a high percentage of cash.",
        url: "https://www.thehindubusinessline.com/markets/one-in-five-pms-schemes-hold-over-10-in-cash/article69238969.ece",
        imageUrl:
            "https://bl-i.thgim.com/public/incoming/yk5j71/article69239341.ece/alternates/LANDSCAPE_1200/PO19_Coins_stack_chart.jpg",
        source: "The Hindu Businessline",
        slug: "one-in-five-pms-schemes-hold-over-10-in-cash"
    },
    {
        date: "February 17, 2025",
        title:
            "Retailers At Risk As Speculative Games Continue; Govt Gets Rewards",
        excerpt:
            "By imposing heavy taxes on F&O transactions, the government is not really helping the retail trader. If taxes such as STT, stamp duty, and high broker fees were reduced or eliminated, many retail traders could become profitable. However, doing so would lead to a significant loss of revenue for the government. If the government’s true intention is to discourage speculative trading among retail investors, the solution is simple: increase the net worth requirements for individuals to trade in futures and options. In its attempt to curb retail trading through higher taxes and charges, the government may ultimately be causing more harm than good.",
        additionalParagraph: "Approximately 11.3 million distinct individual traders together incurred losses of Rs 1.81 lakh crore from FY22 to FY24. Merely 7.2 per cent of individual F&O traders reported a profit during the three-year timeframe, with only 1 per cent earning more than Rs 1 lakh once transaction costs were considered. According to the report by Sebi, over 75 per cent of the loss-making traders continued to operate in the F&O segment even after incurring losses in the previous two consecutive years.",
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
        additionalParagraph: "Indian markets have been in a corrective phase for quite sometime now with the headline index Nifty falling 12% from the peak. However, the extent of damage is varied in different pockets of the market. For instance, the Nifty Smallcap 250 index is down nearly 20% from the highs, officially entering a bearish territory, while the midcap index is still yet to touch those levels. Analysts say the current bearish phase is not as extreme as seen in the past. If we take the 2008 downturn as an example, Nifty's P/E ratio peaked at around 28x, compared with the CY25 P/E of 18.8x.",
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
        additionalParagraph: "Successful market timing requires two correct decisions: when to exit and when to re-enter. If we assume you have a 50 percent chance of being right on each decision (an optimistic assumption), the probability of being right on both decisions is just 25 percent. Make these decisions multiple times, and your odds of sustained success plummet further. Consider that to successfully time the market over a 10-year period, making just two timing decisions per year, you would need to be right 20 times in a row. The probability of getting all these decisions correct, even with a 50 percent success rate per decision, is less than 0.0001 percent.",
        url: "https://www.moneycontrol.com/news/business/personal-finance/the-market-timing-illusion-why-sitting-on-cash-can-be-a-costly-mistake-12937555.html",
        imageUrl:
            "https://images.moneycontrol.com/static-mcnews/2025/02/20250212015353_cash-trap-1102251.jpg",
        source: "Money Control",
        slug: "the-market-timing-illusion"
    },
    {
        date: "January 27, 2025",
        title:
            "Daily Voice: Incentivizing green energy, attracting foreign investment likely seen in Budget 2025, says Rishabh Nahar",
        synopsis:
            "According to Rishabh Nahar, the equity markets could continue to experience extreme volatility following the budget.",
        excerpt:
            "In the FY26 budget, the emphasis will likely be on incentivizing green energy, boosting manufacturing, and attracting more foreign investment into India, said Rishabh Nahar, Partner and Fund Manager at Qode Advisors in an interview to Moneycontrol. Further, given the current pace of capital expenditure, he believes it looks unlikely that the government will meet its capex targets for FY25.",
        additionalParagraph:
            "India’s capital expenditure has risen significantly over the years, with a large push in infrastructure spending. The FY25 capex target was set at Rs 11 lakh crore. From April to November, the government utilized 46% of this target, compared to 58% in the same period of the previous year. To meet the target, the government will need to accelerate spending in the second half. Given the current pace, it looks unlikely that the government will meet its capex targets for FY25. Based on Prime Minister Narendra Modi’s recent interviews, it appears that the FY26 capex target will be much more aggressive than FY25. The government remains bullish about changing India’s global image, and we’ve already seen significant spending on infrastructure, green energy, and manufacturing. This momentum will most likely continue into FY26.",
        url: "https://www.moneycontrol.com/news/business/markets/daily-voice-incentivizing-green-energy-attracting-foreign-investment-likely-seen-in-budget-2025-says-this-fund-manager-12919603.html/amp",
        imageUrl:
            "https://images.moneycontrol.com/static-mcnews/2025/01/20250125224302_Rishabh_Nahar.jpg?impolicy=website&width=350&height=195",
        source: "Money Control",
        // Custom slug for internal routing
        slug: "daily-voice-green-energy-budget-2025"
    },
    {
        date: "January 21, 2025",
        title:
            "Taking Stock | Sensex closes below 76,000 mark for first time in 7 months, Nifty near 23,000",
        synopsis:
            "At the close, the Sensex fell by 1.6 percent, losing 1,235 points to settle at 75,838.36 -- a level last seen on 6 June 2024, while the Nifty declined by 1.37 percent, or 320.1 points, ending at 23024.65.",
        additionalParagraph:
            "Sectoral indices were broadly negative, with Nifty Realty and Consumer Durables being the worst performers, both plunging over 4 percent. Nifty PSU Bank and Auto followed closely, down 1.7 percent and 1.6 percent, respectively. Other notable losers included Nifty Bankex and Private Bank, both down by 1.5 percent, while Nifty Pharma and Metal shed 1.3 percent and 1.1 percent, respectively. As the quarterly earnings season progresses, the market is still awaiting signs of a recovery in corporate performance. Of the 51 Nifty constituents, only 10 have reported their earnings, with just three—Reliance Industries among them—exceeding estimates. Four others met expectations, while new-age tech companies like Zomato and Paytm contributed to the negative sentiment with disappointing results.",
        excerpt:
            "Rishabh Nahar - Partner and Fund Manager at Qode Advisors. The recent rise in India VIX is nothing unusual—volatility always picks up ahead of key events like the Budget. While it's higher than six months ago, a VIX level of 17 is still well within the normal range. For context, during the election results in June 2024, India VIX had surged to 30, a far more extreme move. Rather than overreacting to short-term fluctuations, investors should focus on the bigger picture. Volatility is part of market cycles, and temporary spikes don't necessarily imply a structural shift.",
        // If no custom slug is provided, we can use the URL as a fallback.
        slug: "taking-stock-sensex-below-76000-first-time",
        url: "https://www.moneycontrol.com/news/business/earnings/taking-stock-sensex-closes-below-76-000-mark-for-first-time-in-7-months-nifty-near-23-000-12916049.html",
        imageUrl:
            "https://images.moneycontrol.com/static-mcnews/2025/01/20250111040413_sensex_nifty_sensexdown.jpg?impolicy=website&width=770&height=431",
        source: "Money Control"
    },
    {
        date: "January 21, 2025",
        title:
            "Markets plunge as Trump's trade tariff plans rattle investors; Sensex tanks 1,235 points",
        excerpt:
            "Market volatility isn’t just turbulence; it’s a stress test for portfolios. The key to emerging stronger lies in precision: trim weak holdings, reinforce stability with gold and debt, hedge risks smartly, and seize mispriced opportunities. Adaptation, not reaction, defines long-term outperformance.” said Rishabh Nahar, Partner and Fund Manager, Qode Advisors ",
        slug: "fii-selling-crosses-50000-crore",
        synopsis:
            "The market-wide selling pressure was evident in the broader indices, with the Nifty Next 50 falling 2.61 per cent and the Nifty Midcap Select declining 2.78 per cent",
        additionalParagraph:
            "Equity markets witnessed a very volatile session which ended with a sharp selloff on Tuesday, and the benchmark Sensex plummeting 1,235.08 points to close at 75,838.36, marking its biggest single day drop in recent months. The broader Nifty 50 index fell 320.10 points to end at 23,024.65, as investors grappled with concerns over potential global trade disruptions following former US President Trump’s announcement of new tariffs. Besides, subdued Q3 financial performances from India Inc too added selling pressure.",
        url: "https://www.thehindubusinessline.com/markets/stock-markets/markets-plunge-as-trumps-trade-tariff-plans-rattle-investors-sensex-tanks-1235-points/article69123229.ece",
        imageUrl:
            "https://bl-i.thgim.com/public/incoming/wsa63d/article69112900.ece/alternates/LANDSCAPE_1200/IMG_Digitally_enhanced_s_2_1_U7CQLCHT.jpg",
        source: "The Hindu BusinessLine"
    },
    {
        date: "January 22, 2025",
        title:
            "FII selling crosses Rs 50,000 crore this month. Trump sarkar may just deepen the exodus",
        synopsis:
            "Foreign institutional investors (FIIs) have withdrawn over Rs 50,000 crore from India's stock market in January 2025, impacting Sensex and Nifty. With Donald Trump's presidency and potential pro-American policies, analysts anticipate further outflows, continued market volatility, and pressure on the Indian rupee.",
        excerpt:
            "\"The 'buy the dip' mantra, which has worked well for retail investors in the bull cycle, may not hold water during every corrective phase as many stocks with high valuations are going through a phase of mean reversion. The real risk isn't volatility; it's holding assets that can't justify their valuations. Investors should actively trim weak holdings—especially those unlikely to meet growth expectations—and redeploy capital into resilient, high-conviction names. A strategic allocation to gold and high-quality debt can dampen volatility while maintaining liquidity for redeployment,\" ",
        url: "https://economictimes.indiatimes.com/markets/stocks/news/fii-selling-crosses-rs-50000-crore-this-month-trump-sarkar-may-just-deepen-the-exodus/articleshow/117443672.cms?from=mdr",
        additionalParagraph:
            "Making Sensex tumble by 2,300 points and Nifty by 2.6% so far in the month, foreign institutional investors (FIIs) have pulled out over Rs 50,000 crore from Dalal Street in January. And now with Donald Trump taking over as the US President, there are fears that FII outflow could accelerate as pro-America policies may suck in liquidity back to Wall Street.<br/>In the first 15 trading days of 2025, FIIs have sold Indian stocks worth over Rs 57,000 crore as the ongoing Q3 earnings season is doing little to convince big boys to stay put. InCred Equities estimates that profit growth has been flat so far on a year-on-year basis on 4% sales growth. While heavyweights like TCS and Reliance Industries (RIL) surprised positively, Zomato numbers show consumption slowdown.`",
        imageUrl:
            "https://img.etimg.com/thumb/msid-117443918,width-650,height-488,imgsize-1092996,resizemode-75/foreign-investors-exit-indian-market.jpg",
        source: "The Economic Times",
        slug: "market-selloff-investor-strategy"
    }
];

const NewsDetails = () => {
    const { slug } = useParams();
    const decodedSlug = decodeURIComponent(slug);

    const article = articles.find(
        (art) => (art.slug || art.url) === decodedSlug
    );

    if (!article) {
        return (
            <Section padding="none" className="mt-9 p-18">
                <div className="sm:max-w-[820px] mx-auto text-center">
                    <Heading className="text-heading font-heading text-brown mb-4">
                        Article Not Found
                    </Heading>
                    <Text className="text-primary font-body">
                        We couldn’t find the article you’re looking for.
                    </Text>
                </div>
            </Section>
        );
    }

    // For articles with multiple external links, manage active link state
    const [activeExternalIndex, setActiveExternalIndex] = useState(0);
    const hasMultipleSources = article.externalLinks && article.externalLinks.length > 0;
    const activeExternal = hasMultipleSources ? article.externalLinks[activeExternalIndex] : null;

    return (
        <>
            <Helmet>
                <title>{article.title} - Qode Blog</title>
                <meta name="description" content={article.excerpt} />
                <meta name="author" content={article.source} />
                <link
                    rel="canonical"
                    href={`https://www.qodeinvest.com/news/${encodeURIComponent(slug)}`}
                />
            </Helmet>

            <Section padding="none" className="mt-8 p-18">
                <div className="sm:max-w-[820px] mx-auto">
                    <Heading
                        isItalic
                        className="text-mobileHeading sm:text-heading font-heading text-brown mb-4 text-center"
                    >
                        {article.title}
                    </Heading>
                    <div className="text-center mb-4">
                        <Text className="text-primary font-body text-sm">
                            Source: {article.source}
                        </Text>
                        {article.date && <span className="text-gray-400">{article.date}</span>}
                    </div>
                    {article.imageUrl && (
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full object-cover h-auto mb-4 rounded-lg"
                        />
                    )}

                    <div className="article-content">
                        {article.synopsis && (
                            <Text className="text-md font-semibold text-gray-600 mb-4">
                                {article.synopsis}
                            </Text>
                        )}

                        {article.excerpt && (
                            <div className="relative text-base sm:max-w-4xl leading-relaxed mb-4 italic flex flex-col">
                                <blockquote className="flex items-start relative">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="sm:w-2 sm:h-2 w-18 h-18 text-brown mr-18 shrink-0"
                                        fill="currentColor"
                                    >
                                        <path d="M11.3,3.3c-2.3,0.5-4.1,1.5-5.6,3c-1.4,1.5-2.2,3.3-2.2,5.3c0,2.3,0.8,4.2,2.2,5.9c1.5,1.7,3.4,2.5,5.6,2.5 c1.7,0,3.1-0.5,4.2-1.6c1.1-1.1,1.7-2.4,1.7-4c0-1.7-0.5-3-1.4-4.1c-1-1.1-2.2-1.6-3.7-1.6c-0.9,0-1.7,0.2-2.3,0.7L9.1,9 c0.3-1.2,1-2.2,2.1-3C12.3,5.2,13.4,4.8,14.7,4.7L11.3,3.3z" />
                                    </svg>
                                    <span className="mt-1">{article.excerpt}</span>
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="sm:w-2 sm:h-2 w-18 h-18 text-brown self-end shrink-0"
                                        fill="currentColor"
                                    >
                                        <path d="M12.7,20.7c2.3-0.5,4.1-1.5,5.6-3c1.4-1.5,2.2-3.3,2.2-5.3c0-2.3-0.8-4.2-2.2-5.9c-1.5-1.7-3.4-2.5-5.6-2.5 c-1.7,0-3.1,0.5-4.2,1.6c-1.1,1.1-1.7,2.4-1.7,4c0,1.7,0.5,3,1.4,4.1c1,1.1,2.2,1.6,3.7,1.6c0.9,0,1.7-0.2,2.3-0.7l0.7,0.4 c-0.3,1.2-1,2.2-2.1,3c-1.1,0.8-2.2,1.2-3.5,1.3L12.7,20.7z" />
                                    </svg>
                                </blockquote>
                                <div className="text-right sm:mr-4 mt-18">
                                    - Rishabh Nahar, Partner and Fund Manager at Qode Advisors
                                </div>
                            </div>
                        )}

                        {article.additionalParagraph && (
                            <Text className="text-base leading-relaxed text-gray-700 mb-4">
                                {article.additionalParagraph}
                            </Text>
                        )}

                        {hasMultipleSources ? (
                            <div className="mt-4">
                                <div className="flex justify-center space-x-4 mb-4">
                                    {article.externalLinks.map((link, index) => (
                                        <button
                                            key={link.id}
                                            onClick={() => setActiveExternalIndex(index)}
                                            className={`py-18 px-18 border rounded transition-colors duration-300 ${activeExternalIndex === index
                                                    ? "bg-brown text-white"
                                                    : "bg-white text-brown hover:bg-brown hover:text-white"
                                                }`}
                                        >
                                            {link.source}
                                        </button>
                                    ))}
                                </div>
                                <div className="text-center">
                                    <a
                                        href={activeExternal.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block sm:px-6 sm:py-2 p-2 text-brown border-brown border rounded hover:bg-brown hover:text-white"
                                    >
                                        Read Full Article from {activeExternal.source}
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-2 text-center">
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block sm:px-6 sm:py-2 p-2 text-brown border-brown border rounded hover:bg-brown hover:text-white"
                                >
                                    Click here to read the full article
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </Section>
        </>
    );
};

export default NewsDetails;
