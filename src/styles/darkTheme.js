import { createTheme, adaptV4Theme } from "@mui/material/styles";

export const darkTheme = createTheme(
  adaptV4Theme({
    palette: {
      mode: "dark"
    },
    typography: {
      useNextVariants: true
    }
  })
);
