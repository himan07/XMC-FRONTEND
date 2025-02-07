import React from "react";
import { Controller } from "react-hook-form";
import { FormControlLabel, Checkbox, Typography } from "@mui/material";

const CheckboxComponent = ({
  name,
  control,
  label,
  rules,
  sx = {},
  checkboxSx = {},
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <FormControlLabel
          sx={{
            ml: 1,
            mt: 1,
            ".MuiCheckbox-root": {
              color: error ? "red" : "inherit",
            },
            ".Mui-checked": {
              color: error ? "red" : "inherit",
            },
            ...sx,
          }}
          control={
            <Checkbox
              {...field}
              checked={field.value}
              sx={{
                "&.Mui-checked": {
                  color: error ? "red" : "primary.main",
                },
                ...checkboxSx,
              }}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          }
          label={
            <Typography variant="body1" sx={{ fontSize: "15px" }}>
              {label}
            </Typography>
          }
        />
      )}
    />
  );
};

export default CheckboxComponent;
