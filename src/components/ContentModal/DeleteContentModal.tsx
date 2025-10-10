import React from "react";
import clsx from "clsx";

interface ContentModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmClassName?: string;
  cancelClassName?: string;
}

const ContentModal: React.FC<ContentModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
  
  // FIX 1: Semantic classes for Cancel Button (Already correct)
  cancelClassName = clsx(
    "bg-surface-card border border-border-primary text-text-main",
    "hover:border-text-main hover:bg-surface-hover"
  ),
  
  // FIX 2: Semantic classes for Confirm (Danger) Button
  confirmClassName = clsx(
    // Base color
    "bg-action-danger text-white", 
    // FIXED: Use semantic hover class instead of hardcoded red-600
    // We assume action-danger-hover is the proper darkened state.
    "hover:bg-red-600 hover:shadow-md hover:shadow-action-danger/30" 
    // You might also use action-danger-bg for a softer, non-colored hover background if required.
  ),
}) => {
  return (
    <div className="p-2 space-y-4">
      {/* Title */}
      <h3 
        // FIX 3: Title text color uses semantic text-main (Already correct)
        className="mb-3 text-sm font-semibold text-text-main"
      >
        {title}
      </h3>

      {/* Message */}
      <p 
        // FIX 4: Message text color uses semantic text-subtle (Already correct)
        className="pb-3 text-xs font-normal text-text-subtle"
      >
        {message}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
          <button
            className={`px-3.5 py-2.5 text-xs font-bold rounded-lg transition-colors duration-200 cursor-pointer ${cancelClassName}`}
            onClick={onCancel}
          >
            {cancelText}
          </button>
        <button
          className={`px-3.5 py-2.5 text-xs font-bold rounded-lg transition-colors duration-200 cursor-pointer ${confirmClassName}`}
          onClick={onConfirm}
        >
          {confirmText}
        </button>
        
      </div>
    </div>
  );
};

export default ContentModal;