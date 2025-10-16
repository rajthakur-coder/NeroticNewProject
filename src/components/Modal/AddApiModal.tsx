import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BaseModal from "../BaseModals/BaseModal";
import AddApiModalForm from "../ContentModal/AddApiForm";

interface ApiData {
  id?: string;
  api_name: string;
}

interface AddApiModalProps {
  isOpen: boolean;
  toggle: () => void;
  apiData?: ApiData | null; // Optional for edit mode
}

const AddApiModal: React.FC<AddApiModalProps> = ({
  isOpen,
  toggle,
  apiData,
}) => {

  const [formData, setFormData] = useState<ApiData>({ api_name: "" });
  const [touched, setTouched] = useState({ api_name: false });



  // ✅ Pre-fill for edit mode, reset on close
  useEffect(() => {
    if (apiData && isOpen) {
      setFormData(apiData);
    } else if (!isOpen) {
      setFormData({ api_name: "" });
      setTouched({ api_name: false });
    }
  }, [apiData, isOpen]);

  // validation
  const errors = useMemo(
    () => ({
      api_name: formData.api_name?.trim() ? "" : "API Name is required",
    }),
    [formData]
  );

  const isValid = useMemo(
    () => Object.values(errors).every((e) => !e),
    [errors]
  );

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    if (!isValid) return;



    toggle();
    setFormData({ api_name: "" });
    setTouched({ api_name: false });

  };

  // --- Framer Motion ---
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={toggle}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="w-[500px]"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <BaseModal
              isOpen={isOpen}
              toggle={toggle}
              headerText={apiData ? "Edit API" : "Add API"}
              onConfirm={handleSubmit}
              onCancel={toggle}
              confirmText={
                apiData ? "Update" : "Submit"
              }
              confirmColor={
                isValid
                  ? "bg-black hover:bg-gray-900 text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }
              widthClass="w-[500px]"
            >
              <AddApiModalForm
                values={formData}
                errors={errors}
                onChange={setFormData}
                onBlur={handleBlur}
                touched={touched}
              />
            </BaseModal>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddApiModal;