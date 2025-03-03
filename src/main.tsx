import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#6db478",
          light: "#a7d1ae",
          dark: "#56a761",
          contrastText: "#000",
        },
        background: {
          paper: "#fcf5e4",
          default: "#e4dcc8",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#6db478",
          light: "#a7d1ae",
          dark: "#56a761",
        },
        background: {
          paper: "#262626",
          default: "#3a342e",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme} defaultMode="dark">
      <CssBaseline enableColorScheme />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
