// import BasePopup from "../BaseModals/BasePopup";
// // SidebarSubmenu.tsx
// import {
//   ContentModal,
//   ContentModalItem,
//   EditIcon,
//   DeleteIcon,
// } from "../../components/ContentModal/SidebarSubmenuContent";

// interface OrderActionModalProps {
//   open: boolean;
//   position: { top: number; left: number };
//   onClose: () => void;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// const SidebarMenu = ({
//   open,
//   position,
//   onClose,
//   onEdit,
//   onDelete,
// }: OrderActionModalProps) => {
//   return (
//     <BasePopup
//       open={open}
//       position={position}
//       width={140}
//       zIndex={100}
//       animation="scale"
//       onClose={onClose} // overlay click triggers this
//     >
//       <ContentModal>
//         <ContentModalItem
//           icon={<EditIcon />}
//           label="Edit"
//           onClick={() => {
//             onEdit();
//             onClose();
//           }}
//         />
//         <ContentModalItem
//           icon={<DeleteIcon />}
//           label="Delete"
//           danger
//           onClick={() => {
//             onDelete();
//             onClose();
//           }}
//         />
//       </ContentModal>
//     </BasePopup>
//   );
// };

// export default SidebarMenu;




// src/components/SidebarMenu/DynamicSidebarMenu.tsx
import BasePopup from "../BaseModals/BasePopup";
import { ContentModal, ContentModalItem } from "../../components/ContentModal/SidebarSubmenuContent";

interface ActionItem {
  icon?: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick: () => void;
}

interface DynamicSidebarMenuProps {
  open: boolean;
  position: { top: number; left: number };
  onClose: () => void;
  actions: ActionItem[];
  width?: number | string;
  zIndex?: number;
}

const DynamicSidebarMenu = ({
  open,
  position,
  onClose,
  actions,
  width = 140,
  zIndex = 100,
}: DynamicSidebarMenuProps) => {
  return (
    <BasePopup
      open={open}
      position={position}
      width={width}
      zIndex={zIndex}
      animation="scale"
      onClose={onClose}
    >
      <ContentModal>
        {actions.map((action, index) => (
          <ContentModalItem
            key={index}
            icon={action.icon}
            label={action.label}
            danger={action.danger}
            onClick={() => {
              action.onClick();
              onClose();
            }}
          />
        ))}
      </ContentModal>
    </BasePopup>
  );
};

export default DynamicSidebarMenu;