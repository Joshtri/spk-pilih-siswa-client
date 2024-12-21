import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import Breadcrumbs from "../../components/Breadcrumbs";
import KelasList from "../../components/Kelas/KelasList";
import KelasForm from "../../components/Kelas/KelasForm";
import ReusableModal from "../../components/partials/ReusableModal";
import { Kelas } from "../../types/kelas";
import { getAllKelas, createKelas, updateKelas, deleteKelas } from "../../services/kelasService";

const KelasPage: React.FC = () => {
  const [kelasList, setKelasList] = useState<Kelas[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingKelas, setEditingKelas] = useState<Kelas | null>(null);
  const [viewingKelas, setViewingKelas] = useState<Kelas | null>(null);
  const [deletingKelas, setDeletingKelas] = useState<Kelas | null>(null);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Data Kelas" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllKelas();
        setKelasList(data);
      } catch (error) {
        console.error("Error fetching kelas:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (kelas?: Kelas) => {
    setEditingKelas(kelas || null);
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (kelas: Kelas) => {
    setViewingKelas(kelas);
    setIsViewModalOpen(true);
  };

  const handleOpenDeleteModal = (kelas: Kelas) => {
    setDeletingKelas(kelas);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingKelas(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingKelas(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingKelas(null);
  };

  const handleSaveKelas = async (data: Omit<Kelas, "id">) => {
    try {
      if (editingKelas) {
        const updatedKelas = await updateKelas(editingKelas.id, data);
        setKelasList((prev) =>
          prev.map((item) => (item.id === updatedKelas.id ? updatedKelas : item))
        );
      } else {
        const newKelas = await createKelas(data);
        setKelasList((prev) => [...prev, newKelas]);
      }
    } catch (error) {
      console.error("Error saving kelas:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDeleteKelas = async () => {
    try {
      if (deletingKelas) {
        await deleteKelas(deletingKelas.id);
        setKelasList((prev) => prev.filter((item) => item.id !== deletingKelas.id));
        console.log("Kelas deleted:", deletingKelas.id);
      }
    } catch (error) {
      console.error("Error deleting kelas:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <Layout>
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Data Kelas</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Tambah Kelas
        </button>
      </div>

      <KelasList
        kelas={kelasList}
        onEdit={handleOpenModal}
        onDelete={handleOpenDeleteModal}
        onView={handleOpenViewModal}
      />

      {/* Modal for View */}
      {isViewModalOpen && viewingKelas && (
        <ReusableModal
          title="Detail Kelas"
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
        >
          <p><strong>ID:</strong> {viewingKelas.id}</p>
          <p><strong>Nama Kelas:</strong> {viewingKelas.nama_kelas}</p>
        </ReusableModal>
      )}

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <KelasForm
          initialData={editingKelas || undefined}
          onSubmit={handleSaveKelas}
          onClose={handleCloseModal}
        />
      )}

      {/* Modal for Delete Confirmation */}
      {isDeleteModalOpen && deletingKelas && (
        <ReusableModal
          title="Konfirmasi Hapus"
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
        >
          <p>Apakah Anda yakin ingin menghapus kelas <strong>{deletingKelas.nama_kelas}</strong>?</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={handleCloseDeleteModal}
            >
              Batal
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleDeleteKelas}
            >
              Hapus
            </button>
          </div>
        </ReusableModal>
      )}
    </Layout>
  );
};

export default KelasPage;
