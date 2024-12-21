import React, { useState } from "react";
import PenilaianList from "../../components/Penilaian/PenilaianList";
import { Penilaian } from "../../types/penilaian";
import Layout from "../Layout";

const PenilaianPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [penilaian, setPenilaian] = useState<Penilaian[]>([
    { siswaId: 1, kriteriaId: 1, nilai_kriteria: 85 },
    { siswaId: 2, kriteriaId: 2, nilai_kriteria: 90 },
  ]);

  const handleEdit = (data: Penilaian) => {
    console.log("Edit penilaian:", data);
  };

  const handleDelete = (data: Penilaian) => {
    console.log("Delete penilaian:", data);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Layout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Halaman Penilaian</h1>
        <PenilaianList
          penilaian={penilaian}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </Layout>
  );
};

export default PenilaianPage;
