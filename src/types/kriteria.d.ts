export interface Kriteria {
    id: number; // ID unik untuk kriteria
    nama_kriteria: string; // Nama kriteria
    jenis_kriteria: string; // Jenis kriteria, contoh: 'Benefit' atau 'Cost'
    bobot_kriteria: number; // Bobot kriteria dalam bentuk float (0.0 - 1.0)
  }
  