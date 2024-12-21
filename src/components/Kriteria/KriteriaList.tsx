import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import ReusableModal from "../partials/ReusableModal";
import { Kriteria } from "../../types/kriteria";

const KriteriaList: React.FC = () => {
  const [selectedKriteria, setSelectedKriteria] = useState<Kriteria | null>(null);
  const [modalType, setModalType] = useState<"view" | "edit" | "delete" | null>(null);

  const kriteria: Kriteria[] = [
    { id: 1, nama_kriteria: "Nilai Akademik", jenis_kriteria: "Benefit", bobot_kriteria: 0.4 },
    { id: 2, nama_kriteria: "Kehadiran", jenis_kriteria: "Benefit", bobot_kriteria: 0.3 },
    { id: 3, nama_kriteria: "Ekstrakurikuler", jenis_kriteria: "Benefit", bobot_kriteria: 0.3 },
  ];

  const openModal = (type: "view" | "edit" | "delete", kriteria: Kriteria) => {
    setSelectedKriteria(kriteria);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedKriteria(null);
    setModalType(null);
  };

  const handleDelete = () => {
    console.log("Deleted:", selectedKriteria?.id);
    closeModal();
  };

  const handleSave = () => {
    console.log("Saved:", selectedKriteria);
    closeModal();
  };

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
              <td className="border border-gray-300 p-3">{item.bobot_kriteria * 100}</td>
              <td className="border border-gray-300 p-3 text-center flex justify-center gap-4">
                <button className="text-green-500 hover:text-green-700" title="View" onClick={() => openModal("view", item)}>
                  <FaEye size={18} />
                </button>
                <button className="text-blue-500 hover:text-blue-700" title="Edit" onClick={() => openModal("edit", item)}>
                  <FaEdit size={18} />
                </button>
                <button className="text-red-500 hover:text-red-700" title="Delete" onClick={() => openModal("delete", item)}>
                  <FaTrashAlt size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalType === "view" && selectedKriteria && (
        <ReusableModal title="Detail Kriteria" isOpen={!!modalType} onClose={closeModal}>
          <p><strong>Nama:</strong> {selectedKriteria.nama_kriteria}</p>
          <p><strong>Jenis:</strong> {selectedKriteria.jenis_kriteria}</p>
          {/* <p><strong>Deskripsi:</strong> {selectedKriteria.jenis_kriteria_desc}</p> */}
          <p><strong>Bobot:</strong> {selectedKriteria.bobot_kriteria * 100}%</p>
        </ReusableModal>
      )}

      {modalType === "edit" && selectedKriteria && (
        <ReusableModal title="Edit Kriteria" isOpen={!!modalType} onClose={closeModal}>
          <label className="block mb-2">Nama Kriteria:</label>
          <input type="text" className="w-full border border-gray-300 rounded p-2" defaultValue={selectedKriteria.nama_kriteria} />
          <label className="block mt-4 mb-2">Jenis Kriteria:</label>
          <input type="text" className="w-full border border-gray-300 rounded p-2" defaultValue={selectedKriteria.jenis_kriteria} />
          <div className="mt-4 flex justify-end gap-2">
            <button className="px-4 py-2 bg-gray-300 rounded" onClick={closeModal}>
              Batal
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>
              Simpan
            </button>
          </div>
        </ReusableModal>
      )}

      {modalType === "delete" && selectedKriteria && (
        <ReusableModal title="Konfirmasi Hapus" isOpen={!!modalType} onClose={closeModal}>
          <p>Apakah Anda yakin ingin menghapus kriteria <strong>{selectedKriteria.nama_kriteria}</strong>?</p>
          <div className="mt-4 flex justify-end gap-2">
            <button className="px-4 py-2 bg-gray-300 rounded" onClick={closeModal}>
              Batal
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleDelete}>
              Hapus
            </button>
          </div>
        </ReusableModal>
      )}
    </div>
  );
};

export default KriteriaList;
