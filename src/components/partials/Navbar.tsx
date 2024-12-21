import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-expanded={isSidebarOpen}
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Title */}
        <a href="#" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            SPK | Pemilihan Siswa Berprestasi
          </span>
        </a>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <FaUserCircle className="w-6 h-6" />
            <span className="hidden md:inline">Nama Pengguna</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg z-50">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                >
                  Profil
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    console.log("Logout berhasil");
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
