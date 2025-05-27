import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#900639", // Wine Red
    },
    background: {
      default: "#FFFEFC",
    },
    text: {
      primary: "#1c1c1c",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    h1: {
      fontFamily: "Playfair Display, serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Playfair Display, serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "Playfair Display, serif",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          height: 48,
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          height: 48,
          "& .MuiOutlinedInput-root": {
            borderRadius: 16,
            height: 48,
          },
          "& input": {
            padding: "14px",
            fontFamily: "Montserrat, sans-serif",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          height: 48,
        },
        input: {
          padding: "14px",
          fontFamily: "Montserrat, sans-serif",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

export default theme;
