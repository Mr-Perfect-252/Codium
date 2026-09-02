/*!
 * PROPRIETARY & CONFIDENTIAL — Copyright (c) 2026 Sohan Ananthula. All Rights Reserved.
 * This UI, layout, and design system are proprietary intellectual property.
 * Unauthorized replication, screenshots for AI generation, scraping, or cloning
 * is strictly prohibited and subject to legal action and DMCA takedown notices.
 * See LICENSE.txt.
 */
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster position="bottom-right" theme="dark" />
  </>
);
