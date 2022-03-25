import { createTheme, adaptV4Theme } from "@mui/material/styles";

export const lightTheme = createTheme(
  adaptV4Theme({
    palette: {
      mode: "light"
    },
    typography: {
      useNextVariants: true
    }
  })
);
