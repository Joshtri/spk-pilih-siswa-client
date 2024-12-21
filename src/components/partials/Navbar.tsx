// import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Navbar Brand */}
        <a href="#" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            SPK | Pemilihan Siswa Berprestasi
          </span>
        </a>

        {/* Mobile Menu Toggle */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
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

        {/* Desktop Menu */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col font-medium md:flex-row md:space-x-8 mt-4 md:mt-0">
            <li>
              <Link
                to="/dashboard"
                className="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-600 hover:font-medium md:p-0"
              >
                Dashboard
              </Link>
            </li>

            {/* Dropdown: Data */}
            <li className="relative group">
              <button className="block w-full py-2 pl-3 pr-4 text-gray-700 hover:text-blue-600 md:p-0">
                Data
              </button>
              <ul className="absolute hidden group-hover:block bg-white border shadow-lg mt-1 rounded-lg p-2 min-w-[200px] transition-all duration-200 ease-in-out">
                <li>
                  <Link
                    to="/siswa"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:rounded-md"
                  >
                    Data Siswa
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mata-pelajaran"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:rounded-md"
                  >
                    Data Mata Pelajaran
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kelas"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:rounded-md"
                  >
                    Data Kelas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kriteria"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:rounded-md"
                  >
                    Data Kriteria
                  </Link>
                </li>
              </ul>
            </li>

            {/* Dropdown: Penilaian */}
            <li className="relative group">
              <button className="block w-full py-2 pl-3 pr-4 text-gray-700 hover:text-blue-600 md:p-0">
                Penilaian
              </button>
              <ul className="absolute left-0 hidden group-hover:block bg-white border shadow-lg mt-1 rounded-lg p-2 transition-all duration-200 ease-in-out">
                <li>
                  <Link
                    to="/nilai-siswa"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:rounded-md"
                  >
                    Nilai Siswa
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ketidakhadiran"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:rounded-md"
                  >
                    Ketidakhadiran
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ekskul-siswa"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:rounded-md"
                  >
                    Ekstra Kurikuler Siswa
                  </Link>
                </li>
                <li>
                  <Link
                    to="/nilai-kriteria"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:rounded-md"
                  >
                    Nilai Kriteria
                  </Link>
                </li>
              </ul>
            </li>

            {/* Perhitungan Menu */}
            <li>
              <Link
                to="/perhitungan"
                className="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-600 md:p-0"
              >
                Perhitungan
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
