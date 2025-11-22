import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./features/auth/contexts/auth-context";
import { NotFoundPage } from "./features/error/pages/not-found-page";
import { ServerErrorPage } from "./features/error/pages/server-error-page";
import { ProtectedRoute } from "./features/auth/guards/protected-route";
import { RedirectIfLoggedIn } from "./features/auth/guards/redirect-if-loggedin";
import { sessionQueryOptions } from "./features/auth/queries/use-session";
import { queryClient } from "./lib/query-client";
import { FullPageSpinner } from "./components/ui/full-page-spinner";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

// Code splitting - lazy load pages
const AppPage = lazy(() => import("./features/app/pages/app-page"));
const LoginPage = lazy(() => import("./features/login/pages/login-page").then((m) => ({ default: m.LoginPage })));

const router = createBrowserRouter([
  {
    Component: () => (
      <AuthProvider>
        <NuqsAdapter>
          <Outlet />
        </NuqsAdapter>
      </AuthProvider>
    ),
    errorElement: <ServerErrorPage />,
    // Loader di route level untuk fetch session
    loader: async () => {
      // Ensure data di-fetch sebelum render
      await queryClient.ensureQueryData(sessionQueryOptions);
      return null;
    },
    // HydrateFallback untuk loading state
    HydrateFallback: FullPageSpinner,
    children: [
      {
        path: "/",
        Component: () => <ProtectedRoute />,
        children: [
          {
            index: true,
            Component: () => (
              <Suspense fallback={<FullPageSpinner />}>
                <AppPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/login",
        Component: RedirectIfLoggedIn,
        children: [
          {
            index: true,
            Component: () => (
              <Suspense fallback={<FullPageSpinner />}>
                <LoginPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
