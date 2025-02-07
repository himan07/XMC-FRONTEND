import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputBase,
  FormHelperText,
} from "@mui/material";

const SelectComponent = ({
  value,
  onChange,
  options,
  label,
  register,
  errors,
  name,
  size = "small",
  placeholder = "Select",
  errorWidth = "100%",
  sx = {},
  ...props
}) => {
  return (
    <FormControl fullWidth size={size} sx={{ ...sx }} error={!!errors}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        value={value}
        onChange={onChange}
        notched="true"
        displayEmpty
        input={<InputBase />}
        {...(register && register(name))}
        sx={{
          borderRadius: "10px",
          backgroundColor: "#e9e9e9",
          height: "40px",
          fontSize: "0.875rem",
          border: "none",
          padding: "0 12px",
          "&:hover": {
            backgroundColor: "#dcdcdc",
            border: "none",
          },
          "&.Mui-focused": {
            backgroundColor: "#e9e9e9",
            boxShadow: "none",
            border: "none",
          },
          ".MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            padding: "8px 0",
          },
          ...sx,
        }}
        {...props}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.icon && option.icon} {option.label}
          </MenuItem>
        ))}
      </Select>
      {errors && (
        <FormHelperText
          sx={{
            width: errorWidth,
            textAlign: "left !important",
            ml: -0.3,
          }}
        >
          {errors.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectComponent;
