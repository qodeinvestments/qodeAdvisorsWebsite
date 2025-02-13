import React from "react";
import Section from "../components/container/Section";
import Heading from "../components/common/Heading";
import NewsCard from "../components/NewsCard";

const FeaturedArticles = () => {
    const articles = [
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
            imageUrl: "https://img.etimg.com/thumb/msid-117443918,width-650,height-488,imgsize-1092996,resizemode-75/foreign-investors-exit-indian-market.jpg",
            source: "The Economic Times",
            slug: "market-selloff-investor-strategy"
        }
    ];

    // Sort articles by date (newest first)
    const sortedArticles = articles.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <div className="mx-auto mt-8">
            <Heading
                isItalic
                className="text-center text-brown mb-4 text-heading font-heading"
            >
                Featured In
            </Heading>
            <Section padding="none">
                <div className="mx-auto grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {sortedArticles.map((article, index) => (
                        <NewsCard
                            key={article.url || index}
                            title={article.title}
                            excerpt={article.excerpt}
                            date={article.date} // Pass the date prop to NewsCard
                            // Use the slug if available, otherwise fallback to url
                            slug={article.slug || article.url}
                            // Map imageUrl to feature_image if that's what NewsCard expects
                            feature_image={article.imageUrl}
                            // Optionally pass the source as the primary author or any other prop
                            primary_author={{ name: article.source }}
                        />
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default FeaturedArticles;
