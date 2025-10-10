// // ContentModal.tsx
// import type { ReactNode } from "react";
// import clsx from "clsx";

// interface ContentModalProps {
//   children: ReactNode;
// }

// const ContentModal = ({ children }: ContentModalProps) => {
//   return (
//     <div
//       className={clsx(
//         // light
//         "bg-white border border-gray-200 shadow-lg",
//         // dark
//         "dark:bg-gray-800 dark:border-gray-700 dark:shadow-black/30",
//         "rounded-xl p-1.5 flex flex-col gap-1"
//       )}
//     >
//       {children}
//     </div>
//   );
// };

// interface ContentModalItemProps {
//   icon: ReactNode;
//   label: string;
//   onClick: () => void;
//   danger?: boolean;
// }

// const ContentModalItem = ({
//   icon,
//   label,
//   onClick,
//   danger,
// }: ContentModalItemProps) => {
//   return (
//     <div
//       className={clsx(
//         "flex items-center gap-3 p-1 cursor-pointer rounded-lg transition-colors duration-200",
//         // hover states
//         "hover:bg-gray-100 dark:hover:bg-gray-700",
//         // text colors
//         danger
//           ? "text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
//           : "text-gray-700 dark:text-gray-200"
//       )}
//       onClick={onClick}
//     >
//       {icon}
//       <span className="text-[11px] font-medium">{label}</span>
//     </div>
//   );
// };

// export { ContentModal, ContentModalItem };

















import type { ReactNode } from "react";
import clsx from "clsx";

interface ContentModalProps {
  children: ReactNode;
}

const ContentModal = ({ children }: ContentModalProps) => {
  return (
    <div
      className={clsx(
        // FIXED: Background, Border, and Shadow use semantic classes (Already correct)
        "bg-surface-card border border-border-primary shadow-lg dark:shadow-black/30",
        "rounded-xl p-1.5 flex flex-col gap-1"
      )}
    >
      {children}
    </div>
  );
};

interface ContentModalItemProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}

const ContentModalItem = ({
  icon,
  label,
  onClick,
  danger,
}: ContentModalItemProps) => {
  // Danger text color is handled using semantic action-danger for the color,
  // and text-main/text-subtle for regular items.
  const textColorClass = danger
    ? "text-action-danger" // Uses --color-action-danger (FF5630)
    : "text-text-main"; // FIXED: Removed dark:text-gray-300. text-text-subtle should handle dark mode automatically.

  return (
    <div
      className={clsx(
        "flex items-center gap-3 p-1 cursor-pointer rounded-lg transition-colors duration-200",
        
        // FIXED: Hover states use semantic surface-hover (Already correct)
        "hover:bg-surface-hover",
        
        // FIXED: Text colors use semantic classes/variables
        textColorClass
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-[11px] font-medium">{label}</span>
    </div>
  );
};

export { ContentModal, ContentModalItem };