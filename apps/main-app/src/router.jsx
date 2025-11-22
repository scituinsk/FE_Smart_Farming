import { createBrowserRouter, RouterProvider } from "react-router";

import { AuthLayout } from "./layouts/auth-layout";
import { GlobalLayout } from "./layouts/global-layout";
import { CoreAppLayout } from "./layouts/core-app-layout";
import { LandingPageLayout } from "./layouts/landing-page-layout";

import { HomePage } from "./pages/landing-page/home-page";
import { NotFoundPage } from "./pages/common/not-found";
import { InternalServerError } from "./pages/common/internal-server-error";
import { DashboardPage } from "./pages/core-app/dashboard-page";
import { HistoryPage } from "./pages/core-app/history-page";

//======================================================================
// KONFIGURASI ROUTER
//======================================================================

const router = createBrowserRouter([
  {
    errorElement: <InternalServerError />,
    element: <GlobalLayout />,
    children: [
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
      {
        path: "profile",
        element: <div>Profile Page</div>,
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
      {
        path: "app",
        element: <CoreAppLayout />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "history",
            element: <HistoryPage />,
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
