import axios from "axios";
import { ApiResponse } from "../types/apiResponse";
import { User } from "../types/user";

// Define the base API URL
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/v1/users`;

// Custom error type
interface AxiosErrorResponse {
    response?: {
        data?: {
            message?: string;
        };
    };
    message: string;
}

// Service to handle API operations for Users
export const userService = {
    async getAllUsers(): Promise<User[]> {
        try {
          console.log("Fetching users from:", API_URL); // Log URL
          const response = await axios.get<ApiResponse<User[]>>(API_URL);
          console.log("API Response:", response.data); // Log respons API penuh
          return response.data.data; // Pastikan akses ke `data`
        } catch (error: unknown) {
          console.error("Error in getAllUsers:", error); // Log error jika ada
          const axiosError = error as AxiosErrorResponse;
          throw new Error(
            axiosError.response?.data?.message || axiosError.message || "Failed to fetch users"
          );
        }
      },
      

  async getUserById(id: number): Promise<User> {
        try {
            const response = await axios.get<ApiResponse<User>>(`${API_URL}/${id}`);
            return response.data.data; // Adjust to access the nested "data" object
        } catch (error: unknown) {
            const axiosError = error as AxiosErrorResponse;
            throw new Error(
                axiosError.response?.data?.message || axiosError.message || "Failed to fetch user"
            );
        }
    },

    async createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
        try {
            const response = await axios.post<ApiResponse<User>>(`${API_URL}`, user);
            return response.data.data; // Adjust to access the nested "data" object
        } catch (error: unknown) {
            const axiosError = error as AxiosErrorResponse;
            throw new Error(
                axiosError.response?.data?.message || axiosError.message || "Failed to create user"
            );
        }
    },

    async updateUser(id: number, user: Partial<Omit<User, "id">>): Promise<User> {
        try {
            const response = await axios.put<ApiResponse<User>>(`${API_URL}/${id}`, user);
            return response.data.data; // Adjust to access the nested "data" object
        } catch (error: unknown) {
            const axiosError = error as AxiosErrorResponse;
            throw new Error(
                axiosError.response?.data?.message || axiosError.message || "Failed to update user"
            );
        }
    },

    async deleteUser(id: number): Promise<null> {
        try {
            const response = await axios.delete<ApiResponse<null>>(`${API_URL}/${id}`);
            return response.data.data; // Adjust to access the nested "data" object
        } catch (error: unknown) {
            const axiosError = error as AxiosErrorResponse;
            throw new Error(
                axiosError.response?.data?.message || axiosError.message || "Failed to delete user"
            );
        }
    },
};
