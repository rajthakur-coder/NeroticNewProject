// import type { ReactNode } from "react";

// interface IconButtonProps {
//   onClick?: () => void;
//   children: ReactNode;
//   ripple?: boolean;
//   className?: string;
// }

// const IconButton = ({ onClick, children, ripple = true, className = "" }: IconButtonProps) => (
//   <button
//     onClick={onClick}
//     data-ripple={ripple}
//     className={`p-2  text-gray-600 transition transform rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 active:scale-95 ${className}`}
//   >
//     {children}
//   </button>
// );

// export default IconButton;










import type { ReactNode } from "react";
import clsx from "clsx";

interface IconButtonProps {
  onClick?: () => void;
  children: ReactNode;
  ripple?: boolean;
  className?: string;
}

const IconButton = ({ onClick, children, ripple = true, className }: IconButtonProps) => (
  <button
    onClick={onClick}
    data-ripple={ripple}
    className={clsx(
      // Base styles (Padding, shape, transitions)
      "p-2 rounded-full transition transform",
      "hover:scale-110 active:scale-95",

      // Semantic Colors
      "text-text-subtle", // Default icon color for less importance
      "hover:bg-surface-hover", // Semantic hover background

      // Custom classes passed by prop
      className 
    )}
  >
    {children}
  </button>
);

export default IconButton;