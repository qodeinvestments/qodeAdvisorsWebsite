import React, { useState } from "react";
import PerformanceChart from "./Charts/PerformanceChart";
import Section from "./container/Section";
import Text from "./common/Text";
import Heading from "./common/Heading";
import Modal from "./Modal";
import BookAMeet from "../Pages/BookAMeet";
import { Helmet } from "react-helmet";
import TrailingReturns from "./TrailingReturns";
import useFetchStrategyData from "./hooks/useFetchStrategyData";
import Drawdown from "./Drawdown";
// import AnnualReturns from "./AnnualReturns";
import AnnualCalendarDrawdown from "./Charts/qaw/AnnualCalendarDrawdown";
import ProbabilityOutperformance from "./Charts/qaw/ProbabilityOutperformance";
import PerformanceDashboard from "./PerformanceDashboard";
const StrategyComponent = ({ strategyData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { title, tagLine, description, principle, strategyCode, blogUrl  } =
    strategyData;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading, error } = useFetchStrategyData(strategyCode);
  // Helper function to format dates (e.g., "1st April 2007")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  // Extract the earliest and latest dates from the data
  const extractDateRange = (data) => {
    if (!data || data.length === 0) return { startDate: "0", endDate: "0" };

    const dates = data.map((entry) => new Date(entry.date));
    const startDate = new Date(Math.min(...dates));
    const endDate = new Date(Math.max(...dates));

    return {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };
  };

  const { startDate, endDate } = extractDateRange(data);

  return (
    <>
      <Helmet>
        <title>{title} - Strategy Overview | Qode Advisors LLP</title>
        <meta
          name="description"
          content={`Learn more about the ${title} strategy at Qode Advisors LLP. ${description}`}
        />
        <meta
          name="keywords"
          content={`${title}, ${tagLine}, investment strategy, Qode Advisors LLP`}
        />
        <meta name="author" content="Qode Advisors LLP" />
      </Helmet>

      <div className="mx-auto sm:mt-8 mt-8">
        <Section padding="normal">
          <Heading className="font-bold mb-1 text-brown text-center">
            <span className="block">{title}</span>
          </Heading>
          <Text className="text-center sm:text-subheading text-mobileSubHeading font-subheading mb-2">
            {tagLine}
          </Text>
          <Text className="text-center dm-sans-font text-body">
            {description}
          </Text>
          <br className="block md:hidden" />
          {principle && <Text className="text-center">{principle}</Text>}
        </Section>

        <Section padding="none">
          <TrailingReturns
            data={data}
            isLoading={isLoading}
            error={error}
            strategy={strategyCode}
            name={title}
            startDates={startDate}
            endDates={endDate}
          />
        </Section>

        <Section padding="normal" className="mb-2">
          <PerformanceChart
            data={data}
            strategy={strategyCode}
            name={title}
            blogUrl={blogUrl}
            error={error}
            isLoading={isLoading}
          />
        </Section>

        <Section padding="normal" className="mb-2">
          {/* Only show Drawdown chart when data is available and not loading */}
          {!isLoading && data && data.length > 0 && <Drawdown data={data} />}
        </Section>

        <Section padding="normal" className="mb-2">
          <QodeAllWeatherBlog data={data} isLoading={isLoading} error={error} />
        </Section>


        

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <BookAMeet />
          </Modal>
        )}
      </div>
    </>
  );
};

export default StrategyComponent;
