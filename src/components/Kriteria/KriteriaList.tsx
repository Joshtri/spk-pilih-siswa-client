import React from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { Kriteria } from "../../types/kriteria";

interface KriteriaListProps {
  kriteria: Kriteria[]; // Data yang diterima dari parent
  onEdit: (kriteria: Kriteria) => void; // Callback untuk edit
  onDelete: (id: number) => void; // Callback untuk delete
  onView: (kriteria: Kriteria) => void; // Callback untuk view

}

const KriteriaList: React.FC<KriteriaListProps> = ({ kriteria, onEdit, onDelete, onView }) => {
  if (kriteria.length === 0) {
    return <p className="text-gray-500 text-center">Tidak ada data kriteria yang tersedia.</p>;
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Daftar Kriteria</h3>
      <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-blue-100 text-blue-800 text-sm">
            <th className="border border-gray-300 p-3 text-left">ID</th>
            <th className="border border-gray-300 p-3 text-left">Nama Kriteria</th>
            <th className="border border-gray-300 p-3 text-left">Jenis Kriteria</th>
            <th className="border border-gray-300 p-3 text-left">Bobot (%)</th>
            <th className="border border-gray-300 p-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kriteria.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition duration-200 ease-in-out">
              <td className="border border-gray-300 p-3">{item.id}</td>
              <td className="border border-gray-300 p-3">{item.nama_kriteria}</td>
              <td className="border border-gray-300 p-3">{item.jenis_kriteria}</td>
              <td className="border border-gray-300 p-3">{item.bobot_kriteria}</td>
              <td className="border border-gray-300 p-3 text-center flex justify-center gap-4">
                <button
                  className="text-green-500 hover:text-green-700"
                  title="View"
                  onClick={() => onView(item)}
                >
                  <FaEye size={18} />
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit"
                  onClick={() => onEdit(item)}
                >
                  <FaEdit size={18} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                  onClick={() => onDelete(item.id)}
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

export default KriteriaList;
