import React from "react";
import InputField from "../../components/Common/inputField";
import RadioButton from "../Common/RadioButton";
import CustomSelect from "../../components/Common/CustomSelect";

interface Values {
  api_name: string;
  api_type: string;
  base_url: string;
  params: string;
  method: string;
  status: string;
}

type Errors = Partial<Record<keyof Values, string>>;

interface AddMessageApiFormProps {
  values: Values;
  errors?: Errors;
  onChange: (values: Values) => void;
  onBlur: (field: keyof Values) => void;
  touched: Record<keyof Values, boolean>;
}

const AddMessageApi: React.FC<AddMessageApiFormProps> = ({
  values,
  errors = {},
  onChange,
  onBlur,
  touched,
}) => {
  const apiTypeOptions = [
    { label: "SMS", value: "SMS" },
    { label: "Whatsapp", value: "Whatsapp" },
  ];

  const methodOptions = [
    { label: "GET", value: "GET" },
    { label: "POST", value: "POST" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto p-3">
      {/* API Name */}
      <div>
        <InputField
          label="API Name"
          placeholder="Enter API Name"
          type="text"
          themeMode="light"
          value={values.api_name}
          onChange={(e) => onChange({ ...values, api_name: e })}
          onBlur={() => onBlur("api_name")}
          touched={touched.api_name}
          error={errors.api_name}
        />
      </div>

      {/* API Type */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          API Type
        </label>
        <CustomSelect
          label=""
          value={values.api_type}
          options={apiTypeOptions}
          onChange={(val) => onChange({ ...values, api_type: val })}
        />
        {touched.api_type && errors.api_type && (
          <p className="mt-1 text-sm text-red-500">{errors.api_type}</p>
        )}
      </div>

      {/* Base URL */}
      <div>
        <InputField
          label="Base URL"
          placeholder="Paste Base URL"
          type="text"
          themeMode="light"
          value={values.base_url}
          onChange={(e) => onChange({ ...values, base_url: e })}
          onBlur={() => onBlur("base_url")}
          touched={touched.base_url}
          error={errors.base_url}
        />
      </div>

      {/* API Params */}
      <div>
        <InputField
          label="API Params"
          placeholder="Paste API Params"
          type="textarea"
          themeMode="light"
          value={values.params}
          onChange={(e) => onChange({ ...values, params: e })}
          onBlur={() => onBlur("params")}
          touched={touched.params}
          error={errors.params}
        />
        <span className="mt-2 text-sm text-gray-500 block">
          Exp:
          <code className="text-pink-600">[NUMBER]</code>,{" "}
          <code className="text-pink-600">[MESSAGE]</code>,{" "}
          <code className="text-pink-600">[TEMP_ID]</code>
        </span>
      </div>

      {/* API Method */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          API Method
        </label>
        <CustomSelect
          label=""
          value={values.method}
          options={methodOptions}
          onChange={(val) => onChange({ ...values, method: val })}
        />
        {touched.method && errors.method && (
          <p className="mt-1 text-sm text-red-500">{errors.method}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Status
        </label>
        <div className="flex items-center gap-6">
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
            labelColor="text-gray-700"
          />
          <RadioButton
            checked={values.status === "Inactive"}
            onChange={() => {
              onChange({ ...values, status: "Inactive" });
              onBlur("status");
            }}
            label="Inactive"
            size="sm"
            activeColor="bg-red-600"
            borderColor="border-red-600"
            labelColor="text-gray-700"
          />
        </div>
        {touched.status && errors.status && (
          <p className="mt-1 text-sm text-red-500">{errors.status}</p>
        )}
      </div>
    </div>
  );
};

export default AddMessageApi;