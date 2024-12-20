import React from 'react';

interface EvaluationHistoryItem {
  date: string;
  topStudent: string;
}

const EvaluationHistory: React.FC = () => {
  const history: EvaluationHistoryItem[] = [
    { date: "November 2024", topStudent: "Jane Smith" },
    { date: "October 2024", topStudent: "John Doe" },
  ];

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-gray-600 text-lg mb-4">Evaluation History</h3>
      <ul className="list-disc ml-5">
        {history.map((item, index) => (
          <li key={index}>
            {item.date} - Top Student: {item.topStudent}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EvaluationHistory;
