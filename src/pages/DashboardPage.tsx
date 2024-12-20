import React from 'react';
import Layout from './Layout';
import RankingTable from '../components/Dashboard/RankingTable';
import CriteriaSummary from '../components/Dashboard/CriteriaSummary';
import EvaluationHistory from '../components/Dashboard/EvaluationHistory';
import StatisticsCard from '../components/Dashboard/StatisticsCard';

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-center text-black text-2xl font-bold">Dashboard Pemilihan Siswa Berprestasi</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Statistik Siswa */}
        <StatisticsCard title="Jumlah Siswa" value={120} />
        <StatisticsCard title="Jumlah Kriteria" value={5} />
        <StatisticsCard title="Evaluasi Terbaru" value="Desember 2024" />
      </div>
      <div className="mt-8">
        <RankingTable />
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <CriteriaSummary />
        <EvaluationHistory />
      </div>
    </Layout>
  );
};

export default DashboardPage;
