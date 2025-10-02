import { createBrowserRouter, RouterProvider } from "react-router";

import { LandingPageLayout } from "./layouts/landing-page-layout";
import { AuthLayout } from "./layouts/auth-layout";

import { HomePage } from "./pages/landing-page/home-page";
import { NotFoundPage } from "./pages/common/not-found";
import { InternalServerError } from "./pages/common/internal-server-error";

//======================================================================
// KONFIGURASI ROUTER
//======================================================================

const router = createBrowserRouter([
  {
    errorElement: <InternalServerError />,
    children: [
      // Public routes with LandingPageLayout
      {
        path: "/",
        element: <LandingPageLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "how-it-works",
            element: <div>how-it-works page</div>,
          },
          {
            path: "contact",
            element: <div>contact page</div>,
          },
        ],
      },
      // Protected routes (bisa ditambahkan layout khusus)
      {
        path: "profile",
        element: <div>Profile Page</div>, // TODO: Tambahkan layout untuk protected routes
      },
      // Auth routes with AuthLayout
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <div>Login Page</div>,
          },
          {
            path: "register",
            element: <div>Register Page</div>,
          },
        ],
      },
      // Catch all routes
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

/**
 * Komponen ini di panggil di file `index.tsx`.
 */
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
