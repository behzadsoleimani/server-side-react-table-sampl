import { createTheme } from "@material-ui/core/styles";

export default createTheme({
  direction: "rtl",
  palette: {
    type: "light",
    primary: {
      light: "#2196f3",
      main: "#1565c0",
      dark: "#001970",
      contrastText: "#FFF"
    },
    secondary: {
      light: "#ef0078",
      main: "#c7006e",
      dark: "#880061",
      contrastText: "#FFF"
    },
    success: {
      light: "#75e900",
      main: "#41c300",
      dark: "#008b00",
      contrastText: "#FFF"
    },
    warning: {
      light: "#ff8d00",
      main: "#f47100",
      dark: "#e54304",
      contrastText: "#FFF"
    }
  },
  typography: {
    fontFamily: ["iranyekan"].join(",")
  }
});
