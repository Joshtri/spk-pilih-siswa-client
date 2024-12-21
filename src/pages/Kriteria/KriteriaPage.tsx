import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import KriteriaList from "../../components/Kriteria/KriteriaList";
import Breadcrumbs from "../../components/Breadcrumbs";
import KriteriaForm from "../../components/Kriteria/KriteriaForm";
import ReusableModal from "../../components/partials/ReusableModal";
import { Kriteria } from "../../types/kriteria";
import {
  createKriteria,
  updateKriteria,
  getAllKriteria,
  deleteKriteria,
} from "../../services/kriteriaService";

const KriteriaPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingKriteria, setEditingKriteria] = useState<Kriteria | null>(null);
  const [deletingKriteria, setDeletingKriteria] = useState<Kriteria | null>(null);
  const [kriteriaList, setKriteriaList] = useState<Kriteria[]>([]);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Data Kriteria" },
  ];

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllKriteria();
        setKriteriaList(data);
      } catch (error) {
        console.error("Error fetching kriteria:", error);
      }
    };

    fetchData();
  }, []);

  // Open modal for add/edit
  const handleOpenModal = (kriteria?: Kriteria) => {
    setEditingKriteria(kriteria || null);
    setIsModalOpen(true);
  };

  // Close add/edit modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingKriteria(null);
  };

  // Open modal for delete confirmation
  const handleOpenDeleteModal = (kriteria: Kriteria) => {
    setDeletingKriteria(kriteria);
    setIsDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingKriteria(null);
  };

  // Save data
  const handleSaveKriteria = async (data: Omit<Kriteria, "id">) => {
    try {
      if (editingKriteria) {
        const updatedKriteria = await updateKriteria(editingKriteria.id, data);
        setKriteriaList((prev) =>
          prev.map((item) => (item.id === updatedKriteria.id ? updatedKriteria : item))
        );
      } else {
        const newKriteria = await createKriteria(data);
        setKriteriaList((prev) => [...prev, newKriteria]);
      }
    } catch (error) {
      console.error("Error saving kriteria:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  // Delete data
  const handleDeleteKriteria = async () => {
    try {
      if (deletingKriteria) {
        await deleteKriteria(deletingKriteria.id);
        setKriteriaList((prev) =>
          prev.filter((item) => item.id !== deletingKriteria.id)
        );
        setDeletingKriteria(null);
      }
    } catch (error) {
      console.error("Error deleting kriteria:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <Layout>
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Data Kriteria
      </h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Tambah Kriteria
        </button>
      </div>

      <KriteriaList
        kriteria={kriteriaList}
        onEdit={handleOpenModal}
        onDelete={handleOpenDeleteModal}
      />

      {/* Modal for Add/Edit */}
      <KriteriaForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveKriteria}
        initialData={editingKriteria || undefined}
      />

      {/* Modal for Delete Confirmation */}
      {isDeleteModalOpen && deletingKriteria && (
        <ReusableModal
          title="Konfirmasi Hapus"
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
        >
          <p>
            Apakah Anda yakin ingin menghapus kriteria{" "}
            <strong>{deletingKriteria.nama_kriteria}</strong>?
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleCloseDeleteModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              onClick={handleDeleteKriteria}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
        </ReusableModal>
      )}
    </Layout>
  );
};

export default KriteriaPage;
