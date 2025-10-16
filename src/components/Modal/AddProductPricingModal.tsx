import React, { useMemo, useState, useEffect } from "react";
import BaseModal from "../BaseModals/BaseModal";
import ProductPricingForm from "../ContentModal/ProductPricingForm";

interface ProductPricingData {
  product_id: number | string;
  price: string | number;
  currency: string;
}

interface AddProductPricingModalProps {
  isOpen: boolean;
  toggle: () => void;
  onSuccess?: () => void;
  pricingData?: ProductPricingData | null; // optional for edit mode
}

const AddProductPricingModal: React.FC<AddProductPricingModalProps> = ({
  isOpen,
  toggle,
  onSuccess,
  pricingData,
}) => {
  const [values, setValues] = useState<ProductPricingData>({
    product_id: "",
    price: "",
    currency: "INR",
  });

  const [touched, setTouched] = useState({
    product_id: false,
    price: false,
  });

  // Pre-fill when editing
  useEffect(() => {
    if (pricingData && isOpen) {
      setValues(pricingData);
    } else if (!isOpen) {
      setValues({ product_id: "", price: "", currency: "INR" });
      setTouched({ product_id: false, price: false });
    }
  }, [pricingData, isOpen]);

  const errors = useMemo(() => {
    return {
      product_id: values.product_id ? "" : "Product is required",
      price: values.price ? "" : "Price is required",
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

    if (pricingData) {
      console.log("📝 Editing pricing:", values);
    } else {
      console.log("🆕 Adding new pricing:", values);
    }

    if (onSuccess) onSuccess();
    toggle();
  };

  const handleCancel = () => {
    toggle();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={toggle}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[500px]"
      >
        <BaseModal
          isOpen={isOpen}
          toggle={toggle}
          headerText={pricingData ? "Edit Product Price" : "Add Product Price"}
          onConfirm={handleSubmit}
          onCancel={handleCancel}
          confirmText={pricingData ? "Update" : "Submit"}
          cancelText="Cancel"
          confirmColor={
            isValid
              ? "bg-black hover:bg-gray-900 text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }
          widthClass="w-[500px]"
        >
          <ProductPricingForm
            values={values}
            errors={errors}
            onChange={setValues}
            onBlur={handleBlur}
            touched={touched}
          />
        </BaseModal>
      </div>
    </div>
  );
};

export default AddProductPricingModal;
