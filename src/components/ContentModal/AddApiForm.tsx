import React from "react";

type Values = {
  api_name: string;
};

type Errors = Partial<Values>;

interface Props {
  values: Values;
  errors?: Errors;
  onChange: (values: Values) => void;
  onBlur: (field: keyof Values) => void;
  touched: Record<keyof Values, boolean>;
}

const AddApiModalForm: React.FC<Props> = ({
  values,
  errors = {},
  onChange,
  onBlur,
  touched,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          API Name
        </label>
        <input
          type="text"
          value={values.api_name}
          onChange={(e) => onChange({ ...values, api_name: e.target.value })}
          onBlur={() => onBlur("api_name")}
          placeholder="Enter API Name"
          autoComplete="off"
          className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
            touched.api_name && errors.api_name
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {touched.api_name && errors.api_name && (
          <p className="mt-1 text-sm text-red-500">{errors.api_name}</p>
        )}
      </div>
    </div>
  );
};

export default AddApiModalForm;