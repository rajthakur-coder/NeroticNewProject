import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddCategoryForm from "../../components/ContentModal/CategoryFormModal";
import { X } from "lucide-react"; // for close icon (optional, from lucide-react)

interface AddCategoryModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const UpdateCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  toggle,
}) => {
  const [formData, setFormData] = useState({ name: "", status: "Active" });
  const [touched, setTouched] = useState({ name: false, status: false });

  const errors = useMemo(() => {
    return {
      name: formData.name ? "" : "Name is required",
    };
  }, [formData]);

  const isValid = useMemo(
    () => Object.values(errors).every((e) => !e),
    [errors]
  );

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = () => {
    if (!isValid) return;
    console.log("Submitted Data:", formData);
    toggle();
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
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md mx-4 rounded-xl shadow-2xl bg-white dark:bg-gray-900 p-6"
          >
            {/* Close button (top-right) */}
            <button
              onClick={toggle}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              data-no-ripple
            >
              <X size={24} />
            </button>

            {/* Header */}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Update Product Category
            </h2>

            {/* Form */}
            <AddCategoryForm
              values={formData}
              errors={errors}
              onChange={setFormData}
              onBlur={handleBlur}
              touched={touched}
            />

            {/* Buttons */}
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={toggle}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className={`px-4 py-2 rounded-md text-white transition ${
                  isValid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-400 cursor-not-allowed"
                }`}
              >
                Update
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateCategoryModal;
