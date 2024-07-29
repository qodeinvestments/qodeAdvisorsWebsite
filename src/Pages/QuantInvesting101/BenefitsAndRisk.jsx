import React from "react";

const BenefitsAndRisk = () => {
  return (
    <div className=" mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-center text-3xl  text-gray-800">
        Quantitative Investment: Benefits and Risks
      </h1>

      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border-l-4 border-gray-500">
        <h2 className="text-xl  text-gray-600">Introduction</h2>
        <p>
          Quantitative investment strategies use mathematical models to identify
          investment opportunities and risks, relying heavily on computational
          techniques.
        </p>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-gray-500">
        <h2 className="text-xl  text-gray-600">Benefits</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Data-Driven Decisions: Reduces human error and emotional biases.
          </li>
          <li>
            Efficiency: Processes large datasets quickly to capitalize on market
            movements.
          </li>
          <li>
            Diversification: Automatically diversifies investments to optimize
            portfolio performance.
          </li>
          <li>
            Risk Management: Utilizes advanced algorithms to mitigate risks
            effectively.
          </li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-gray-500">
        <h2 className="text-xl  text-gray-600">Risks</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Model Overfitting: May not perform well in unpredictable market
            conditions.
          </li>
          <li>
            Complexity: High complexity can lead to misunderstandings and
            mismanagement.
          </li>
          <li>
            Dependency on Data: Susceptible to errors from incorrect or biased
            data inputs.
          </li>
          <li>
            Market Adaptability: May not respond adequately to sudden market
            changes.
          </li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-sm border-l-4 border-gray-500">
        <h2 className="text-xl  text-gray-600">Conclusion</h2>
        <p>
          While quantitative investment offers significant advantages,
          understanding its risks is crucial for effective implementation.
        </p>
      </div>
    </div>
  );
};

export default BenefitsAndRisk;
