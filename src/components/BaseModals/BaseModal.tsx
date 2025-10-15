import React, {useEffect, type ReactNode } from "react";
import clsx from "clsx";
import { X } from "lucide-react";

interface BaseModalProps {
  isOpen: boolean;
  toggle: () => void;
  children: ReactNode;

  // Header
  headerText?: string; // <-- new prop

  // Buttons
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;

  // Button color customization
  confirmColor?: string;
  cancelColor?: string;

  widthClass?: string;

  // Optional close (X) icon
  showCloseIcon?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  toggle,
  children,
  headerText,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-black hover:bg-gray-900 text-white",
  cancelColor = "bg-gray-200 hover:bg-gray-300 text-black",
  widthClass = "w-96",
  showCloseIcon = true,
}) => {
  // ✅ Handle Enter key globally within modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && onConfirm) {
        e.preventDefault();
        onConfirm();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onConfirm]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={toggle}
    >
      <div
        className={clsx(
          "rounded-2xl shadow-xl bg-surface-card text-text-main overflow-hidden transition-all duration-200",
          widthClass
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with optional text and close icon */}
        {(headerText || showCloseIcon) && (
          <div className="flex items-center justify-between p-3 ">
            {headerText && (
              <h3 className="text-sm font-semibold text-text-main">
                {headerText}
              </h3>
            )}

            {showCloseIcon && (
              <button
                onClick={toggle}
                className="p-1 transition rounded-full hover:bg-surface-hover"
              >
                <X className="w-5 h-5 text-text-subtle hover:text-text-main" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-4">{children}</div>

        {/* Footer Buttons */}
        {(onCancel || onConfirm) && (
          <div className="flex justify-end gap-3 p-4 border-border-primary">
            {onCancel && (
              <button
                onClick={onCancel}
                className={clsx(
                  "px-3.5 py-2.5 text-xs font-semibold rounded-lg transition-colors duration-200 border-2 hover:border-gray-900 dark:hover:border-white",
                  cancelColor
                )}
              >
                {cancelText}
              </button>
            )}

            {onConfirm && (
              <button
                onClick={onConfirm}
                className={clsx(
                  "px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors duration-200",
                  confirmColor
                )}
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseModal;