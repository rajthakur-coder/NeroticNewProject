import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddCategoryForm from "../ContentModal/CategoryFormModal";
import { X } from "lucide-react"; // for close icon (optional, from lucide-react)

interface AddCategoryModalProps {
  isOpen: boolean;
  toggle: () => void;
  categoryData?: { name: string; status: string } | null; // ✅ for edit mode
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  toggle,
  categoryData,
}) => {
  const [formData, setFormData] = useState({ name: "", status: "Active" });
  const [touched, setTouched] = useState({ name: false, status: false });

  // ✅ Check if we're editing existing category
  const isEditMode = Boolean(categoryData);

  // ✅ Prefill data if editing, or reset if adding new
  useEffect(() => {
    if (isOpen) {
      if (categoryData) {
        setFormData({
          name: categoryData.name || "",
          status: categoryData.status || "Active",
        });
      } else {
        // Reset form for Add mode
        setFormData({ name: "", status: "Active" });
        setTouched({ name: false, status: false });
      }
    }
  }, [categoryData, isOpen]);

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

    if (isEditMode) {
      console.log("✅ Updated Category:", formData);
    } else {
      console.log("✅ Added New Category:", formData);
    }

    // ✅ reset form after submission
    setFormData({ name: "", status: "Active" });
    setTouched({ name: false, status: false });

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

  // ✅ Reset form on modal close
  const handleClose = () => {
    toggle();
    setFormData({ name: "", status: "Active" });
    setTouched({ name: false, status: false });
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
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              data-no-ripple
            >
              <X size={24} />
            </button>

            {/* Dynamic header */}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {isEditMode ? "Update Product Category" : "Add Product Category"}
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
              {/* Cancel Button */}
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-md bg-white text-black border border-gray-300 hover:border-black focus:outline-none focus:ring-2 focus:ring-black transition"
              >
                Cancel
              </button>

              {/* Submit / Update Button */}
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className={`px-4 py-2 rounded-md text-white transition ${
                  isValid
                    ? "bg-black hover:bg-gray-900"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isEditMode ? "Update" : "Submit"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddCategoryModal;
