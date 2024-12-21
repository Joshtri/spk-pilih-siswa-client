// Updated KriteriaForm component
import React, { useState, useEffect } from "react";
import { Kriteria } from "../../types/kriteria";

interface KriteriaModalFormProps {
  isOpen: boolean; // Controls if the modal is open or not
  onClose: () => void; // Callback to close the modal
  onSubmit: (data: Omit<Kriteria, "id">) => void; // Callback to submit the form data
  initialData?: Omit<Kriteria, "id">; // Optional initial data for editing
}

const KriteriaForm: React.FC<KriteriaModalFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Omit<Kriteria, "id">>({
    nama_kriteria: "",
    bobot_kriteria: null!,
    jenis_kriteria: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "bobot_kriteria" ? parseInt(value) || 0 : value, // Parse as integer for bobot_kriteria
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {initialData ? "Edit Kriteria" : "Tambah Kriteria"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nama_kriteria" className="block text-sm font-medium text-gray-700">
              Nama Kriteria
            </label>
            <input
              type="text"
              id="nama_kriteria"
              name="nama_kriteria"
              value={formData.nama_kriteria}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bobot_kriteria" className="block text-sm font-medium text-gray-700">
              Bobot Kriteria (Dalam Persen)
            </label>
            <input
              type="number"
              id="bobot_kriteria"
              name="bobot_kriteria"
              value={formData.bobot_kriteria}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
              min="0"
              max="100"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="jenis_kriteria" className="block text-sm font-medium text-gray-700">
              Jenis Kriteria
            </label>
            <select
              id="jenis_kriteria"
              name="jenis_kriteria"
              value={formData.jenis_kriteria}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>
                Pilih Jenis Kriteria
              </option>
              <option value="benefit">Benefit</option>
              <option value="cost">Cost</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {initialData ? "Perbarui" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KriteriaForm;