
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContentModal from "../ContentModal/DeleteContentModal"; 
// import Icon from 'path/to/Icon'; // If ContentModal needs it

interface ModalProps {
  isOpen: boolean;
  toggle: () => void;
  id?: string | number;
  headerBgColor?: string;
  confirmClassName?: string;
  cancelClassName?: string;
  itemsToDelete: number;
  message?: string;
}

// --- Framer Motion Variants for Center Pop-up ---

// 1. Modal Content Variants (Center pop-up with slight scale and spring)
const modalVariants = {
  hidden: {
    scale: 0.9,     // Start slightly smaller
    opacity: 0,
    y: -50,         // Start slightly above center for the "drop" effect
  },
  visible: {
    scale: 1,       // Pop to full size
    opacity: 1,
    y: 0,           // Final position at center
    transition: {
      type: "spring",
      damping: 25,  // Controls the bounce
      stiffness: 250, // Controls the speed
      duration: 0.2,
    },
  },
  exit: {
    scale: 0.8,     // Shrink slightly on close
    opacity: 0,
    y: 50,          // Drop down slightly on exit
    transition: {
      duration: 0.15, // Quick exit
    },
  },
};

// 2. Backdrop Variants (Simple fade-in/out)
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const DeleteModal: React.FC<ModalProps> = ({
  isOpen,
  toggle,
  id,
  confirmClassName,
  cancelClassName,
  itemsToDelete,
  message,
}) => {
  const handleConfirm = () => {
    console.log("Confirmed id:", id);
    // Add your actual deletion logic here
    toggle();
  };

  const handleCancel = () => {
    toggle();
  };

  const finalMessage =
    message ??
    (itemsToDelete && itemsToDelete > 0
      ? `Are you sure you want to permanently delete ${itemsToDelete} item${itemsToDelete > 1 ? "s" : ""}? `
      : "Are you sure you want to permanently delete this item?");

  return (
    <AnimatePresence>
      {isOpen && (
        // 1. Backdrop (Change: Now centers children with 'items-center justify-center')
        <motion.div
          // Use 'items-center' and 'justify-center' to center the modal content
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={toggle}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* 2. Modal Content Container (Change: Removed bottom styling, using rounded-xl) */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            // Use 'rounded-xl' for standard central modal look, removed 'max-w-lg' for better sizing control
            className="w-full max-w-md p-6 mx-4 shadow-2xl bg-surface-body rounded-xl" // 'mx-4' for mobile padding
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ContentModal
              title="Delete "
              message={finalMessage}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              confirmClassName={confirmClassName}
              cancelClassName={cancelClassName}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;