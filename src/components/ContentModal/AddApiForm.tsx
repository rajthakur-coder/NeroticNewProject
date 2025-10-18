import React from "react";
import InputField from "../../components/Common/inputField";

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
    <div className="grid grid-cols-1 gap-6">
      <div>
        <InputField
          label="Name"
          placeholder="Enter Api Name"
          type="text"
          themeMode="light"
          value={values.api_name}
          onChange={(e) => onChange({ ...values, api_name: e.target.value })}
          onBlur={() => onBlur("api_name")}
          touched={touched.api_name}
          error={errors.api_name}
        />
      </div>
    </div>
  );
};

export default AddApiModalForm;