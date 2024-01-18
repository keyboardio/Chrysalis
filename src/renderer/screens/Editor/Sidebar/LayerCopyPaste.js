import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
export const LayerCopyPaste = (props) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Button onClick={() => props.copyLayer(props.layer)}>{t("editor.overview.copyLayer")}</Button>
      <Button onClick={() => props.pasteLayer()} disabled={!props.hasCopiedLayer()}>
        {t("editor.overview.pasteLayer")}
      </Button>
    </Box>
  );
};
