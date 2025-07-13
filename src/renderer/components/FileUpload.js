import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";

export const FileUpload = ({children, onLoad = () => {}, onClick = () => {},
                           onError = () => {}, ...props}) => {
  const fileInputRef = React.createRef();

  const importFromFile = async (event) => {
    console.log("file event: ", event);
    const file = event.target.files[0];
    if (!file) return onError();

    const reader = new FileReader();
    reader.onload = async function (e) {
      const fileData = e.target.result;
      onLoad(fileData, file.name);
      event.target.value = null; // enable re-uploading the same file again
    };
    reader.onerror = onError;
    reader.readAsText(file);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      onClick();
      fileInputRef.current.click();
    }
  };
  React.useEffect(() => {
    const fileInput = fileInputRef.current;
    if (!fileInput) {
        return;
    }

    fileInput.addEventListener('cancel', onError);
    return () => {
        fileInput.removeEventListener('cancel', onError);
    };
  }, []);


  return (
    <React.Fragment>
      <input type="file" style={{ display: "none" }} ref={fileInputRef} onChange={importFromFile}/>
      <Button {...props} onClick={openFileDialog}>
        {children}
      </Button>
    </React.Fragment>
  );
};


