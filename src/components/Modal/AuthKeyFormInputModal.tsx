import React, { useState } from "react";
import BaseModal from "../BaseModals/BaseModal";
import { motion, AnimatePresence } from "framer-motion";
import AuthKeyFormInputs from "../ContentModal/AuthKeyFormInputs";

export interface AuthKeyFormData {
  auth_key1?: string;
  auth_value1?: string;
  auth_key2?: string;
  auth_value2?: string;
  auth_key3?: string;
  auth_value3?: string;
  auth_key4?: string;
  auth_value4?: string;
  auth_key5?: string;
  auth_value5?: string;
  auth_key6?: string;
  auth_value6?: string;
}

interface Props {
  isOpen: boolean;
  toggle: () => void;
  mPin?: string;
}

const AuthKeyFormInputModal: React.FC<Props> = ({ isOpen, toggle, mPin }) => {
  const [formData, setFormData] = useState<AuthKeyFormData>({
    auth_key1: "",
    auth_value1: "",
    auth_key2: "",
    auth_value2: "",
    auth_key3: "",
    auth_value3: "",
    auth_key4: "",
    auth_value4: "",
    auth_key5: "",
    auth_value5: "",
    auth_key6: "",
    auth_value6: "",
  });

  const [error, setError] = useState<string>("");

  const handleSave = () => {
    // Collect payload
    const payload: Record<string, string> = {};
    for (let i = 1; i <= 6; i++) {
      payload[`auth_key${i}`] = formData[`auth_key${i}`] || "";
      payload[`auth_value${i}`] = formData[`auth_value${i}`] || "";
    }

    // Basic validation
    const hasData = Object.values(payload).some((v) => v.trim() !== "");
    if (!hasData) {
      setError("Please fill at least one key/value pair before submitting.");
      return;
    }

    setError("");
    console.log("✅ Submitted Data:", payload, "🔐 mPIN:", mPin);
    toggle(); // Close modal
  };

  // --- Framer Motion Variants ---
  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0, y: -50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 250,
        duration: 0.2,
      },
    },
    exit: { scale: 0.8, opacity: 0, y: 50, transition: { duration: 0.15 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

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
            className="w-[600px] "
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <BaseModal
              isOpen={isOpen}
              toggle={toggle}
              headerText="Update Authentication Keys"
              onConfirm={handleSave}
              onCancel={toggle}
              confirmText="Submit"
              cancelText="Cancel"
              widthClass="w-[600px]"
            >
              <div className="p-4">
                <AuthKeyFormInputs
                  formData={formData}
                  setFormData={setFormData}
                  error={error}
                />
              </div>
            </BaseModal>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthKeyFormInputModal;
