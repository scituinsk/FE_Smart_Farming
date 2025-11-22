import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppRouter } from "@/router.tsx";
import { TanstackQueryProvider } from "@/providers/tanstack-query-provider.tsx";
import { Bounce, ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </TanstackQueryProvider>
  </StrictMode>
);
