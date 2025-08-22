import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { FormsProvider } from "./contexts/forms.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <FormsProvider>
        <App />
      </FormsProvider>
    </MantineProvider>
  </StrictMode>,
);
