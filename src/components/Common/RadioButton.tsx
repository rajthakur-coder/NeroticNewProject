import React from "react";
import clsx from "clsx";

interface RadioButtonProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  size?: "sm" | "md" | "lg";
  activeColor?: string; 
  inactiveColor?: string; 
  borderColor?: string;
  animationSpeed?: number;
  labelPosition?: "left" | "right";
  labelColor?: string;
  hoverGlow?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  checked,
  onChange,
  label,
  size = "md",
  activeColor = "bg-primary",
  inactiveColor = "bg-transparent",
  borderColor = "border-border-input",
  animationSpeed = 250,
  labelPosition = "right",
  labelColor = "text-text-main",
  hoverGlow = true,
}) => {
  const sizes = {
    sm: { outer: "w-4 h-4", inner: "w-2 h-2" },
    md: { outer: "w-6 h-6", inner: "w-3 h-3" },
    lg: { outer: "w-8 h-8", inner: "w-4 h-4" },
  };

  const labelElement = label && (
    <span
      className={clsx(
        "select-none font-medium transition-colors duration-200",
        labelColor,
        checked ? "opacity-100" : "opacity-50"
      )}
    >
      {label}
    </span>
  );

  return (
    <label
      className={clsx(
        "flex items-center cursor-pointer gap-2",
        labelPosition === "left" && "flex-row-reverse"
      )}
    >
      {labelPosition === "left" && labelElement}

      <span
        onClick={onChange}
        className={clsx(
          "relative flex items-center justify-center rounded-full border transition-all ease-in-out",
          sizes[size].outer,
          checked ? activeColor : inactiveColor,
          borderColor,
          hoverGlow && "hover:shadow-[0_0_8px_rgba(255,255,255,0.7)]"
        )}
        style={{
          borderWidth: "2px",
          transitionDuration: `${animationSpeed}ms`,
        }}
      >
        {/* White inner circle */}
        <span
          className={clsx(
            "rounded-full bg-white absolute",
            sizes[size].inner
          )}
          style={{
            top: "50%",
            left: "50%",
            transform: checked
              ? "translate(-50%, -50%) scale(1)"
              : "translate(-50%, -50%) scale(0)",
            transition: `transform ${animationSpeed}ms ease-in-out`,
          }}
        />
      </span>

      {labelPosition === "right" && labelElement}
    </label>
  );
};

export default RadioButton;
