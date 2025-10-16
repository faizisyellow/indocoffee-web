import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { router } from "./routes";
import { theme } from "./theme";
import { RouterProvider } from "react-router/dom";
import { AlertProvider } from "./components/AlertProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AlertProvider>
          <RouterProvider router={router} />
        </AlertProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
