import React, { useState, useEffect, useRef } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import Icon from "../ui/Icon";

interface CustomInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  type?: "email" | "password" | "text" | "number" | "textarea";
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  leftIcon?: string;
  themeMode?: "light" | "dark";
  error?: string;
  touched?: boolean;
}

export default function CustomInput({
  label = "",
  placeholder = "",
  value,
  type = "text",
  onChange,
  onBlur,
  leftIcon,
  themeMode = "light",
  error,
  touched,
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputName = useRef(Math.random().toString(36).substring(2));

  useEffect(() => setMounted(true), []);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => onChange(e);


  const handleFocus = () => setIsFocused(true);
const handleBlur = (
  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  setIsFocused(false);
  if (inputRef.current && inputRef.current.value === "") {
    setIsAutoFilled(false);
  }
  if (onBlur) onBlur(e); // ✅ trigger parent blur
};


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number" && ["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current && inputRef.current.matches(":-webkit-autofill")) {
        setIsAutoFilled(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const shouldShrink =
    (value && value.trim() !== "") || isFocused || isAutoFilled;
  const isPassword = type === "password";
  if (!mounted) return null;

  const isDark = themeMode === "dark";
  const backgroundColor = isDark ? "#111827" : "#FFFFFF";
  const textColor = isDark ? "#E5E7EB" : "#111827";
  const labelColor = isDark ? "#9CA3AF" : "#6B7280";
  const borderColor =
    touched && error ? "#DC2626" : isDark ? "#374151" : "#D1D5DB";
  const focusBorderColor =
    touched && error ? "#DC2626" : isDark ? "#60A5FA" : "#1C252E";

  return (
    <div className="flex flex-col w-full">
      <TextField
        fullWidth
        inputRef={inputRef}
        variant="outlined"
        label={label}
        placeholder={!shouldShrink ? placeholder : ""}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        multiline={type === "textarea"}
        minRows={type === "textarea" ? 3 : undefined}
        autoComplete={
          type === "password"
            ? "new-password"
            : type === "email"
            ? "new-email"
            : "off"
        }
        name={inputName.current}
        InputLabelProps={{
          shrink: shouldShrink,
          sx: {
            color: isFocused
              ? focusBorderColor
              : touched && error
              ? "#DC2626"
              : labelColor,
            backgroundColor: shouldShrink ? backgroundColor : "transparent",
            px: shouldShrink ? "2px" : 0,
            transition: "all 0.2s ease",
            ...(leftIcon &&
              !shouldShrink && {
                transform: "translate(44px, 16px) scale(1)",
              }),
          },
        }}
        InputProps={{
          sx: {
            color: textColor,
            backgroundColor,
            borderRadius: "0.75rem",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isFocused ? focusBorderColor : "#9e9e9e",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: focusBorderColor,
              borderWidth: "2px",
            },
          },
          startAdornment: leftIcon ? (
            <InputAdornment position="start">
              <Icon
                name={leftIcon}
                className={`text-[18px] ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </InputAdornment>
          ) : undefined,
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                <Icon
                  name={showPassword ? "ri-eye-fill" : "ri-eye-off-line"}
                  className={isDark ? "text-gray-400" : "text-gray-500"}
                />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor,
            },
            "&:hover fieldset": {
              borderColor: focusBorderColor,
            },
            "&.Mui-focused fieldset": {
              borderColor: focusBorderColor,
              borderWidth: "2px",
            },
          },
        }}
      />

      {/* ✅ Show validation error below input */}
      {touched && error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}