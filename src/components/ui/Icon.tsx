import React from "react";
import IconMdi from "@mdi/react";
import { iconMap } from "../../assets/icons/iconMap";
import type { IconType } from "react-icons";

type IconProps = {
  name: string;          
  size?: number;          
  color?: string;
  className?: string;
  ariaLabel?: string;
};

const Icon: React.FC<IconProps> = ({ name, size = 20, color, className, ariaLabel }) => {
  const entry = iconMap[name];

  if (!entry) {
    // fallback
    return <span className={className} aria-hidden>{/* fallback small square */}▢</span>;
  }

  if (typeof entry === "string") {
    return (
      <IconMdi
        path={entry}
        size={size / 24}
        color={color}
        className={className}
        aria-label={ariaLabel}
      />
    );
  }

  // react-icons component
  const Comp = entry as IconType;
  return <Comp size={size} color={color} className={className} aria-label={ariaLabel} />;
};

export default Icon;
