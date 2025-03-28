# 📌 Laporan Kekerasan Ibu dan Anak

> Sebuah aplikasi berbasis web yang mempermudah masyarakat dalam melaporkan kasus kekerasan terhadap ibu dan anak. Dibangun menggunakan **Vite + React.js + TypeScript** untuk tampilan antarmuka yang responsif dan user-friendly.

## 📢 Tentang Proyek
Aplikasi Laporan Kekerasan Ibu dan Anak merupakan tugas capstone kami di **Coding Camp 2025** dengan tema **"Inclusivity for All"**.

### 👨‍💻 Tim Pengembang:
1. Sipa Sopiatul Patoni : Frontend Developer
2. Kamila Putri Herlambang : Frontend Developer
3. Elgiva Rasyad Aditya Putra : Backend Developer
4. Thomas Christian Kuntolukito : Backend Developer
5. Bintang Raga Pratama : Machine Learning Engineer
6. Yogi Kautsar Alnandeta : Machine Learning Engineer

## 🚀 Fitur Utama
- ✅ **Pelaporan Online** – Pengguna dapat mengisi formulir laporan kekerasan dengan bukti foto.
- ✅ **Anonimitas Terjaga** – Pelapor dapat memilih untuk tetap anonim.
- ✅ **Tracking Laporan** – Cek status laporan secara real-time.
- ✅ **Dashboard Admin** – Admin dapat mengelola laporan, memberikan respon, dan melihat statistik laporan.
- ✅ **Pelayanan** – Layanan konsultasi berbasis chatbot.

## 🛠️ Teknologi yang Digunakan
- **Frontend:** Vite, React.js, TypeScript, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Machine Learning:** NumPy, Flask, TensorFlow
- **Deployment:** Vercel

## 📦 Instalasi dan Menjalankan Proyek
Ikuti langkah-langkah berikut untuk menjalankan proyek di lokal:

### 1️⃣ Clone Repository
```bash
git clone https://github.com/kamilaap/laporan-kekerasan.git
cd laporan-kekerasan
```

### 2️⃣ Install Dependensi
```bash
npm install
```

### 3️⃣ Konfigurasi Environment
Buat file `.env` di root proyek dan tambahkan konfigurasi berikut:
```env
VITE_API_URL=https://api-sipa-capstone-production.up.railway.app
```

### 4️⃣ Jalankan Aplikasi
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173`

## 🚀 Deployment
Untuk deploy ke **Vercel**, jalankan:
```bash
vercel
```

## 📄 API Endpoint
Proyek ini terhubung dengan backend, berikut daftar endpoint utama:

| Method | Endpoint            | Deskripsi                          |
|--------|---------------------|-----------------------------------|
| GET    | `/https://api-sipa-capstone-production.up.railway.app/pengaduan`      | Mengambil semua laporan          |
| PUT   | `/https://api-sipa-capstone-production.up.railway.app/cek-pengaduan/status_pengaduan_id`      | Mengedit Status Pengaduan             |
| POST  | `/https://api-sipa-capstone-production.up.railway.app/pengaduan/`  | Membuat Laporan baru|
| GET | `/https://api-sipa-capstone-production.up.railway.app/cek-pengaduan/nomorPengaduan`  | Mengecek status laporan       |
| POST| `/https://api-sipa-capstone-production.up.railway.app/login`  | Login      |
| POST | `/https://api-sipa-capstone-production.up.railway.app/register` | Register |
| PUT| `/https://api-sipa-capstone-production.up.railway.app/forgot-password` | Untuk lupa password|
| GET|`/https://api-sipa-capstone-production.up.railway.app/artikel` | Mengambil semua artikel|

## 💡 Kontribusi
Jika ingin berkontribusi, silakan buat **pull request** atau laporkan bug di **Issues**.


