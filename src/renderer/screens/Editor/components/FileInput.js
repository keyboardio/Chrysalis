import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";

export const FileInput = (props) => {
  const fileInputRef = React.createRef();

  const importFromFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function (e) {
      const fileData = e.target.result;
      props.onLoad(fileData, file.name);
    };
    reader.readAsText(file);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <input type="file" style={{ display: "none" }} ref={fileInputRef} onChange={importFromFile} />
      <Button variant="outlined" onClick={openFileDialog}>
        {...props.children}
      </Button>
    </Box>
  );
};

