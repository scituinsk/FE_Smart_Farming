import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Styling dan konfigurasi bisa diletakkan di luar komponen
// agar tidak perlu dibuat ulang terus-menerus.
NProgress.configure({ showSpinner: false });

const styleId = "nprogress-custom-style";
const color = "#326765";
const height = 3;

// Hapus style lama jika ada (untuk HMR di development)
document.getElementById(styleId)?.remove();

// Inject style sekali saja saat aplikasi dimuat
const style = document.createElement("style");
style.id = styleId;
style.innerHTML = `
    #nprogress .bar {
        background: ${color} !important;
        height: ${height}px !important;
        z-index: 99999;
    }
    #nprogress .peg {
        box-shadow: 0 0 10px ${color}, 0 0 5px ${color} !important;
    }
`;
document.head.appendChild(style);

export default function TopLoader() {
  const location = useLocation();

  useEffect(() => {
    // Efek ini akan berjalan setiap kali halaman selesai dirender SETELAH route berubah.
    // Ini adalah waktu yang tepat untuk menghentikan loading bar dari transisi sebelumnya.
    NProgress.done();

    // Fungsi cleanup ini akan berjalan TEPAT SEBELUM route mulai berubah ke halaman berikutnya.
    // Ini adalah waktu yang tepat untuk memulai loading bar.
    return () => {
      NProgress.start();
    };
  }, [location.pathname]); // Hanya bergantung pada perubahan path URL

  return null;
}
