import { createMuiTheme } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    // Override built in colors
    // (None yet applied for lightTheme, the below are the defaults)
    // primary: {
    //   main: "#9c27b0"
    // },
    // secondary: {
    //   main: "#651fff"
    // },

    // Define custom items for our use
    selectItem: {
      main: "#f9f9f9",
      hover: "#e0e0e0",
      text: "#3f51b5",
      notSelected: "#eee"
    }
    // TODO The below are the values currently in use and may be suitable when we add theming to the macro button section
    // macroKey: {
    //   alt: "#e1f3f7",
    //   altGr: "#e1f3f7",
    //   ctrl: "#f5e4e4",
    //   gui: "#e6f0e4",
    //   main: "#dedede",
    //   shift: "#e1f3f7"
    // }
  }
});
