import React from 'react';

interface RankingTableItem {
  id: number;
  name: string;
  score: number;
}

const RankingTable: React.FC = () => {
  const rankingData: RankingTableItem[] = [
    { id: 1, name: "John Doe", score: 90 },
    { id: 2, name: "Jane Smith", score: 85 },
    { id: 3, name: "Alice Johnson", score: 82 },
  ];

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-gray-600 text-lg mb-4">Peringkat Siswa</h3>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">No</th>
            <th className="border border-gray-300 p-2">Nama Siswa</th>
            <th className="border border-gray-300 p-2">Skor</th>
          </tr>
        </thead>
        <tbody>
          {rankingData.map((student, index) => (
            <tr key={student.id}>
              <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2 text-center">{student.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;
