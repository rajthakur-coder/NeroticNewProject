import React, { useState, useMemo, useEffect, useRef } from "react";
import eye from "../../assets/eye-1.png";
import eyes from "../../assets/eye-2.png";

import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Icon from "../ui/Icon";

interface CustomInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  type?: "email" | "password" | "text";
  onChange: (value: string) => void;
  leftIcon?: string;
}

export default function CustomInput({
  label = "",
  placeholder = "",
  value,
  type = "text",
  onChange,
  leftIcon,
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [mounted, setMounted] = useState(false); // Prevent autofill on initial render
  const inputRef = useRef<HTMLInputElement | null>(null);
  

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    if (inputRef.current && inputRef.current.value === "") {
      setIsAutoFilled(false);
    }
  };

  // Detect browser autofill after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current && inputRef.current.matches(":-webkit-autofill")) {
        setIsAutoFilled(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const shouldShrink = (value && value.trim() !== "") || isFocused || isAutoFilled;

  const appliedTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: { main: "#1C252E" },
          background: { default: "#F9FAFB", paper: "#FFFFFF" },
          text: { primary: "#111827", secondary: "#6B7280" },
        },
        typography: {
          fontSize: 13,
          fontFamily: `"Barlow", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: "0.75rem",
                backgroundColor: "#FFFFFF",
                color: "#111827",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#9e9e9e",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1C252E",
                  borderWidth: "2px",
                },
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px white inset !important",
                  WebkitTextFillColor: "#111827 !important",
                  caretColor: "#111827 !important",
                  transition: "background-color 5000s ease-in-out 0s",
                },
              },
              input: {
                padding: "14px 14px 14px 0px",
              },
              notchedOutline: { borderColor: "#D1D5DB" },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: "#6B7280",
                fontWeight: 500,
                transition: "all 0.2s ease",
                "&.Mui-focused": {
                  color: "#1C252E",
                },
              },
            },
          },
        },
      }),
    []
  );

  const isPassword = type === "password";

  // Render input only after mount to prevent autofill
  if (!mounted) return null;

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <div className="flex items-center justify-center w-full">
        <TextField
          fullWidth
          inputRef={inputRef}
          variant="outlined"
          label={label}
          placeholder={!shouldShrink ? placeholder : ""}
          type={isPassword && !showPassword ? "password" : "text"}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete={
            type === "password"
              ? "new-password"
              : type === "email"
              ? "new-email"
              : "off"
          } // prevent autofill
          name={Math.random().toString(36).substring(2)} // unique name to block saved autofill
          InputLabelProps={{
            shrink: shouldShrink,
            sx: {
              backgroundColor: shouldShrink ? "#fff" : "transparent",
              px: shouldShrink ? "2px" : 0,
              transition: "all 0.2s ease",
              ...(leftIcon &&
                !shouldShrink && {
                  transform: "translate(44px, 16px) scale(1)",
                }),
            },
          }}
          InputProps={{
            startAdornment: leftIcon ? (
              <InputAdornment position="start">
                <Icon name={leftIcon} className="text-gray-400" />
              </InputAdornment>
            ) : undefined,
            endAdornment: isPassword ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? (
                    <Icon name="ri-eye-fill" className="text-gray-500" />

                  ) : (
                    // <Icon name="ri-eye-fill" className="text-gray-500" />
                                        <Icon name="ri-eye-off-line" className="text-gray-500" />

                  )}
                </IconButton>
              </InputAdornment>
            ) : undefined,
          }}
        />
      </div>
    </ThemeProvider>
  );
}
