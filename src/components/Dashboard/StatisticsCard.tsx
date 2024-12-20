import React from 'react';

interface StatisticsCardProps {
  title: string;
  value: string | number;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-gray-600 text-lg">{title}</h3>
      <p className="text-2xl font-bold text-black">{value}</p>
    </div>
  );
};

export default StatisticsCard;
