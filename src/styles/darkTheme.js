import { createTheme } from "@material-ui/core/styles";

export const darkTheme = createTheme({
  palette: {
    type: "dark"
  },
  typography: {
    useNextVariants: true
  }
});
