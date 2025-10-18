import React, { useState } from "react";
import BaseModal from "../BaseModals/BaseModal";
import LogoutContentModal from "../ContentModal/LogoutContentModal";

interface LogoutModalProps {
  isOpen: boolean;
  toggle: () => void;
  onLogout: (allDevices: boolean) => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, toggle, onLogout }) => {
  const [allDevices, setAllDevices] = useState(false);

  const handleConfirm = () => {
    onLogout(allDevices); // Trigger logout with selected option
    toggle(); // Close modal
  };

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      headerText="Logout Devices"
      onConfirm={handleConfirm}
      onCancel={toggle}
      confirmText="Logout"
      cancelText="Cancel"
      confirmColor="bg-red-600 text-white"
      // cancelColor="bg-orange-500 text-white"
      widthClass="w-[450px]"

    >
      <LogoutContentModal
        title="Logout from"
        // message="Select whether you want to logout from the current device only or all devices."
        allDevices={allDevices}
        setAllDevices={setAllDevices}
      />
    </BaseModal>
  );
};

export default LogoutModal;

