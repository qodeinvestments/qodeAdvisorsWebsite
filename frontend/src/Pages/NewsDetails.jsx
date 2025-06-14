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
        "date": "June 04, 2025",
        "title": "Expert view: Market valuation looks stretched; maintain a 5–10% allocation to gold, says Rishabh Nahar of Qode Advisors",
        "excerpt": "We continue to like high-quality companies with strong earnings visibility. However, we are balancing this with a healthy dose of caution",
        "additionalParagraph": `We advocate maintaining a 5–10 per cent strategic allocation to gold across all time horizons. This positioning serves as an effective hedge against inflation, negative real rates, and geopolitical uncertainty. We recommend adding to positions on meaningful pullbacks, as even a modest allocation can help dampen the volatility of an equity-heavy portfolio`,
        "imageUrl": "https://www.livemint.com/lm-img/img/2025/06/04/600x338/Rishabh_Nahar_of_Qode_Advisors_1749038899076_1749038904120.jpg",
        "source": "Mint Market",
        "slug": "expert-view-market-valuation-looks-stretched-maintain-a-5-10-allocation-to-gold-says-rishabh-nahar-of-qode-advisors",
        "url": "https://www.livemint.com/market/stock-market-news/expert-view-market-valuation-looks-stretched-maintain-a-5-10-allocation-to-gold-says-rishabh-nahar-of-qode-advisors-11749038786157.html",
        "author": "Rishabh Nahar, Partner and Fund Manager at Qode Advisors",
    },
    {
        "date": "May 20, 2025",
        "title": "Top 10 Portfolio Management Schemes for the month of April",
        "additionalParagraph": `The month of April saw the top 10 Portfolio Management Schemes give about 10% to 6% returns, with Trivantage Capital Management taking the lead at 9.86%. Followed by Qode Advisors' PMS, Tactical Fund and All Weather, with 9.56% and 8.72% returns, respectively.
The strategy is benchmarked to the S&P BSE 500 TRI.  It is managed by Rishabh Nahar and employs a quantitative framework to construct a diversified ETF portfolio. The approach focuses on allocating across low-correlated asset classes such as momentum, low volatility, and gold. Qode Tactical fund is based on a multi cap and flexi cap strategy, benchmarked to the S&P BSE 500 TRI.`,
        "imageUrl": "https://images.moneycontrol.com/static-mcnews/2025/05/20241109033650_sensex_nifty_stock_markets.jpg?impolicy=website&width=770&height=431",
        "source": "Money Control",
        "slug": "top-10-portfolio-management-schemes-april-2025",
        "author": "Rishabh Nahar, Partner and Fund Manager at Qode Advisors",
        "url": "https://www.moneycontrol.com/news/business/markets/top-10-portfolio-management-schemes-for-the-month-of-april-13034763.html",
    },
    {
        "date": "May 23, 2025",
        "title": "ETMarkets PMS Talk: India’s growth + global devaluation = next bull market - Qode’s FY26 outlook",
        "excerpt": `Money printing and devaluation, coupled with India’s strong growth, are setting the stage for the next bull market`,
        "imageUrl": "/Rishabh-15.png",
        "source": "The Economic Times",
        "slug": "etmarkets-pms-talk-indias-growth-global-devaluation-next-bull-market-qodes-fy26-outlook",
        "url": "https://economictimes.indiatimes.com/markets/expert-view/etmarkets-pms-talk-indias-growth-global-devaluation-next-bull-market-qodes-fy26-outlook/articleshow/121333426.cms?from=mdr",
        "author": "Rishabh Nahar, Partner and Fund Manager at Qode Advisors",
        "additionalParagraph": "Our macro view remains fixed at the growth story for India and Equity markets. With the US debt crisis coming closer, a large amount of US debt is maturing in the next four years. Money printing and devaluation will be a large factor for equities to do well. So, money printing/devaluation plus a strong position for India will fuel the next bull market. Having exposure to assets like equities/gold and real estate (mostly land) will be a key component for individuals to maintain/grow their wealth."
    },
    {
        "date": "May 13, 2025",
        "title": "PMS Tracker: Top 15 funds gain up to 10% in April, while quant, smallcap strategies falter",
        "additionalParagraph": `Qode Advisors LLP secured the next two spots with its Tactical Fund and All Weather strategies gaining 9.56% and 8.72%, respectively. 2Point2 Capital’s Long Term Value Fund rose 8.10%, while Alchemy Capital Management’s High Growth strategy returned 7.14%.
In April, PMS fund performance varied widely across categories. While several multi-cap, smallcap, and thematic strategies registered solid gains, others — particularly quant-driven and high-beta smallcap portfolios — saw pressure amid market volatility.`,
        "imageUrl": "https://m.economictimes.com/thumb/height-450,width-600,imgsize-73944,msid-121137912/pms-tracker-top-15-funds-gain-up-to-10-in-april-while-quant-smallcap-strategies-falter.jpg",
        "source": "The Economic Times",
        "slug": "pms-tracker-top-15-funds-gain-up-to-10-in-april-while-quant-smallcap-strategies-falter",
        "url": "https://m.economictimes.com/markets/stocks/news/pms-tracker-top-15-funds-gain-up-to-10-in-april-while-quant-smallcap-strategies-falter/amp_articleshow/121137939.cms",
    },
    {
        "date": "May 02, 2025",
        "title": "Gold prices crack ₹7,000 from peak: Is it time to shift focus towards silver? ",
        "excerpt": `Historically, when the ratio crosses 80, silver tends to outperform gold in subsequent periods. With the ratio hovering near multi-decade highs, silver appears undervalued relative to gold. This divergence isn’t just technical it reflects how silver has lagged in pricing in the same macro risks that are driving gold: geopolitical uncertainty, central bank accumulation, and currency debasement trends. For investors, this makes silver an attractive, asymmetric bet within the precious metals basket`,
        "additionalParagraph": "Gold prices have fallen by ₹7,000 to ₹93,000 per 10 grams after a peak above ₹1 lakh amid easing trade tensions and profit-taking as demand for safe-haven assets decreases. With further correction in gold prices likely, analysts' outlook for silver is more constructive.",
        "imageUrl": "https://www.livemint.com/lm-img/img/2025/05/02/600x338/gold_and_silver_prices_March_31_markets_news_India_1743385413433_1746182173488.jpg",
        "source": "Mint Markets",
        "slug": "gold-prices-crack",
        "author": "Rishabh Nahar, Partner and Fund Manager at Qode Advisors",
        "url": "https://www.livemint.com/market/commodities/gold-prices-crack-rs-7-000-from-peak-is-it-time-to-shift-focus-towards-silver-11746181967193.html",
    },
    {
        "date": "April 30, 2025",
        "title": "'Equities are no longer optional': Qode’s Rishabh Nahar on navigating market uncertainty with quant strategy ",
        "excerpt": `Quant investing isn’t about secret algorithms. People often think of quant investing as a black box spitting out multibagger stocks. But at its core, it’s about first principles - owning businesses with strong earnings growth.`,
        "additionalParagraph": "Many people treat investing seriously but only as a side activity, spending maybe 20–30 minutes a day picking stocks. If you're not able to devote time consistently, it's better to invest via mutual funds or professional managers. However, if you're serious about wealth creation, there are many ways to generate alpha — one of the most eective being a multi-asset approach. Investing is a long-term journey. If your horizon is 5–10 years, what matters is the compounded outcome at the end. You want to own growth-driven businesses and build a peaceful, sustainable investment experience. A multiasset portfolio helps reduce drawdowns and emotional stress, especially during market corrections. ",
        "imageUrl": "/Rishabh-15.png",
        "source": "Economic Times",
        "slug": "equities-are-no-longer-options",
        "author": "Rishabh Nahar, Partner and Fund Manager at Qode Advisors",
        "url": "https://economictimes.indiatimes.com/markets/expert-view/equities-are-no-longer-optional-qodes-rishabh-nahar-on-navigating-market-uncertainty-with-quant-strategy/articleshow/120737564.cms?from=mdr",
    },
    {
        "date": "April 18, 2025",
        "title": "Gold prices on a record-hitting spree: Can MCX Gold hit the ₹1 lakh mark in April or May 2025?",
        "excerpt": "If gold already forms a large part of your portfolio, it’s a good time to book partial profits. For those underexposed, we think buying on dips - especially when paired with silver - can offer a better risk-reward.",
        "author": "Rishabh Nahar, Partner and Fund Manager at Qode Advisors",
        "additionalParagraph": "Gold has rallied over 26% in the past six months, hitting lifetime highs on the MCX and inching closer to the ₹75,000 mark. With geopolitical tensions, a weakening dollar, and expectations of rate cuts by the US Fed, investors are betting big on the yellow metal. The big question now is—can gold touch the elusive ₹1 lakh per 10 grams in the coming months?",
        "imageUrl": "https://www.livemint.com/lm-img/img/2025/04/18/600x338/pexels-photo-366551_1744966477739_1744966494956.jpeg",
        "source": "Mint Markets",
        "slug": "gold-prices-record-highs",
        "url": "https://www.livemint.com/market/commodities/gold-prices-on-a-record-hitting-spree-can-mcx-gold-rate-hit-1-lakh-mark-in-april-or-may-2025-11744966232802.html",
    },
    {
        "date": "April 12, 2025",
        "title": "Mind Over Money: Bhagavad Gita, First Principles & Fitness: The unconventional investing path of Rishabh Nahar",
        "excerpt": "For me, staying mentally fit starts with staying physically fit. I work out 5-6 days a week and try to eat healthy most of the time. Honestly, I believe a lot of mental stability comes from being healthy and maintaining a disciplined lifestyle. If you keep your body in good shape, the mind tends to follow. On top of that, getting good sleep at the right times helps me stay mentally sharp throughout the day.",
        "imageUrl": "/Rishabh_New.png",
        "source": "Economic Times",
        "slug": "mind-over-money",
        "additionalParagraph": "At Qode Invest, our philosophy is all about thinking from first principles and using mental models, a concept popularized by Charlie Munger. First principles thinking is about breaking down complex problems into their most fundamental truths and reasoning from there. Rather than relying on assumptions, it helps us make decisions that are grounded in real understanding.",
        "author": "Rishabh Nahar, Partner and Fund Manager at Qode Advisors",
        "url": "https://m.economictimes.com/markets/expert-view/mind-over-m0ney-bhagavad-gita-first-principles-fitness-the-unconventional-investing-path-of-rishabh-nahar/amp_articleshow/120226227.cms"
    },
    {
        "date": "April 2, 2025",
        "title": "This fund manager expects RBI to cut interest rates by 75 bps in FY26, advises betting on these 4 sectors",
        "excerpt": "Additionally, sectors such as defense and specialty chemicals could benefit from global supply chain diversification. Select opportunities in energy transition and digitization also remain attractive.",
        "additionalParagraph": "A 12–13% earnings growth is something we expect in the large-cap space. There is a lot of earnings visibility among the larger businesses. The slowdown is dependent on a lot of global factors, especially a recession in the US. This could impact the coming quarters for many small- and mid-cap businesses. On a consolidated basis, we will definitely see earnings growth, but individually, you will see businesses slow down if they are dependent on global macros.",
        "imageUrl": "/Rishabh-15.png",
        "source": "Money Control",
        "slug": "rbi-interest-rate-cuts",
        "url": "https://www.moneycontrol.com/news/business/markets/daily-voice-this-fund-manager-expects-rbi-to-cut-interest-rates-by-75-bps-in-fy26-advises-betting-on-these-4-sectors-12980846.html/amp",
        "author": "Rishabh Nahar, Partner and Fund Manager at Qode Advisors"
    },
    {
        date: "March 24, 2025",
        title:
            "Five years since pandemic crash: Penny stockholders are celebrating. But for how long can they?",
        excerpt:
            "The government’s Make in India push through several production-linked incentive (PLI) schemes created a thriving ecosystem for new small companies after covid. Hence, these companies have seen their earnings grow 2-3x faster in the last six years, compared to the growth seen in the last 15 years. Naturally, the risk appetite for this segment also rose sharply after the pandemic, especially from HNIs. ",
        additionalParagraph: "However, most experts cautioned that even though the broader pool has improved, investors are still locked in risky bets as further corrections will choke the exits from this segment. They also noted that while the latest rally has offered temporary relief to these multi-baggers, any more falls are likely to expose the cracks beneath the surface, and only the fundamentally sound ones will stand strong in the end.",
        imageUrl:
            "https://www.livemint.com/lm-img/img/2025/03/23/600x338/gccdbfbe1df55fb78eaf53eaaf1b005aa8664a8713b6cbbac2_1727422374094_1742744060141.jpg",
        source: "Mint Markets",
        slug: "penny-stockholders-celebrating",
        url: "https://www.livemint.com/market/stock-market-news/penny-stocks-investors-multi-bagger-covid-pandemic-crash-smallcaps-midcaps-11742702528891.html",
        author: "Gaurav Didwania, Partner and Fund Manager at Qode Advisors"
    },
    {
        date: "March 19, 2025",
        title: "Why gold shines as a hedge against stock market volatility",
        excerpt: "While gold may not be a wealth creation asset in the traditional sense, it remains an essential tool for diversification and capital protection.",
        additionalParagraph: "When we consider any asset class, we often view it as a store of wealth. The fundamental question we ask is simple: Will this asset retain its value over the next 5, 10, 15 or even 50 years, or will it lose its worth? The general principle is clear: If an asset can be produced in infinite quantities, its value will eventually diminish. However, if an asset is limited in supply and holds intrinsic utility, it is more likely to retain its value.",
        imageUrl: "https://images.moneycontrol.com/static-mcnews/2025/03/20250314103723_goldpricertr.png?impolicy=website&width=770&height=431",
        source: "Money Control",
        slug: "gold-shines-as-hedge-against-stock-market-volatility",
        url: "https://www.moneycontrol.com/news/business/personal-finance/why-gold-shines-as-a-hedge-against-stock-market-volatility-12968465.html",
        author: "Rishabh Nahar, Partner and Fund Manager at Qode Advisors"
    },
    {
        date: "March 18, 2025",
        title: "Top 10 Portfolio Management Schemes for the month of February 2025",
        paragraphs: [
            "Qode All Weather: Managed by Rishabh Nahar, the investment strategy focuses on constructing a diversified ETF portfolio aimed at delivering risk-adjusted returns. The approach utilises quantitative insights to optimise asset allocation across low-correlated asset classes, ensuring stability and consistent performance across varying market conditions, with an objective to outperform the Nifty.",
            "Qode Tactical Fund: This strategy follows a momentum-based investment approach, prioritising stocks with strong upward trends while swiftly exiting those that underperform. It integrates advanced timing models and derivatives hedging to manage risk, optimise tax efficiency, and safeguard against market downturns, ensuring steady capital growth."
        ],
        imageUrl: "https://images.moneycontrol.com/static-mcnews/2025/03/20250318055050_slideshow-khushi-1703251.jpg",
        source: "Money Control",
        slug: "top-10-portfolio-management-schemes",
        url: "https://www.moneycontrol.com/news/business/markets/top-10-portfolio-management-schemes-for-the-month-of-february-2025-12967323.html",
        author: "Rishabh Nahar, Partner and Fund Manager at Qode Advisors"
    },
    {
        date: "March 10, 2025",
        title: "March is Usually Strong for Indian Equities, Will Trump's Policy Swings Disrupt the Trend?",
        excerpt: "Harvest losses for tax benefits, trim laggards and offset gains. Lower return expectations. The last five years of equity returns won't repeat, so churn wisely. Bull markets fill portfolios with high-growth, high-debt stocks. Bear markets demand discipline, clean out weak names and position for the next cycle.",
        imageUrl: "https://media.assettype.com/outlookbusiness/import/uploadimage/library/16_9/16_9_5/IMAGE_1651656523.webp?w=640&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0",
        additionalParagraph: "Foreign capital outflow continues to weigh heavily on investor sentiment causing panic across D-street. However, the pace of selling has somewhat reduced. As per a report by Elara Securities, outflows from India have slowed to their lowest level since January 2025. Last week's outflows stood at $113 million compared to the average weekly outflow of $460 million since the beginning of the year. The current market correction has also eased hot valuations in certain pockets, which was necessary. The bloodbath in domestic equities has resulted in a significant valuation adjustment across indices. The Nifty-50 is now trading at a forward PE of 18.6x, which is 9% below its long-term average, as per Motilal Oswal. India's market cap-to-GDP ratio, which hit a high of 146% last year in September month, has also declined to 120%. A level closer to its historical averages.",
        source: "Outlook Business",
        slug: "march-strong-for-indian-equities",
        url: "https://www.outlookbusiness.com/markets/march-is-usually-strong-for-indian-equities-will-trumps-policy-swings-disrupt-the-trend",
        author: "Rishabh Nahar, Partner and Fund Manager at Qode Advisors"

    },
    {
        date: "March 10, 2025",
        title: "How to navigate the rollercoaster ride on Dalal Street? Here are 6 strategies to beat stock market volatility",
        excerpt: "Despite the ongoing market correction, Nahar views this phase as a strategic opportunity for investors to buy quality stocks at attractive valuations. By maintaining discipline, focusing on long-term fundamentals, and avoiding reactionary decisions, investors may position themselves to benefit significantly when market sentiment improves. Instead of fearing volatility, he suggests embracing it as part of the investment journey towards wealth creation.",
        additionalParagraph: "Long-Term Horizon Over Market Timing: According to Nahar, attempting to predict the exact market bottom is challenging, making investing for a long-term horizon—at least three years—more prudent. He notes that declining markets often lead to attractive valuations in high-quality stocks, which can deliver strong returns once sentiment improves and the market rebounds.",
        url: "https://www.livemint.com/market/how-to-navigate-the-rollercoaster-ride-on-dalal-street-here-are-6-key-strategies-to-beat-stock-market-volatility-11741252507737.html",
        slug: "dalal-street-strategies",
        imageUrl: "/Rishabh-15.png",
        source: "Mint Markets",
        author: "Rishabh Nahar, Partner and Fund Manager at Qode Advisors"

    },
    {
        date: "February 20, 2025",
        title: "Indian Equity Markets Pain Worsen as Economy, Corporate Profits Slow",
        excerpt: "The broader markets may struggle to deliver the returns investors have grown accustomed to,",
        slug: "indian-equity-multi",
        imageUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202502/stock-market-ahead-20445435-16x9_0.jpg?VersionId=EAUJ0wPUqEKyM8yTVjOY3w3CAV7RNjko&size=690:388",
        source: "Reuters, Deccan Herald, The Print, India Today",
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
        slug: "retailers-at-risk",
        author: "Rishabh Nahar, Partner and Fund Manager at Qode Advisors"

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
        slug: "dos-and-donts-for-investors",
        author: "Rishabh Nahar, Partner and Fund Manager at Qode Advisors"

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
        slug: "the-market-timing-illusion",
        author: "Rishabh Nahar, Partner and Fund Manager at Qode Advisors"

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
        slug: "daily-voice-green-energy-budget-2025",
        author: "Rishabh Nahar, Partner and Fund Manager at Qode Advisors"

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
        source: "Money Control",
        author: "Rishabh Nahar, Partner and Fund Manager at Qode Advisors"

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
        source: "The Hindu BusinessLine",
        author: "Rishabh Nahar, Partner and Fund Manager at Qode Advisors"

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
        slug: "market-selloff-investor-strategy",
        author: "Rishabh Nahar, Partner and Fund Manager at Qode Advisors"

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
                                    <Text className="text-gray-400">{article.author}</Text>
                                </div>
                            </div>
                        )}

                        {article.additionalParagraph && (
                            <Text className="text-base leading-relaxed text-gray-700 mb-4">
                                {article.additionalParagraph}
                            </Text>
                        )}

                        {article.paragraphs && article.paragraphs.map((paragraph, index) => (
                            <Text key={index} className="text-base leading-relaxed text-gray-700 mb-1">
                                {paragraph}
                            </Text>
                        ))}

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
