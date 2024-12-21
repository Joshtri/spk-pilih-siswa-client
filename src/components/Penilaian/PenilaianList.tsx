import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Penilaian } from "../../types/penilaian";

interface PenilaianListProps {
  penilaian: Penilaian[];
  onEdit: (penilaian: Penilaian) => void;
  onDelete: (penilaian: Penilaian) => void;
}

const PenilaianList: React.FC<PenilaianListProps> = ({
  penilaian,
  onEdit,
  onDelete,
}) => {
  if (penilaian.length === 0) {
    return <p className="text-gray-500 text-center">Tidak ada data penilaian.</p>;
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Daftar Penilaian</h3>
      <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-blue-100 text-blue-800 text-sm">
            <th className="border border-gray-300 p-3 text-left">No</th>
            <th className="border border-gray-300 p-3 text-left">ID Siswa</th>
            <th className="border border-gray-300 p-3 text-left">ID Kriteria</th>
            <th className="border border-gray-300 p-3 text-left">Nilai Kriteria</th>
            <th className="border border-gray-300 p-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {penilaian.map((item, index) => (
            <tr key={`${item.siswaId}-${item.kriteriaId}`} className="hover:bg-gray-50 transition duration-200 ease-in-out">
              <td className="border border-gray-300 p-3">{index + 1}</td>
              <td className="border border-gray-300 p-3">{item.siswaId}</td>
              <td className="border border-gray-300 p-3">{item.kriteriaId}</td>
              <td className="border border-gray-300 p-3">{item.nilai_kriteria}</td>
              <td className="border border-gray-300 p-3 text-center flex gap-4 justify-center">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PenilaianList;
