import React from "react";
import { Kelas } from "../../types/kelas";

interface KelasFormProps {
  initialData?: Omit<Kelas, "id">; // Data awal untuk edit
  onSubmit: (data: Omit<Kelas, "id">) => void; // Callback untuk submit form
  onClose: () => void; // Callback untuk menutup form
}

const KelasForm: React.FC<KelasFormProps> = ({
  initialData,
  onSubmit,
  onClose,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nama_kelas = formData.get("nama_kelas") as string;

    if (nama_kelas.trim() === "") {
      alert("Nama kelas tidak boleh kosong.");
      return;
    }

    // Logging the data being submitted
    console.log("[FORM] Submitted data:", { nama_kelas });

    onSubmit({ nama_kelas });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-lg font-bold mb-4">
          {initialData ? "Edit Kelas" : "Tambah Kelas"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nama_kelas" className="block text-gray-700">
              Nama Kelas
            </label>
            <input
              type="text"
              id="nama_kelas"
              name="nama_kelas"
              defaultValue={initialData?.nama_kelas || ""}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KelasForm;
