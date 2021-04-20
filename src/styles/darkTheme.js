import { createMuiTheme } from "@material-ui/core/styles";

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    // Override built in colors
    // TODO Create a Dygma theme
    primary: {
      main: "#ffeb3b"
    },
    secondary: {
      main: "#f50057"
    },

    // Define custom items for our use
    selectItem: {
      main: "#1e1e1e",
      hover: "#424242",
      text: "#3f51b5",
      notSelected: "#303030"
    }
    // TODO The below options may be suitable when we add theming to the macro button section
    // macroKey: {
    //   alt: "#e65100",
    //   altGr: "#6200ea",
    //   ctrl: "#b71c1c",
    //   gui: "#1b5e20",
    //   main: "#455a64",
    //   shift: "#0d47a1"
    // }
  }
});
