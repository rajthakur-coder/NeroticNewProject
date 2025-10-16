import React from "react";

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
    <div className="space-y-4 overflow-y-auto max-h-96 pr-1">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor={`auth_key${i}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Auth Key {i}
            </label>
            <input
              id={`auth_key${i}`}
              type="text"
              placeholder={`Enter Auth Key ${i}`}
              value={formData[`auth_key${i}`] || ""}
              onChange={(e) => handleChange(`auth_key${i}`, e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor={`auth_value${i}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Auth Value {i}
            </label>
            <input
              id={`auth_value${i}`}
              type="text"
              placeholder={`Enter Auth Value ${i}`}
              value={formData[`auth_value${i}`] || ""}
              onChange={(e) => handleChange(`auth_value${i}`, e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}

      {error && <p className="text-red-500 text-center pt-2">{error}</p>}
    </div>
  );
};

export default AuthKeyFormInputs;