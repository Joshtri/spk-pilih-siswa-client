import React, { useState } from "react";
import Layout from "../Layout";
import KriteriaList from "../../components/Kriteria/KriteriaList";
import Breadcrumbs from "../../components/Breadcrumbs";
import KriteriaForm from "../../components/Kriteria/KriteriaForm"; // Import KriteriaForm
import { Kriteria } from "../../types/kriteria"; // Import Kriteria type

const KriteriaPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKriteria, setEditingKriteria] = useState<Kriteria | null>(null);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Data Kriteria" },
  ];

  // Handle opening the modal for adding or editing a kriteria
  const handleOpenModal = (kriteria?: Kriteria) => {
    setEditingKriteria(kriteria || null);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingKriteria(null);
  };

  // Handle saving the kriteria data
  const handleSaveKriteria = (data: Omit<Kriteria, "id">) => {
    if (editingKriteria) {
      console.log("Kriteria updated:", { ...editingKriteria, ...data });
    } else {
      console.log("Kriteria created:", data);
    }
    // Logic to save or update the data (e.g., API call) can go here.
    setIsModalOpen(false); // Close modal after saving
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

      <KriteriaList onEdit={handleOpenModal} />

      {/* Modal for KriteriaForm */}
      <KriteriaForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveKriteria}
        initialData={editingKriteria || undefined}
      />
    </Layout>
  );
};

export default KriteriaPage;
