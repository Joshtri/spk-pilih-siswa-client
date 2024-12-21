import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUserAlt,
  FaBook,
  FaTags,
  FaClipboardList,
  FaChalkboardTeacher,
  FaChevronDown,
} from 'react-icons/fa';
import { MdAssessment } from 'react-icons/md';
import { FaUserAstronaut } from 'react-icons/fa6';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation(); // Mendapatkan lokasi saat ini
  const [isDataDropdownOpen, setIsDataDropdownOpen] = useState(false);

  // Periksa apakah lokasi saat ini ada di dalam grup Data
  const isDataActive = [
    '/siswa',
    '/mata-pelajaran',
    '/kelas',
    '/kriteria',
  ].includes(location.pathname);

  // Tetap buka dropdown jika salah satu submenu aktif
  React.useEffect(() => {
    if (isDataActive) {
      setIsDataDropdownOpen(true);
    }
  }, [isDataActive]);

  const handleLinkClick = () => {
    if (isSidebarOpen) toggleSidebar();
  };

  const toggleDataDropdown = () => {
    setIsDataDropdownOpen((prev) => !prev);
  };

  return (
    <aside
      className={`fixed md:relative top-0 left-0 min-h-screen w-64 bg-blue-800 text-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
    >
      <div className="p-4 border-b border-blue-700">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl font-bold text-center">SPK Siswa</h2>
        </div>
      </div>

      <nav className="mt-4">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center p-4 hover:bg-blue-900 rounded-md ${
                location.pathname === '/dashboard' ? 'bg-blue-700' : ''
              }`}
              onClick={handleLinkClick}
            >
              <FaHome className="mr-3" />
              Dashboard
            </Link>
          </li>

          {/* Data Group Dropdown */}
          <li>
            <div
              className={`flex items-center p-4 hover:bg-blue-900 rounded-md cursor-pointer ${
                isDataActive ? 'bg-blue-700' : ''
              }`}
              onClick={toggleDataDropdown}
            >
              <FaTags className="mr-3" />
              <span>Data</span>
              <FaChevronDown
                className={`ml-auto transform transition-transform ${
                  isDataDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </div>
            {isDataDropdownOpen && (
              <ul className="ml-4 space-y-2">
                <li>
                  <Link
                    to="/siswa"
                    className={`flex items-center p-3 hover:bg-blue-700 rounded-md ${
                      location.pathname === '/siswa' ? 'bg-blue-600' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                    <FaUserAlt className="mr-3" />
                    Data Siswa
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mata-pelajaran"
                    className={`flex items-center p-3 hover:bg-blue-700 rounded-md ${
                      location.pathname === '/mata-pelajaran' ? 'bg-blue-600' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                    <FaBook className="mr-3" />
                    Data Mata Pelajaran
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kelas"
                    className={`flex items-center p-3 hover:bg-blue-700 rounded-md ${
                      location.pathname === '/kelas' ? 'bg-blue-600' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                    <FaChalkboardTeacher className="mr-3" />
                    Data Kelas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kriteria"
                    className={`flex items-center p-3 hover:bg-blue-700 rounded-md ${
                      location.pathname === '/kriteria' ? 'bg-blue-600' : ''
                    }`}
                    onClick={handleLinkClick}
                  >
                    <FaTags className="mr-3" />
                    Data Kriteria
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Penilaian */}
          <li>
            <Link
              to="/penilaian"
              className={`flex items-center p-4 hover:bg-blue-900 rounded-md ${
                location.pathname === '/penilaian' ? 'bg-blue-700' : ''
              }`}
              onClick={handleLinkClick}
            >
              <FaClipboardList className="mr-3" />
              Penilaian
            </Link>
          </li>

          {/* Perhitungan */}
          <li>
            <Link
              to="/perhitungan"
              className={`flex items-center p-4 hover:bg-blue-900 rounded-md ${
                location.pathname === '/perhitungan' ? 'bg-blue-700' : ''
              }`}
              onClick={handleLinkClick}
            >
              <MdAssessment className="mr-3" />
              Perhitungan
            </Link>
          </li>
          {/* User */}
          <li>
            <Link
              to="/user"
              className={`flex items-center p-4 hover:bg-blue-900 rounded-md ${
                location.pathname === '/user' ? 'bg-blue-700' : ''
              }`}
              onClick={handleLinkClick}
            >
              <FaUserAstronaut className="mr-3" />
              Daftar User
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
