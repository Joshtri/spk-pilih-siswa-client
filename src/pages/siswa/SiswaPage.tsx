import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Breadcrumbs from "../../components/Breadcrumbs";
import SiswaList from "../../components/Siswa/SiswaList";
import SiswaForm from "../../components/Siswa/SiswaForm";
import ReusableModal from "../../components/partials/ReusableModal";
import { Siswa } from "../../types/siswa";
import { getAllSiswa, createSiswa, updateSiswa, deleteSiswa } from "../../services/siswaService";

const SiswaPage: React.FC = () => {
  const [siswaList, setSiswaList] = useState<Siswa[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingSiswa, setEditingSiswa] = useState<Siswa | null>(null);
  const [deletingSiswa, setDeletingSiswa] = useState<Siswa | null>(null);
  const [viewingSiswa, setViewingSiswa] = useState<Siswa | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Data Siswa" },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSiswa();
        setSiswaList(data);
      } catch (error) {
        console.error("Error fetching siswa:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (siswa?: Siswa) => {
    setEditingSiswa(siswa || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSiswa(null);
  };

  const handleOpenDeleteModal = (siswa: Siswa) => {
    setDeletingSiswa(siswa);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingSiswa(null);
  };

  const handleOpenViewModal = (siswa: Siswa) => {
    setViewingSiswa(siswa);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewingSiswa(null);
    setIsViewModalOpen(false);
  };

  const handleSaveSiswa = async (data: Omit<Siswa, "id">) => {
    try {
      if (editingSiswa) {
        const updatedSiswa = await updateSiswa(editingSiswa.id, data);
        setSiswaList((prev) =>
          prev.map((item) => (item.id === updatedSiswa.id ? updatedSiswa : item))
        );
      } else {
        const newSiswa = await createSiswa(data);
        setSiswaList((prev) => [...prev, newSiswa]);
      }
    } catch (error) {
      console.error("Error saving siswa:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDeleteSiswa = async () => {
    try {
      if (deletingSiswa) {
        await deleteSiswa(deletingSiswa.id);
        setSiswaList((prev) => prev.filter((item) => item.id !== deletingSiswa.id));
        setDeletingSiswa(null);
      }
    } catch (error) {
      console.error("Error deleting siswa:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <Layout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Data Siswa</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Tambah Siswa
        </button>
      </div>

      <SiswaList
        siswa={siswaList}
        onEdit={handleOpenModal}
        onDelete={handleOpenDeleteModal}
        onView={handleOpenViewModal}
      />

      <SiswaForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveSiswa}
        initialData={editingSiswa || undefined}
      />

      {isViewModalOpen && viewingSiswa && (
        <ReusableModal
          title="Detail Siswa"
        isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
        >
          <div className="p-4">
            <p><strong>NISN:</strong> {viewingSiswa.nisn}</p>
            <p><strong>Nama:</strong> {viewingSiswa.nama}</p>
            <p><strong>Jenis Kelamin:</strong> {viewingSiswa.jenis_kelamin}</p>
            <p><strong>Alamat:</strong> {viewingSiswa.alamat}</p>
            <p><strong>Kelas ID:</strong> {viewingSiswa.kelasId}</p>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleCloseViewModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Tutup
            </button>
          </div>
        </ReusableModal>
      )}

      {isDeleteModalOpen && deletingSiswa && (
        <ReusableModal
          title="Konfirmasi Hapus"
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
        >
          <p>
            Apakah Anda yakin ingin menghapus siswa <strong>{deletingSiswa.nama}</strong>?
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleCloseDeleteModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              onClick={handleDeleteSiswa}
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

export default SiswaPage;
