import React from 'react';

interface Criterion {
  name: string;
  weight: number;
}

const CriteriaSummary: React.FC = () => {
  const criteria: Criterion[] = [
    { name: "Nilai Akademik", weight: 0.4 },
    { name: "Kehadiran", weight: 0.3 },
    { name: "Ekstrakurikuler", weight: 0.3 },
  ];

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-gray-600 text-lg mb-4">Daftar Kriteria</h3>
      <ul className="list-disc ml-5">
        {criteria.map((criterion, index) => (
          <li key={index}>
            {criterion.name} - Bobot: {criterion.weight * 100}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CriteriaSummary;
