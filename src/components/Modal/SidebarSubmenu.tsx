import BasePopup from "../BaseModals/BasePopup";
// SidebarSubmenu.tsx
import { ContentModal, ContentModalItem, EditIcon, DeleteIcon } from "../../components/ContentModal/SidebarSubmenuContent";

interface OrderActionModalProps {
  open: boolean;
  position: { top: number; left: number };
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  
}

const MyModal = ({ open, position, onClose, onEdit, onDelete }: OrderActionModalProps) => {
  return (
    <BasePopup open={open} position={position} width={140}  zIndex={100} animation="scale" onClose={onClose} // overlay click triggers this
>
      <ContentModal>
        <ContentModalItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {
            onEdit();
            onClose();
          }}
        />
        <ContentModalItem
          icon={<DeleteIcon />}
          label="Delete"
          danger
          onClick={() => {
            onDelete();
            onClose();
          }}
        />
      </ContentModal>
    </BasePopup>
  );
};

export default MyModal;