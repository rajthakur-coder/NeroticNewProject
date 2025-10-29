import React from "react";
import InputField from "../../components/Common/inputField";
import RadioButton from "../Common/RadioButton";

type Values = {
  name: string;
  status: string;
};

type Errors = Partial<{
  name: string;
  status: string;
}>;

interface Props {
  values: Values;
  errors?: Errors;
  onChange: (values: Values) => void;
  onBlur: (field: keyof Values) => void;
  touched: Record<keyof Values, boolean>;
}

const AddCategoryForm: React.FC<Props> = ({
  values,
  errors = {},
  onChange,
  onBlur,
  touched,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 ">
      {/* Category Name Field */}
      <div>
        <InputField
              label="Name"
                    placeholder="Enter Product Category Name"
                    type="text"
                    themeMode="light"
                    value={values.name}
                    onChange={(e) => onChange({ ...values, name: e })}
                    onBlur={() => onBlur("name")}
                    touched={touched.name}
                    error={errors.name}
                  />
</div>
      {/* Status Field */}
      <div>
        <label className="block mb-1 text-sm font-medium text-text-main">
          Status
        </label>

        <div className="flex items-center space-x-6">
          {/* Active */}
          <RadioButton
            checked={values.status === "Active"}
            onChange={() => {
              onChange({ ...values, status: "Active" });
              onBlur("status");
            }}
            label="Active"
            size="sm"
            activeColor="bg-green-600"
            borderColor="border-green-600"
            labelColor="text-text-main"
          />

          {/* Inactive */}
          <RadioButton
            checked={values.status === "Inactive"}
            onChange={() => {
              onChange({ ...values, status: "Inactive" });
              onBlur("status");
            }}
            label="Inactive"
            size="sm"
            activeColor="bg-danger"
            borderColor="border-red-600"
            labelColor="text-text-main"
          />
        </div>

        {touched.status && errors.status && (
          <p className="mt-1 text-sm text-danger">{errors.status}</p>
        )}
      </div>
    </div>
  );
};

export default AddCategoryForm;