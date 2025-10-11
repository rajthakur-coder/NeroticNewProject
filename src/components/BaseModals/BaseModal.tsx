import React, { ReactNode } from "react";
import clsx from "clsx";

interface BaseModalProps {
  isOpen: boolean;
  toggle: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  widthClass?: string; // ex: w-96, w-full, md:w-1/2
  headerBgColor?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  toggle,
  header,
  footer,
  children,
  widthClass = "w-112",
  // Default prop uses semantic surface-card (main modal background)
  headerBgColor = "bg-surface-card", 
}) => {
  if (!isOpen) return null;

  return (
    <div
      // Backdrop: Kept as bg-black/50 dark:bg-black/70 which is standard for universal backdrops.
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70"
      onClick={toggle}
    >
      <div
        className={clsx(
          // 1. FIXED: Modal Body BG and Text Color
          // Ensures the modal's main background and text are semantic.
          "rounded-2xl shadow-xl bg-surface-card text-text-main overflow-hidden transition-all duration-200",
          widthClass
        )}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {header && (
          <div
            className={clsx(
              // 2. FIXED: Header Border Color
              "p-4 font-semibold text-lg border-b border-border-primary",
              headerBgColor // Uses the default semantic headerBgColor prop or an override
            )}
          >
            {header}
          </div>
        )}

        {/* Body */}
        <div className="p-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div 
         className="p-4 border-t border-border-primary"
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseModal;