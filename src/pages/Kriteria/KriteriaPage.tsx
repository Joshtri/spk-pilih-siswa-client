import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import KriteriaList from "../../components/Kriteria/KriteriaList";
import Breadcrumbs from "../../components/Breadcrumbs";
import KriteriaForm from "../../components/Kriteria/KriteriaForm";
import ReusableModal from "../../components/partials/ReusableModal"; // Import modal
import { Kriteria } from "../../types/kriteria";
import { createKriteria, updateKriteria, getAllKriteria, deleteKriteria } from "../../services/kriteriaService";

const KriteriaPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // State untuk modal view
  const [editingKriteria, setEditingKriteria] = useState<Kriteria | null>(null);
  const [viewingKriteria, setViewingKriteria] = useState<Kriteria | null>(null); // State untuk data view
  const [kriteriaList, setKriteriaList] = useState<Kriteria[]>([]);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Data Kriteria" },
  ];

  // Fetch all Kriteria on component mount
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

  // Handle opening the modal for adding or editing a kriteria
  const handleOpenModal = (kriteria?: Kriteria) => {
    setEditingKriteria(kriteria || null);
    setIsModalOpen(true);
  };

  // Handle opening the modal for viewing a kriteria
  const handleOpenViewModal = (kriteria: Kriteria) => {
    setViewingKriteria(kriteria);
    setIsViewModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingKriteria(null);
  };

  // Handle closing the view modal
  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingKriteria(null);
  };

  // Handle saving the kriteria data
  const handleSaveKriteria = async (data: Omit<Kriteria, "id">) => {
    try {
      if (editingKriteria) {
        const updatedKriteria = await updateKriteria(editingKriteria.id, data);
        setKriteriaList((prev) =>
          prev.map((item) => (item.id === updatedKriteria.id ? updatedKriteria : item))
        );
        console.log("Kriteria updated:", updatedKriteria);
      } else {
        const newKriteria = await createKriteria(data);
        setKriteriaList((prev) => [...prev, newKriteria]);
        console.log("Kriteria created:", newKriteria);
      }
    } catch (error) {
      console.error("Error saving kriteria:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  // Handle deleting a kriteria
  const handleDeleteKriteria = async (id: number) => {
    try {
      await deleteKriteria(id);
      setKriteriaList((prev) => prev.filter((item) => item.id !== id));
      console.log("Kriteria deleted:", id);
    } catch (error) {
      console.error("Error deleting kriteria:", error);
    }
  };

  return (
    <Layout>
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Data Kriteria</h1>

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
        onDelete={handleDeleteKriteria}
        onView={handleOpenViewModal} // Tambahkan handler view
      />

      {/* Modal for KriteriaForm */}
      <KriteriaForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveKriteria}
        initialData={editingKriteria || undefined}
      />

      {/* Modal for Viewing Kriteria */}
      {isViewModalOpen && viewingKriteria && (
        <ReusableModal title="Detail Kriteria" isOpen={isViewModalOpen} onClose={handleCloseViewModal}>
          <p><strong>ID:</strong> {viewingKriteria.id}</p>
          <p><strong>Nama Kriteria:</strong> {viewingKriteria.nama_kriteria}</p>
          <p><strong>Jenis Kriteria:</strong> {viewingKriteria.jenis_kriteria}</p>
          <p><strong>Bobot Kriteria:</strong> {viewingKriteria.bobot_kriteria * 100}%</p>
        </ReusableModal>
      )}
    </Layout>
  );
};

export default KriteriaPage;
