import { darken } from "@mui/material/styles";
import { lighten } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0b341b",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    success: {
      main: "#2e7d32",
      dark: "#1b5e20",
    },
    warning: {
      main: "#fbc02d",
      dark: "#f9a825",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Geist Mono", monospace',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: "contained", // ✅ keep MUI default behavior
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 0,
          boxShadow: "none",
          transition: "all 0.2s ease-in-out",
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            backgroundColor: "#0b341b",
            color: "#fff",
            border: "2px solid #0b341b",
            "&:hover": {
              backgroundColor: lighten("#0b341b", 0.1),
              borderColor: "#0b341b",
            },
            "&:disabled": {
              backgroundColor: "#ccc",
              color: "#666",
              borderColor: "#ccc",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            backgroundColor: "#fff",
            border: "2px solid #0b341b",
            color: "#0b341b",
            "&:hover": {
              backgroundColor: darken("#0b341b", 0.05),
              color: "#fff",
              borderColor: "#0b341b",
            },
            "&:disabled": {
              backgroundColor: "#f0f0f0",
              color: "#999",
              borderColor: "#ccc",
            },
          },
        },
      ],
    },
  },
});
