import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { createRoot } from "react-dom/client";

const queryClient = new QueryClient();

const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
