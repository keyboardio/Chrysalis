import React from "react";
import Portal from "@mui/material/Portal";

export function PageTitle({ title }) {
  return (
    <Portal container={document.querySelector("#page-title")}>{title}</Portal>
  );
}
