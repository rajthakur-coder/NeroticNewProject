import React, { useMemo, useState, useEffect } from "react";
import BaseModal from "../BaseModals/BaseModal";
import AddCategoryForm from "../ContentModal/CategoryForm";

interface AddCategoryModalProps {
  isOpen: boolean;
  toggle: () => void;
  categoryData?: { name: string; status: string } | null;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  toggle,
  categoryData,
}) => {
  const [formData, setFormData] = useState({ name: "", status: "Active" });
  const [touched, setTouched] = useState({ name: false, status: false });

  const isEditMode = Boolean(categoryData);

  // Prefill data if editing, or reset if adding new
  useEffect(() => {
    if (isOpen) {
      if (categoryData) {
        setFormData({
          name: categoryData.name || "",
          status: categoryData.status || "Active",
        });
      } else {
        // Reset form for new category
        setFormData({ name: "", status: "Active" });
        setTouched({ name: false, status: false });
      }
    }
  }, [categoryData, isOpen]);

  const errors = useMemo(
    () => ({
      name: formData.name.trim() ? "" : "Name is required", // Added .trim() for better validation
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

  const handleConfirm = () => {
    if (!isValid) {
      // Mark all fields as touched to show errors on invalid submit attempt
      setTouched({ name: true, status: true });
      return;
    }

    if (isEditMode) {
      console.log("✅ Updated Category:", formData);
      // Actual update logic here
    } else {
      console.log("✅ Added New Category:", formData);
      // Actual add logic here
    }
    
    // Reset form and close modal
    setFormData({ name: "", status: "Active" });
    setTouched({ name: false, status: false });
    toggle();
  };

  const handleCancel = () => {
    setFormData({ name: "", status: "Active" });
    setTouched({ name: false, status: false });
    toggle();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      headerText={
        isEditMode ? "Update Product Category" : "Add Product Category"
      }
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      confirmText={isEditMode ? "Update" : "Submit"}
      cancelText="Cancel"
      confirmColor={
        isValid
          ? "bg-black hover:bg-gray-900 text-white"
          : "bg-gray-400 text-white cursor-not-allowed"
      }
    widthClass="w-[450px]"
    >
      {/* Form Content */}
      <AddCategoryForm
        values={formData}
        errors={errors}
        onChange={setFormData}
        onBlur={handleBlur}
        touched={touched}
      />
    </BaseModal>
  );
};

export default AddCategoryModal;