import React, { useState, useEffect, useMemo } from "react";
import BaseModal from "../BaseModals/BaseModal";
import AddMessageApi from "../ContentModal/AddMsgApi";

interface MessageApiData {
  api_name: string;
  api_type: string;
  base_url: string;
  params: string;
  method: string;
  status: string;
}

interface AddMessageApiModalProps {
  isOpen: boolean;
  toggle: () => void;
  onSuccess?: () => void;
  apiData?: MessageApiData | null; // Optional for edit mode
}

const AddMessageApiModal: React.FC<AddMessageApiModalProps> = ({
  isOpen,
  toggle,
  onSuccess,
  apiData,
}) => {
  console.log(apiData);
  
  const [values, setValues] = useState<MessageApiData>({
    api_name: "",
    api_type: "",
    base_url: "",
    params: "",
    method: "",
    status: "Active",
  });

  const [touched, setTouched] = useState({
    api_name: false,
    api_type: false,
    base_url: false,
    params: false,
    method: false,
    status: false,
  });

  // Reset or pre-fill values
  useEffect(() => {
    if (apiData && isOpen) {
      setValues(apiData);
    } else if (!isOpen) {
      setValues({
        api_name: "",
        api_type: "",
        base_url: "",
        params: "",
        method: "",
        status: "Active",
      });
      setTouched({
        api_name: false,
        api_type: false,
        base_url: false,
        params: false,
        method: false,
        status: false,
      });
    }
  }, [isOpen, apiData]);

  // Validation
  const errors = useMemo(() => {
    return {
      api_name: values.api_name ? "" : "API Name is required",
      api_type: values.api_type ? "" : "API Type is required",
      base_url: values.base_url ? "" : "Base URL is required",
      params: values.params ? "" : "Params are required",
      method: values.method ? "" : "Method is required",
      status: values.status ? "" : "Status is required",
    };
  }, [values]);

  const isValid = useMemo(
    () => Object.values(errors).every((e) => !e),
    [errors]
  );

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    if (!isValid) return;

    if (apiData) {
      console.log("📝 Editing API Configuration:", values);
      // await dispatch(updateMessageApiThunk(values));
    } else {
      console.log("🆕 Adding new Message API:", values);
      // await dispatch(addMessageApiThunk(values));
    }

    if (onSuccess) onSuccess();
    toggle();
  };

  const handleCancel = () => toggle();

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      headerText={apiData ? "Edit Message API" : "Add Message API"}
      onConfirm={handleSubmit}
      onCancel={handleCancel}
      confirmText={apiData ? "Update" : "Submit"}
      cancelText="Cancel"
      confirmColor={
        isValid
          ? "bg-black hover:bg-gray-900 text-white"
          : "bg-gray-400 text-white cursor-not-allowed"
      }
      widthClass="w-[600px]"
    >
      <AddMessageApi
        values={values}
        errors={errors}
        onChange={setValues}
        onBlur={handleBlur}
        touched={touched}
      />
    </BaseModal>
  );
};

export default AddMessageApiModal;