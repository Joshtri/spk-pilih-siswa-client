import React from "react";
import { Kelas } from "../../types/kelas";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

interface KelasListProps {
  kelas: Kelas[];
  onEdit: (kelas: Kelas) => void;
  onDelete: (id: number) => void; // Sesuaikan dengan tipe id
  onView: (kelas: Kelas) => void;
}

const KelasList: React.FC<KelasListProps> = ({ kelas, onEdit, onDelete, onView }) => {
  if (kelas.length === 0) {
    return <p className="text-gray-500 text-center">Tidak ada data kelas yang tersedia.</p>;
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Daftar Kelas</h3>
      <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-blue-100 text-blue-800 text-sm">
            <th className="border border-gray-300 p-3 text-left">ID</th>
            <th className="border border-gray-300 p-3 text-left">Nama Kelas</th>
            <th className="border border-gray-300 p-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kelas.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition duration-200 ease-in-out">
              <td className="border border-gra y-300 p-3">{item.id}</td>
              <td className="border border-gray-300 p-3">{item.nama_kelas}</td>
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

export default KelasList;
