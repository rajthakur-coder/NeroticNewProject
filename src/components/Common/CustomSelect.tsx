import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  label: string;
  value?: string | number;
  options: Option[];
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value = "",
  options,
  onChange,
  placeholder = "Select",
  disabled = false,
  fullWidth = true,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth={fullWidth}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={handleChange}
          disabled={disabled}
        >
          {/* Placeholder option */}
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>

          {/* Render all options */}
          {options.map((option) => (
            <MenuItem key={option.value} value={String(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;