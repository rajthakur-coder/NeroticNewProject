import React, { useState, useEffect, useMemo } from "react";
import BaseModal from "../BaseModals/BaseModal";
import AddProductForm from "../ContentModal/ProductForm";

interface ProductData {
  category_id: number | null;
  name: string;
  description: string;
  icon: File | string | null;
  status: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  toggle: () => void;
  onSuccess?: () => void;
  productData?: ProductData | null; // Optional for edit mode
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  toggle,
  onSuccess,
  productData,
}) => {
  const [values, setValues] = useState<ProductData>({
    category_id: null,
    name: "",
    description: "",
    icon: null,
    status: "Active",
  });

  const [touched, setTouched] = useState({
    category_id: false,
    name: false,
    description: false,
    icon: false,
    status: false,
  });

  // Pre-fill when editing or reset when closing
  useEffect(() => {
    if (productData && isOpen) {
      setValues(productData);
    } else if (!isOpen) {
      setValues({
        category_id: null,
        name: "",
        description: "",
        icon: null,
        status: "Active",
      });
      setTouched({
        category_id: false,
        name: false,
        description: false,
        icon: false,
        status: false,
      });
    }
  }, [isOpen, productData]);

  const errors = useMemo(() => {
    return {
      category_id: values.category_id ? "" : "Category is required",
      name: values.name ? "" : "Name is required",
      description: values.description ? "" : "Description is required",
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

    if (productData) {
      console.log("📝 Editing product:", values);
      // await dispatch(updateProductThunk(values));
    } else {
      console.log("🆕 Adding new product:", values);
      // await dispatch(addProductThunk(values));
    }

    if (onSuccess) onSuccess();
    toggle();
  };

  const handleCancel = () => {
    toggle();
  };

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        toggle={toggle}
        headerText={productData ? "Edit Product" : "Add Product"}
        onConfirm={handleSubmit}
        onCancel={handleCancel}
        confirmText={productData ? "Update" : "Submit"}
        cancelText="Cancel"
        confirmColor={
          isValid
            ? "bg-black hover:bg-gray-900 text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
        }
        widthClass="w-[600px]"
      >
        <AddProductForm
          values={values}
          errors={errors}
          onChange={setValues}
          onBlur={handleBlur}
          touched={touched}
        />
      </BaseModal>
    </>
  );
};

export default AddProductModal;
