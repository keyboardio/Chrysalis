import Typography from "@mui/material/Typography";
import React from "react";

export const SectionTitle = (props) => {
  return (
    <Typography color="textSecondary" align="center" sx={{ mb: 2 }} gutterBottom>
      {props.children}
    </Typography>
  );
};
