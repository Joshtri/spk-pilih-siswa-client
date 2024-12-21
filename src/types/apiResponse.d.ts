export interface ApiResponse<T> {
    data: T; // Isi respons API berada dalam properti 'data'
    message: string; // Pesan tambahan (jika ada)
    status: string; // Status respons (e.g., 'success', 'error')
}