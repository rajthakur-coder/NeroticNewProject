import React, { useState, useEffect } from "react";
import BaseModal from "../BaseModals/BaseModal";
import AuthKeyMpinForm from "../ContentModal/AuthKeyMpinForm";
import AuthKeyFormInputModal from "./AuthKeyFormInputModal";

interface AuthkeyMpinModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AuthkeyMpinModal: React.FC<AuthkeyMpinModalProps> = ({
  isOpen,
  toggle,
}) => {
  const [showAuthKeyModal, setShowAuthKeyModal] = useState(false);
  const [mpin, setMpin] = useState(Array(4).fill(""));
  const [mpinError, setMpinError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setMpin(Array(4).fill(""));
      setMpinError("");
      setTimeout(() => {
        const firstInput = document.getElementById("mpin-0");
        (firstInput as HTMLInputElement | null)?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleVerify = () => {
    if (mpin.some((d) => d === "")) {
      setMpinError("Please enter complete 4-digit mPIN");
      return;
    }
    setMpinError("");

    // close mPIN modal and open AuthKey modal after short delay
    toggle();
    setTimeout(() => setShowAuthKeyModal(true), 200);
  };

  const handleSaveAuthKeys = (data?: any) => {
    console.log("✅ Saved AuthKeys:", data, "🔐 mPIN:", mpin.join(""));
    setShowAuthKeyModal(false);
  };

  return (
    <>
      {/* 🔹 mPIN Modal */}
              <BaseModal
                isOpen={isOpen}
                toggle={toggle}
                headerText="Enter mPIN"
                onConfirm={handleVerify}
                onCancel={toggle}
                confirmText="Verify"
                cancelText="Cancel"
                widthClass="w-[400px]"
              >
                <AuthKeyMpinForm
                  mpin={mpin}
                  setMpin={setMpin}
                  error={mpinError}
                />
              </BaseModal>

      {/* 🔹 Auth Key Modal (separate) */}
      <AuthKeyFormInputModal
        isOpen={showAuthKeyModal}
        toggle={() => setShowAuthKeyModal(false)}
        mPin={mpin.join("")}
      />
    </>
  );
};

export default AuthkeyMpinModal;