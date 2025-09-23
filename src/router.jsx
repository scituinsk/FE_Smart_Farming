import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link, // Digunakan untuk navigasi
} from "react-router";

//======================================================================
// DUMMY COMPONENTS (didefinisikan di sini agar file bisa langsung jalan)
//======================================================================

// --------------------
// Komponen Halaman (Pages)
// --------------------

const HomePage = () => (
  <div>
    <h2>Welcome to the Home Page</h2>
    <p>This is the main content area.</p>
  </div>
);

const AboutPage = () => (
  <div>
    <h2>About Us</h2>
    <p>Learn more about our company here.</p>
  </div>
);

const LoginPage = () => (
  <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
    <h2>Login</h2>
    <p>Please enter your credentials.</p>
    <form>
      <input
        type="text"
        placeholder="Username"
        style={{ display: "block", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="Password"
        style={{ display: "block", marginBottom: "10px" }}
      />
      <button type="submit">Sign In</button>
    </form>
  </div>
);

const NotFoundPage = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to="/">Go back to Home</Link>
  </div>
);

// --------------------
// Komponen Layout
// --------------------

const MainLayout = () => (
  <div style={{ border: "2px solid blue", padding: "10px", margin: "5px" }}>
    <header style={{ background: "#f0f0f0", padding: "10px", marginBottom: "10px" }}>
      <h1>My Application</h1>
      <nav>
        <Link
          to="/"
          style={{ marginRight: "15px" }}
        >
          Home
        </Link>
        <Link
          to="/about"
          style={{ marginRight: "15px" }}
        >
          About
        </Link>
        <Link to="/auth/login">Login</Link>
      </nav>
    </header>
    <main style={{ padding: "20px", border: "1px dashed blue" }}>
      {/* Konten halaman anak akan dirender di sini */}
      <Outlet />
    </main>
    <footer style={{ background: "#f0f0f0", padding: "10px", marginTop: "10px", textAlign: "center" }}>
      <p>&copy; 2025 My App</p>
    </footer>
  </div>
);

const AuthLayout = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#e9e9e9",
      border: "2px solid green",
      padding: "10px",
      margin: "5px",
    }}
  >
    {/* Halaman login/register akan dirender di sini */}
    <Outlet />
  </div>
);

// --------------------
// Komponen Root
// --------------------

/**
 * Komponen Root untuk menangani layout dasar.
 * <Outlet /> akan merender komponen anak (child route) yang cocok.
 */
const Root = () => {
  return (
    <>
      {/* Outlet akan merender MainLayout atau AuthLayout tergantung path URL */}
      <Outlet />
    </>
  );
};

//======================================================================
// KONFIGURASI ROUTER
//======================================================================

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundPage />, // Tampilkan ini jika ada error atau halaman tidak ditemukan
    children: [
      // Grup rute yang menggunakan MainLayout
      {
        element: <MainLayout />,
        children: [
          {
            index: true, // Rute default untuk '/'
            element: <HomePage />,
          },
          {
            path: "about", // menjadi '/about'
            element: <AboutPage />,
          },
        ],
      },
      // Grup rute yang menggunakan AuthLayout
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login", // menjadi '/auth/login'
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);

//======================================================================
// EKSPOR UTAMA
//======================================================================

/**
 * Komponen ini yang akan Anda panggil di file `app.tsx` atau `index.tsx`.
 */
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

// Untuk memudahkan, Anda juga bisa langsung mengekspornya sebagai default
// export default AppRouter;
