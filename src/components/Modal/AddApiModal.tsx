import React, { useState, useEffect, useMemo } from "react";
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

  return (

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
  );
};

export default AddApiModal;