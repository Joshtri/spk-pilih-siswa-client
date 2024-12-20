import React from "react";
import Layout from "../Layout";
import KriteriaList from "../../components/Kriteria/KriteriaList";
import Breadcrumbs from "../../components/Breadcrumbs";

const KriteriaPage: React.FC = () => {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Data Kriteria" },
  ];
  return (
    <Layout>
      <Breadcrumbs items={breadcrumbItems} />
        <Link></Link>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Halaman Kriteria
        </h1>
      <KriteriaList />
    </Layout>
  );
};

export default KriteriaPage;
