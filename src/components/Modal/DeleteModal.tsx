
import React from "react";
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
      ? `Are you sure you want to permanently delete ${itemsToDelete} item${
          itemsToDelete > 1 ? "s" : ""
        }?`
      : "Are you sure you want to delete?");

  return (
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
      // headerText="Delete"
    >
      <ContentModal title="Delete" message={finalMessage} />
    </BaseModal>
  );
};

export default DeleteModal;

