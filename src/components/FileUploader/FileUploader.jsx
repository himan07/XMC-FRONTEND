import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const FileInput = styled("input")({
  display: "none",
});

const FileUploader = ({ label, onFileUpload, fileType = ".pdf,image/png,image/jpeg,image/jpg" }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
      if (onFileUpload) {
        onFileUpload(selectedFile);
      }
    }
  };

  return (
    <Box
      sx={{
        border: "1px dashed #ccc",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      <Typography sx={{ color: "#777" }}>{label}</Typography>
      <label htmlFor={`file-upload-${label}`}>
        <FileInput
          accept={fileType}
          id={`file-upload-${label}`}
          type="file"
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          component="span"
          sx={{
            marginTop: "10px",
            backgroundColor: "#f5f5f5",
            color: "#333",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
        >
          Browse files
        </Button>
      </label>
      {file && (
        <Typography sx={{ marginTop: 2, color: "#555" }}>
          Selected File: {file.name}
        </Typography>
      )}
    </Box>
  );
};

export default FileUploader;
