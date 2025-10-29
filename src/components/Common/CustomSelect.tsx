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
          MenuProps={{
            PaperProps: { sx: { zIndex: 99999 } },
            disablePortal: true, // ensures menu appears inside modal DOM
          }}
        >
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>

          {options.map((option, index) => (
            <MenuItem
              key={`${option.value}-${index}`}
              value={String(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;