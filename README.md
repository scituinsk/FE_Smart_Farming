# 📖 Panduan Struktur Folder Proyek React untuk aplikasi Smart Farming Platflorm Web

Dokumen ini bertujuan untuk menjadi panduan resmi bagi tim dalam mengatur struktur folder dan file pada proyek React kita. Mengikuti struktur yang konsisten akan membantu meningkatkan **maintainability**, **skalabilitas**, dan **kolaborasi** antar developer.

## Prinsip Utama

Struktur ini dirancang dengan beberapa prinsip utama:

- **Modular**: Kode diorganisir berdasarkan fitur atau domain, bukan hanya berdasarkan tipe file.
- **Reusable**: Komponen, hooks, dan utilitas mudah ditemukan dan digunakan kembali.
- **Scalable**: Mudah untuk menambahkan fitur baru tanpa merusak struktur yang sudah ada.
- **Separation of Concerns**: Setiap bagian dari aplikasi (UI, state, logic, services) memiliki tempatnya sendiri yang jelas.

---

## 📁 Struktur Direktori Root

Berikut adalah struktur dasar pada level root proyek kita:

```
/nama-proyek
  ├── /public/            # Aset statis yang tidak diproses oleh bundler
  ├── /src/               # Folder utama kode aplikasi kita
  ├── .gitignore          # File dan folder yang diabaikan oleh Git
  ├── package.json        # Dependensi dan skrip proyek
  ├── README.md           # Informasi umum tentang proyek
  ├── tsconfig.json       # Konfigurasi TypeScript
  ├── vite.config.js      # Konfigurasi Vite
  └── .eslintrc.json      # Konfigurasi ESLint
```

---

## 📂 Struktur Folder `/src`

Folder `/src` adalah tempat di mana 99% pekerjaan kita akan dilakukan. Semua kode sumber aplikasi React berada di sini.

```
/src
  ├── /assets/           # Aset statis (gambar, font, svg) yang diimpor ke komponen
  ├── /components/       # Komponen UI yang dapat digunakan kembali (reusable)
  ├── /config/           # Konfigurasi aplikasi (variabel environment, dll.)
  ├── /features/         # Logika dan komponen yang spesifik untuk sebuah fitur
  ├── /hooks/            # Custom React hooks
  ├── /layouts/          # Komponen layout (Header, Sidebar, MainLayout)
  ├── /pages/            # Komponen halaman yang terhubung ke rute
  ├── /router/           # Konfigurasi routing aplikasi
  ├── /services/         # Komunikasi dengan API eksternal
  ├── /store/            # State management global (Zustand, Redux, Context)
  ├── /styles/           # File styling global (CSS, SASS)
  ├── /types/            # Definisi tipe TypeScript
  ├── /utils/            # Fungsi bantuan umum (helper functions)
  └── index.jsx          # Titik masuk utama aplikasi (entry point)
```

---

## 🎯 Detail Setiap Folder di `/src`

Berikut penjelasan rinci untuk setiap folder.

### `/assets`

- **Tujuan**: Menyimpan aset statis seperti gambar, ikon (SVG), dan font yang akan diimpor dan digunakan di dalam komponen.
- **Contoh**: `logo.svg`, `user-avatar-default.png`.

### `/components`

- **Tujuan**: Berisi komponen UI yang **generik dan dapat digunakan kembali** di berbagai bagian aplikasi. Komponen di sini tidak boleh memiliki logika bisnis yang spesifik.
- **Aturan**: Pikirkan komponen ini seperti "Lego". Mereka harus bodoh (dumb components) dan hanya menerima props.
- **Contoh**:
  ```
  /components
    ├── /ui/            # Komponen UI dari Shadcn/Radix (Button, Card, Input)
    ├── /common/        # Komponen umum buatan sendiri (Modal, Spinner, Table)
    └── index.js        # Opsional: untuk ekspor semua komponen dari satu file
  ```

### `/config`

