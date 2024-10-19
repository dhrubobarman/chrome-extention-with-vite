import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import Layout from "@/Layout.tsx";
import { StorageProvider } from "@/providers/storageProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StorageProvider>
      <Layout>
        <App />
      </Layout>
    </StorageProvider>
  </StrictMode>
);
