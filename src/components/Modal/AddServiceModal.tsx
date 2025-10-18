import React, { useState, useEffect, useMemo } from "react";
import BaseModal from "../BaseModals/BaseModal";
import AddService from "../ContentModal/AddService";

interface AddServiceModalProps {
  isOpen: boolean;
  toggle: () => void;
  initialValues?: Record<string, any>; // for Edit
  onSubmit: (values: Record<string, any>) => void;
  loading?: boolean;
}

const defaultValues = {
  api_id: "",
  product_id: "",
  api_code: "",
  rate: "",
  commission_surcharge: "",
  flat_per: "",
  gst: "",
  tds: "",
  txn_limit: "",
  status: "",
};

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  toggle,
  initialValues,
  onSubmit,
  loading = false,
}) => {
  const [values, setValues] = useState<Record<string, any>>(defaultValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      setValues(initialValues || defaultValues);
      setTouched({});
    }
  }, [isOpen, initialValues]);

  // Validation
  const errors = useMemo(() => {
    return {
      api_id: values.api_id ? "" : "API is required",
      product_id: values.product_id ? "" : "Product is required",
      api_code: values.api_code ? "" : "API Code is required",
      rate: values.rate ? "" : "Rate is required",
      commission_surcharge: values.commission_surcharge
        ? ""
        : "Commission/Surcharge is required",
      flat_per: values.flat_per ? "" : "Flat/Percentage is required",
      gst: values.gst ? "" : "GST is required",
      tds: values.tds ? "" : "TDS is required",
      txn_limit: values.txn_limit ? "" : "Txn Limit is required",
      status: values.status ? "" : "Status is required",
    };
  }, [values]);

  const isValid = useMemo(
    () => Object.values(errors).every((e) => !e),
    [errors]
  );

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = () => {
    if (!isValid) return;
    onSubmit(values);
  };

  return (
            <BaseModal
              isOpen={isOpen}
              toggle={toggle}
              headerText={initialValues ? "Edit Service" : "Add Service"}
              onConfirm={handleSave}
              onCancel={toggle}
              confirmText={loading ? "Saving..." : "Submit"}
              cancelText="Cancel"
              widthClass="w-[600px]"
            >
              <div className="">
                <AddService
                  values={values}
                  errors={errors}
                  touched={touched}
                  onChange={setValues}
                  onBlur={handleBlur}
                />
              </div>
            </BaseModal>
  );
};

export default AddServiceModal;