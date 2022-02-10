import { createTheme } from "@mui/material/";
// import { purple } from "@mui/material/colors";
const boxShadow = "#40559b73 0px 8px 16px 0px";
const CustomTheme = createTheme({
  palette: {
    primary: {
      main: "#1877f2",
    },
  },
  typography: {
    fontFamily: '"Typold", serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          paddingBottom: "8px",
          paddingTop: "8px",
        },
        contained: {
          boxShadow,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        // subheader: {
        //   color: "snow",
        // },
      },
    },
  },
});

export default CustomTheme;
