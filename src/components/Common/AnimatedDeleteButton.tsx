import { useState } from "react";
import Icon from "../ui/Icon";
import clsx from "clsx"; 

interface AnimatedDeleteButtonProps {
  onClick?: () => void;
  label?: string;
}

const AnimatedDeleteButton: React.FC<AnimatedDeleteButtonProps> = ({
  onClick,
  label = "Clear",
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = () => {
    if (isDeleting) return;
    setIsDeleting(true);
    onClick?.();
    setTimeout(() => setIsDeleting(false), 2200); 
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "flex items-center gap-1 text-sm font-semibold",
        "text-action-danger", 
        "hover:bg-action-danger-hover-bg",
        "rounded-md p-1.5 relative overflow-hidden",
        "active:scale-95 transition-all duration-300"
      )}
    >
      {/* Icon with simple transform animation */}
      <Icon
        name="bx bx-trash"
        className={clsx(
          "w-5 h-5 transform transition-transform duration-300",
          isDeleting ? "scale-125 rotate-[20deg] text-white" : ""
        )}
      />
      <span
        className={`transition-all duration-[2200ms] ${
          isDeleting ? "opacity-0 translate-y-12 rotate-[80deg] scale-50" : ""
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default AnimatedDeleteButton;