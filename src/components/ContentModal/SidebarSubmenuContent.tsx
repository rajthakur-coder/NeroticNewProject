// import type { ReactNode } from "react";
// import { clsx } from "clsx";
// import Icon from "../../components/ui/Icon";

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
//         "rounded-xl p-1.5 flex flex-col gap-1 transition-colors duration-200"
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

// const ContentModalItem = ({ icon, label, onClick, danger }: ContentModalItemProps) => {
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

// const EditIcon = () => <Icon name="ri-pencil-fill" className="w-6 h-5 text-gray-600 dark:text-gray-300" />;
// const DeleteIcon = () => <Icon name="bx bx-trash" className="w-6 h-5 text-red-500 dark:text-red-400" />;

// export { ContentModal, ContentModalItem, EditIcon, DeleteIcon };





import type { ReactNode } from "react";
import { clsx } from "clsx";
import Icon from "../../components/ui/Icon";

interface ContentModalProps {
  children: ReactNode;
}

const ContentModal = ({ children }: ContentModalProps) => {
  return (
    <div
      className={clsx(
        // FIXED: Wrapper uses semantic surface and border
        "bg-surface-card border border-border-primary shadow-lg dark:shadow-black/30",
        "rounded-xl p-1.5 flex flex-col gap-1 transition-colors duration-200"
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

const ContentModalItem = ({ icon, label, onClick, danger }: ContentModalItemProps) => {
  // Use semantic classes for text colors
  const textColorClass = danger
    ? "text-action-danger" // Uses --color-action-danger
    : "text-text-main"; // Uses --color-text-subtle for subtle text

  return (
    <div
      className={clsx(
        "flex items-center gap-3 p-1 cursor-pointer rounded-lg transition-colors duration-200",
        
        // FIXED: Hover state uses semantic surface-hover
        "hover:bg-surface-hover",
        
        // Text colors
        textColorClass
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-[11px] font-medium">{label}</span>
    </div>
  );
};

// --- ICON COMPONENTS FIXES ---

const EditIcon = () => (
  <Icon 
    name="ri-pencil-fill" 
    // FIXED: Edit icon color uses semantic subtle text color
    className="w-6 h-5 text-text-main" 
  />
);

const DeleteIcon = () => (
  <Icon 
    name="bx bx-trash" 
    // FIXED: Delete icon color uses semantic action-danger color
    className="w-6 h-5 text-action-danger" 
  />
);

export { ContentModal, ContentModalItem, EditIcon, DeleteIcon };