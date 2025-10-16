import React from "react";
import clsx from "clsx";
import { Check } from "lucide-react";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  size?: "xs" | "sm" | "md" | "lg";
  shape?: "square" | "rounded" | "circle";
  checkedColor?: string;
  uncheckedColor?: string;
  borderColor?: string;
  borderWidth?: string;
  iconColor?: string;
  animationSpeed?: number;
  showLabel?: boolean;
  label?: string;
  labelPosition?: "left" | "right";
  // Custom icon for checked state (can be used for minus icon)
  checkedIcon?: React.ReactNode; 
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  size = "md",
  shape = "rounded",
  checkedColor = "bg-primary",
  uncheckedColor = "bg-surface-card",
  borderColor = "border-border-input",
  borderWidth = "border-2",
  iconColor = "text-white",
  animationSpeed = 300,
  showLabel = false,
  label = "",
  labelPosition = "right",
  checkedIcon, // Use the custom icon prop
}) => {
  const sizes = {
    xs: "w-4 h-4 text-[10px]",
    sm: "w-5 h-5 text-[12px]",
    md: "w-7 h-7 text-[14px]",
    lg: "w-10 h-10 text-[18px]",
  };

  const shapes = {
    square: "rounded-none",
    rounded: "rounded",
    roundedmd: "rounded-md",
    circle: "rounded-full",
  };

  // 💡 लॉजिक: अगर `checkedIcon` पास किया गया है, तो उसे रेंडर करें।
  // नहीं तो, डिफ़ॉल्ट `Check` आइकॉन को रेंडर करें।
  const renderIcon = () => {
    // 1. If a custom icon (like the minus icon) is passed, render it.
    if (checkedIcon) {
      return checkedIcon;
    }
    
    // 2. Otherwise, render the default checkmark icon.
    return <Check className={clsx("w-3 h-3", iconColor)} strokeWidth={3} />;
  };

  return (
    <label
      className={clsx(
        "flex items-center cursor-pointer select-none",
        labelPosition === "left" ? "space-x-reverse space-x-2" : "space-x-2"
      )}
    >
      {labelPosition === "left" && showLabel && (
        <span className="text-sm text-text-main">{label}</span>
      )}

      {/* Checkbox box */}
      <div
        onClick={onChange}
        className={clsx(
          "flex items-center justify-center transition-all duration-300",
          sizes[size],
          // NOTE: 'roundedmd' is not a standard shape key in your object. Using 'rounded' instead.
          shape === 'roundedmd' ? shapes.rounded : shapes[shape], 
          checked ? checkedColor : uncheckedColor,
          !checked && `${borderWidth} ${borderColor}`,
          "shadow-sm"
        )}
        style={{
          transitionDuration: `${animationSpeed}ms`,
        }}
      >
        {checked && renderIcon()}
      </div>

      {labelPosition === "right" && showLabel && (
        <span className="text-sm text-text-main">{label}</span>
      )}
    </label>
  );
};

export default Checkbox;