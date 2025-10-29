import React from "react";
import InputField from "../../components/Common/inputField"; // adjust path if needed

interface Props {
  formData: Record<string, string>;
  setFormData: (data: Record<string, string>) => void;
  error?: string;
}

const AuthKeyFormInputs: React.FC<Props> = ({
  formData,
  setFormData,
  error,
}) => {
  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-4 overflow-y-auto max-h-96 pr-1 pt-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="grid grid-cols-1 gap-3 ml-1">
          <div className="w-1/2 mb-3">
            <label
              htmlFor={`Field${i}`}
              className="block text-md font-medium text-gray-700 mb-3"
            >
              Field- {i}
            </label>
            {/* Auth Key Field */}
            <InputField
              label={`Auth Key ${i}`}
              id={`auth_key${i}`}
              placeholder={`Enter Auth Key ${i}`}
              value={formData[`auth_key${i}`] || ""}
              onChange={(e) => handleChange(`auth_key${i}`, e)}
              variant="authKey"
            />
          </div>

          <div className="">
            {/* Auth Value Field */}
            <InputField
              id={`auth_value${i}`}
              placeholder={`Enter Auth Value ${i}`}
              value={formData[`auth_value${i}`] || ""}
              onChange={(e) => handleChange(`auth_value${i}`, e)}
            />
          </div>
        </div>
      ))}

      {error && <p className="text-red-500 text-center pt-2">{error}</p>}
    </div>
  );
};

export default AuthKeyFormInputs;
