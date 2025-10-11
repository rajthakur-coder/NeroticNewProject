import React from "react";

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
    <div className="grid grid-cols-1 gap-6">
      {/* Category Name Field */}
      <div>
        <label
          htmlFor="categoryName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="categoryName"
          value={values.name}
          onChange={(e) => onChange({ ...values, name: e.target.value })}
          onBlur={() => onBlur("name")}
          placeholder="Enter Product Category Name"
          autoComplete="off"
          className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            touched.name && errors.name
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
        />
        {touched.name && errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Status Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <div className="flex items-center space-x-6">
          {/* Active */}
          <label className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="status"
              value="Active"
              checked={values.status === "Active"}
              onChange={() => onChange({ ...values, status: "Active" })}
              onBlur={() => onBlur("status")}
              className="text-green-600 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">Active</span>
          </label>

          {/* Inactive */}
          <label className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="status"
              value="Inactive"
              checked={values.status === "Inactive"}
              onChange={() => onChange({ ...values, status: "Inactive" })}
              onBlur={() => onBlur("status")}
              className="text-red-600 focus:ring-red-500"
            />
            <span className="text-sm text-gray-700">Inactive</span>
          </label>
        </div>

        {touched.status && errors.status && (
          <p className="mt-1 text-sm text-red-500">{errors.status}</p>
        )}
      </div>
    </div>
  );
};

export default AddCategoryForm;
