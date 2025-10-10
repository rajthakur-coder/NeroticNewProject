import { createTheme, ThemeProvider, CssBaseline, TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React, { useState, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import type { ClassNames } from "@emotion/react";

export default function CustomDatePicker({
  label = "Start Date",
  value,
  onChange,
  disableFuture = true,
}: {
  label?: string;
  value?: Dayjs;
  onChange?: (value: Dayjs | null) => void;
  disableFuture?: boolean;
}) {
  const [internalValue, setInternalValue] = useState<Dayjs | null>(value || dayjs());
  const { theme } = useTheme(); 

  const handleChange = (newValue: Dayjs | null) => {
    setInternalValue(newValue);
    onChange && onChange(newValue);
  };

 
  const appliedTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          primary: { main: "#1C252E" },
          background: {
            default: theme === "dark" ? "#1F2937" : "#F9FAFB",
            paper: theme === "dark" ? "#374151" : "#fff",
          },
          text: {
            primary: theme === "dark" ? "#F9FAFB" : "#111827",
            secondary: theme === "dark" ? "#D1D5DB" : "#6B7280",
          },
        },
typography: {
  fontSize: 12,
  fontFamily: `"Barlow", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
},

        components: {


          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: "0.75rem",
                backgroundColor: theme === "dark" ? "#374151" : "#fff",
                color: theme === "dark" ? "#F9FAFB" : "#111827",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#9e9e9e",   // hover border
                },


              },

            },
          },

          MuiPickersDay: {
            styleOverrides: {
              root: {
                fontSize: "0.8rem",
                fontWeight: 600,
                fontFamily: `"Barlow", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`, // number font
                "&:hover": {
                  backgroundColor: theme === "dark" ? "#6B7280 !important" : "#e5e7eb !important",
                  color: theme === "dark" ? "#F9FAFB !important" : "#111827 !important",
                },
                "&.Mui-selected": {
                  backgroundColor: "#3FA90C !important",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#2ea04c !important" },
                },
                "&.MuiPickersDay-today": { borderRadius: "50%" },
              },
            },
          },
          MuiPickersToolbar: {
            styleOverrides: {
              root: {
                backgroundColor: "#3FA90C",
                color: "#fff",
                minHeight: "60px",
                padding: "8px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
      fontWeight: 900, 


              },
            },
          },
          MuiDialog: { styleOverrides: { paper: { margin: 0, maxWidth: "320px", width: "100%" } } },
        },
      }),
    [theme]
  );

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <div className="flex items-center justify-center w-full">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            value={internalValue}
            onChange={handleChange}
            closeOnSelect
            disableFuture={disableFuture}
            toolbarFormat="YYYY - ddd, MMM DD"

                 onOpen={() => {
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
              }
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "outlined",
                label: label,
                placeholder: label,

                InputProps: {
                  readOnly: true, 
                  onKeyDown: (e: React.KeyboardEvent) => e.preventDefault(),

                },
              } as any,
              actionBar: { actions: [] },
              toolbar: { toolbarPlaceholder: "", toolbarTitle: "" },
            }}
          />


        </LocalizationProvider>
      </div>
    </ThemeProvider>
  );
}