- **Tujuan**: Menyimpan semua konfigurasi aplikasi, terutama variabel environment. Ini memisahkan konfigurasi dari logika.
- **Contoh**:
  ```
  /config
    └── index.js        // export const API_BASE_URL = import.meta.env.VITE_API_URL;
  ```

### `/features`

- **Tujuan**: **Ini adalah folder paling penting untuk skalabilitas.** Setiap folder di dalamnya mewakili satu fitur bisnis aplikasi. Folder ini berisi semua hal yang berhubungan dengan fitur tersebut: komponen spesifik, hooks, dan bahkan state.
- **Aturan**: Jika sebuah komponen hanya digunakan dalam satu fitur, letakkan di sini, bukan di `/components`.
- **Contoh**:
  ```
  /features
    ├── /authentication/  # Fitur login, register, logout
    │   ├── /components/    # LoginForm.jsx, RegisterForm.jsx
    │   ├── /hooks/         # useAuth.js
    │   └── index.js
    └── /order-management/  # Fitur manajemen pesanan
        ├── /components/    # OrderTable.jsx, OrderDetail.jsx
        ├── /services/      # orderService.js
        └── index.js
  ```

### `/hooks`

- **Tujuan**: Menyimpan _custom hooks_ yang dapat digunakan kembali di seluruh aplikasi.
- **Aturan**: Hanya hooks yang benar-benar generik yang disimpan di sini. Jika hook hanya untuk satu fitur, letakkan di dalam folder fitur tersebut.
- **Contoh**: `useDebounce.js`, `useLocalStorage.js`.

### `/layouts`

- **Tujuan**: Komponen yang mendefinisikan struktur tata letak halaman, seperti `Header`, `Sidebar`, dan `Footer`.
- **Aturan**: Layout biasanya berisi komponen `<Outlet />` dari React Router.
- **Contoh**: `MainLayout.jsx`, `DashboardLayout.jsx`.

### `/pages`

- **Tujuan**: Komponen yang mewakili satu halaman penuh dari aplikasi. Komponen ini biasanya dipetakan ke satu rute URL.
- **Aturan**: Halaman bertugas untuk "merakit" komponen dari `/components` dan `/features` menggunakan sebuah `/layouts`. Halaman tidak boleh berisi terlalu banyak logika.
- **Contoh**: `HomePage.jsx`, `ProfilePage.jsx`, `SettingsPage.jsx`.

### `/router`

- **Tujuan**: Tempat untuk mendefinisikan semua rute (routes) aplikasi menggunakan React Router.
- **Aturan**: Memisahkan konfigurasi rute membuat `App.jsx` atau `main.jsx` menjadi lebih bersih.
- **Contoh**: `index.jsx` yang berisi `createBrowserRouter`.

### `/services`

- **Tujuan**: Mengelola semua komunikasi dengan dunia luar, terutama **panggilan API**.
- **Aturan**: Gunakan `axios` atau `fetch` di sini. Pisahkan logika panggilan API dari komponen agar lebih mudah di-test dan di-maintain.
- **Contoh**: `authService.js`, `productService.js`.

### `/store`

- **Tujuan**: Untuk state management global. Semua file terkait Zustand, Redux, atau Context API diletakkan di sini.
- **Aturan**: Pisahkan _store_ atau _slice_ berdasarkan domain atau fitur.
- **Contoh**: `useAuthStore.js`, `useCartStore.js`.

### `/styles`

- **Tujuan**: Menyimpan file styling global.
- **Contoh**: `index.css` untuk styling global atau reset CSS.

### `/types`

- **Tujuan**: (Khusus TypeScript) Berisi definisi tipe atau _interface_ yang dapat digunakan kembali di seluruh aplikasi.
- **Contoh**: `user.d.ts`, `api.d.ts`.

### `/utils`

- **Tujuan**: Kumpulan fungsi bantuan (helper/utility) yang murni dan tidak memiliki _side-effect_.
- **Aturan**: Fungsi-fungsi ini bisa digunakan di mana saja.
- **Contoh**: `formatDate.js`, `calculateDiscount.js`.
