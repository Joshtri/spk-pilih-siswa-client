import React from "react";
import { Siswa } from "../../types/siswa";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

interface SiswaListProps {
  siswa: Siswa[];
  onEdit: (siswa: Siswa) => void;
  onDelete: (id: number) => void;
  onView: (siswa: Siswa) => void;
}

const SiswaList: React.FC<SiswaListProps> = ({ siswa, onEdit, onDelete, onView }) => {
  if (siswa.length === 0) {
    return <p className="text-gray-500 text-center">Tidak ada data siswa yang tersedia.</p>;
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Daftar Siswa</h3>
      <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-blue-100 text-blue-800 text-sm">
            <th className="border border-gray-300 p-3 text-left">ID</th>
            <th className="border border-gray-300 p-3 text-left">NISN</th>
            <th className="border border-gray-300 p-3 text-left">Nama</th>
            <th className="border border-gray-300 p-3 text-left">Jenis Kelamin</th>
            <th className="border border-gray-300 p-3 text-left">Alamat</th>
            <th className="border border-gray-300 p-3 text-left">Kelas ID</th>
            <th className="border border-gray-300 p-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {siswa.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition duration-200 ease-in-out">
              <td className="border border-gray-300 p-3">{item.id}</td>
              <td className="border border-gray-300 p-3">{item.nisn}</td>
              <td className="border border-gray-300 p-3">{item.nama}</td>
              <td className="border border-gray-300 p-3">{item.jenis_kelamin}</td>
              <td className="border border-gray-300 p-3">{item.alamat}</td>
              <td className="border border-gray-300 p-3">{item.kelasId}</td>
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

export default SiswaList;
