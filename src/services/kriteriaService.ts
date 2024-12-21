import axios from "axios";
import { Kriteria } from "../types/kriteria";
import { ApiResponse } from "../types/apiResponse";

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/v1/kriteria`;

// Fetch all Kriteria
export const getAllKriteria = async (): Promise<Kriteria[]> => {
  try {
    console.log("[GET] Fetching all Kriteria...");
    const response = await axios.get<ApiResponse<Kriteria[]>>(API_URL);
    const data = response.data?.data || []; // Pastikan data selalu berupa array
    console.log("[GET] Response data:", data);
    return data;
  } catch (error) {
    console.error("[GET] Error fetching all Kriteria:", (error as Error).message);
    return []; // Kembalikan array kosong jika terjadi kesalahan
  }
};


// Fetch Kriteria by ID
export const getKriteriaById = async (id: number): Promise<Kriteria> => {
  try {
    console.log(`[GET] Fetching Kriteria with ID: ${id}...`);
    const response = await axios.get<ApiResponse<Kriteria>>(`${API_URL}/${id}`);
    console.log("[GET] Response data:", response.data);
    return response.data.data;
  } catch (error) {
    console.error(`[GET] Error fetching Kriteria with ID: ${id}`, (error as Error).message);
    throw new Error("Gagal mendapatkan detail Kriteria");
  }
};

// Updated `createKriteria` service
export const createKriteria = async (data: Omit<Kriteria, "id">): Promise<Kriteria> => {
  try {
    console.log("[POST] Creating a new Kriteria...", data);
    const response = await axios.post<ApiResponse<Kriteria>>(API_URL, {
      ...data,
      bobot_kriteria: parseInt(data.bobot_kriteria.toString()), // Pastikan dalam integer
    });
    console.log("[POST] Response data:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("[POST] Error creating Kriteria:", (error as Error).message);
    throw new Error("Gagal membuat data Kriteria");
  }
};



// Update an existing Kriteria
export const updateKriteria = async (id: number, data: Omit<Kriteria, "id">): Promise<Kriteria> => {
  try {
    console.log(`[PUT] Updating Kriteria with ID: ${id}...`, data);
    const response = await axios.put<ApiResponse<Kriteria>>(`${API_URL}/${id}`, data);
    console.log("[PUT] Response data:", response.data);
    return response.data.data;
  } catch (error) {
    console.error(`[PUT] Error updating Kriteria with ID: ${id}`, (error as Error).message);
    throw new Error("Gagal memperbarui data Kriteria");
  }
};

// Delete a Kriteria by ID
export const deleteKriteria = async (id: number): Promise<void> => {
  try {
    console.log(`[DELETE] Deleting Kriteria with ID: ${id}...`);
    await axios.delete(`${API_URL}/${id}`);
    console.log("[DELETE] Kriteria deleted successfully");
  } catch (error) {
    console.error(`[DELETE] Error deleting Kriteria with ID: ${id}`, (error as Error).message);
    throw new Error("Gagal menghapus data Kriteria");
  }
};
