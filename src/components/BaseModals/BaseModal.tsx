import React, { type ReactNode } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BaseModalProps {
  isOpen: boolean;
  toggle: () => void;
  children: ReactNode;

  // Header
  headerText?: string;

  // Buttons
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;

  // Button colors
  confirmColor?: string;
  cancelColor?: string;

  widthClass?: string;
  showCloseIcon?: boolean;
}

// Animation variants
const modalVariants = {
  hidden: { scale: 0.9, opacity: 0, y: -50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 250 },
  },
  exit: { scale: 0.85, opacity: 0, y: 50, transition: { duration: 0.2 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

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
  cancelColor = "bg-gray-200 hover:bg-gray-100 text-black",
  widthClass = "w-96",
  showCloseIcon = true,
}) => {
  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={toggle}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              "rounded-2xl shadow-xl bg-surface-card text-text-main overflow-hidden",
              widthClass
            )}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            {(headerText || showCloseIcon) && (
              <div className="flex items-center justify-between p-6 pb-2 ">
                {headerText && (
                  <h3 className="text-lg font-semibold text-text-main">
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

            {/* Footer */}
            {(onCancel || onConfirm) && (
              <div className="flex justify-end gap-3 p-4">
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ✅ Render modal at the document root to always cover the full screen
  return ReactDOM.createPortal(modalContent, document.body);
};

export default BaseModal;
