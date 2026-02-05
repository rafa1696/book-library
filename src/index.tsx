import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { createRoot } from "react-dom/client";

import "./styles/import-all.css";
import { StrictMode } from "react";

const queryClient = new QueryClient();

const container = document.getElementById("app");
container?.classList.add("app-root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
