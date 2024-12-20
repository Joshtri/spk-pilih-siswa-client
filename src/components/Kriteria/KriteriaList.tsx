import React from 'react';

interface KriteriaItem {
  id: number;
  nama_kriteria: string;
  jenis_kriteria: string;
  bobot_kriteria: number;
}

const KriteriaList: React.FC = () => {
  // Contoh data untuk Kriteria
  const kriteria: KriteriaItem[] = [
    { id: 1, nama_kriteria: 'Nilai Akademik', jenis_kriteria: 'Benefit', bobot_kriteria: 0.4 },
    { id: 2, nama_kriteria: 'Kehadiran', jenis_kriteria: 'Benefit', bobot_kriteria: 0.3 },
    { id: 3, nama_kriteria: 'Ekstrakurikuler', jenis_kriteria: 'Benefit', bobot_kriteria: 0.3 },
  ];

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Daftar Kriteria</h3>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">ID</th>
            <th className="border border-gray-300 p-2 text-left">Nama Kriteria</th>
            <th className="border border-gray-300 p-2 text-left">Jenis Kriteria</th>
            <th className="border border-gray-300 p-2 text-left">Bobot (%)</th>
          </tr>
        </thead>
        <tbody>
          {kriteria.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 p-2">{item.id}</td>
              <td className="border border-gray-300 p-2">{item.nama_kriteria}</td>
              <td className="border border-gray-300 p-2">{item.jenis_kriteria}</td>
              <td className="border border-gray-300 p-2">{item.bobot_kriteria * 100}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KriteriaList;
