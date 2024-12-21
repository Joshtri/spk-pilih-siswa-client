import axios from "axios";
import { Siswa } from "../types/siswa";
import { ApiResponse } from "../types/apiResponse";

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/v1/siswa`;

export const getAllSiswa = async (): Promise<Siswa[]> => {
  try {
    const response = await axios.get<ApiResponse<Siswa[]>>(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("[GET] Error fetching siswa:", error);
    return [];
  }
};

export const getSiswaById = async (id: number): Promise<Siswa> => {
  try {
    const response = await axios.get<ApiResponse<Siswa>>(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("[GET] Error fetching siswa by ID:", error);
    throw new Error("Gagal mendapatkan data siswa");
  }
};

export const createSiswa = async (data: Omit<Siswa, "id">): Promise<Siswa> => {
  try {
    const response = await axios.post<ApiResponse<Siswa>>(API_URL, data);
    return response.data.data;
  } catch (error) {
    console.error("[POST] Error creating siswa:", error);
    throw new Error("Gagal membuat siswa");
  }
};

export const updateSiswa = async (id: number, data: Omit<Siswa, "id">): Promise<Siswa> => {
  try {
    const response = await axios.put<ApiResponse<Siswa>>(`${API_URL}/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error("[PUT] Error updating siswa:", error);
    throw new Error("Gagal memperbarui siswa");
  }
};

export const deleteSiswa = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("[DELETE] Error deleting siswa:", error);
    throw new Error("Gagal menghapus siswa");
  }
};
