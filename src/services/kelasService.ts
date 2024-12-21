import axios from "axios";
import { Kelas } from "../types/kelas";
import { ApiResponse } from "../types/apiResponse";

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/v1/kelas`;

// Fetch all Kelas
export const getAllKelas = async (): Promise<Kelas[]> => {
  try {
    console.log("[GET] Fetching all Kelas...");
    const response = await axios.get<ApiResponse<Kelas[]>>(API_URL);
    const data = response.data?.data || []; // Pastikan data selalu berupa array
    console.log("[GET] Response data:", data);
    return data;
  } catch (error) {
    console.error("[GET] Error fetching all Kelas:", (error as Error).message);
    return []; // Kembalikan array kosong jika terjadi kesalahan
  }
};

// Fetch Kelas by ID
export const getKelasById = async (id: number): Promise<Kelas> => {
  try {
    console.log(`[GET] Fetching Kelas with ID: ${id}...`);
    const response = await axios.get<ApiResponse<Kelas>>(`${API_URL}/${id}`);
    const data = response.data?.data;
    console.log("[GET] Response data:", data);
    return data;
  } catch (error) {
    console.error(`[GET] Error fetching Kelas with ID: ${id}`, (error as Error).message);
    throw new Error("Gagal mendapatkan data Kelas");
  }
};

// Create a new Kelas
export const createKelas = async (data: Omit<Kelas, "id">): Promise<Kelas> => {
  try {
    console.log("[POST] Creating a new Kelas...", data);
    const response = await axios.post<ApiResponse<Kelas>>(API_URL, data);
    const createdData = response.data?.data;
    console.log("[POST] Response data:", createdData);
    return createdData;
  } catch (error) {
    console.error("[POST] Error creating Kelas:", (error as Error).message);
    throw new Error("Gagal membuat data Kelas");
  }
};

// Update an existing Kelas
export const updateKelas = async (id: number, data: Omit<Kelas, "id">): Promise<Kelas> => {
  try {
    console.log(`[PUT] Updating Kelas with ID: ${id}...`, data);
    const response = await axios.put<ApiResponse<Kelas>>(`${API_URL}/${id}`, data);
    const updatedData = response.data?.data;
    console.log("[PUT] Response data:", updatedData);
    return updatedData;
  } catch (error) {
    console.error(`[PUT] Error updating Kelas with ID: ${id}`, (error as Error).message);
    throw new Error("Gagal memperbarui data Kelas");
  }
};

// Delete a Kelas by ID
export const deleteKelas = async (id: number): Promise<void> => {
  try {
    console.log(`[DELETE] Deleting Kelas with ID: ${id}...`);
    await axios.delete(`${API_URL}/${id}`);
    console.log("[DELETE] Kelas deleted successfully");
  } catch (error) {
    console.error(`[DELETE] Error deleting Kelas with ID: ${id}`, (error as Error).message);
    throw new Error("Gagal menghapus data Kelas");
  }
};
