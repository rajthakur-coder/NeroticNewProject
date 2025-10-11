import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import BaseModal from "../BaseModals/BaseModal";
import ContentModal from "../ContentModal/DeleteContentModal";

interface DeleteModalProps {
  isOpen: boolean;
  toggle: () => void;
  id?: string | number;
  confirmColor?: string;
  cancelColor?: string;
  itemsToDelete?: number;
  message?: string;
}

// Animation Variants
const modalVariants = {
  hidden: { scale: 0.9, opacity: 0, y: -50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 250 },
  },
  exit: { scale: 0.8, opacity: 0, y: 50, transition: { duration: 0.15 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  toggle,
  id,
  confirmColor,
  cancelColor,
  itemsToDelete,
  message,
}) => {
  const handleConfirm = () => {
    toggle();
  };

  const handleCancel = () => {
    toggle();
  };

  const finalMessage =
    message ??
    (itemsToDelete && itemsToDelete > 0
      ? `Are you sure you want to permanently delete ${itemsToDelete} item${itemsToDelete > 1 ? "s" : ""}?`
      : "Are you sure you want to delete?");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={toggle}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="w-[450px] "
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <BaseModal
              isOpen={isOpen}
              toggle={toggle}
              showCloseIcon={false}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              confirmText="Delete"
              cancelText="Cancel"
              confirmColor={confirmColor}
              cancelColor={cancelColor}
              widthClass="w-[450px]"

            >
              <ContentModal title="Delete" message={finalMessage} />
            </BaseModal>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

  );
};

export default DeleteModal;
