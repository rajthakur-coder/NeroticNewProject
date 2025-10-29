import React, { useState } from "react";
import InputField from "../../../components/common/inputField";
import Icon from "../../../components/ui/Icon";
import CustomSelect from "../../../components/Common/CustomSelect";
import RadioButton from "../../../components/common//RadioButton";
import Checkbox from "../../../components/common/Checkbox";
import { Button } from "../../../components/Common/Button";

const SendMessagePage = () => {
  const [formValues, setFormValues] = useState({
    sendFrom: "",
    userType: "",
    active: false,
    inactive: false,
    message: "",
    file: null,
  });

  const userTypeOptions = [
    { value: "all", label: "All Users" },
    { value: "premium", label: "Premium Users" },
    { value: "free", label: "Free Users" },
  ];

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e) => {
    handleChange("file", e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formValues);
  };

  return (
    <div className="bg-surface-body text-text-main rounded-lg">
      <div className="shadow-xl bg-surface-card rounded-xl">
        <div className="px-4 sm:p-6 gap-4 md:flex-row md:items-center md:justify-between">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-1"
          >
            {/* LEFT SIDE */}
            <div className="space-y-5">
              {/* Send Message From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send Message From <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-8">
                  <RadioButton
                    checked={formValues.sendFrom === "sms"}
                    onChange={() => handleChange("sendFrom", "sms")}
                    label="SMS"
                    size="sm"
                    activeColor="bg-green-600"
                    borderColor="border-green-600"
                    labelColor="text-gray-700"
                  />
                  <RadioButton
                    checked={formValues.sendFrom === "whatsapp"}
                    onChange={() => handleChange("sendFrom", "whatsapp")}
                    label="Whatsapp"
                    size="sm"
                    activeColor="bg-green-600"
                    borderColor="border-green-600"
                    labelColor="text-gray-700"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-3">
                {/* Select User Type */}
                <CustomSelect
                  label="Select User Type *"
                  value={formValues.userType}
                  options={userTypeOptions}
                  onChange={(val) => handleChange("userType", val)}
                />

                {/* Select User’s Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select User’s Status <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-6">
                    <Checkbox
                      checked={formValues.active}
                      onChange={() =>
                        handleChange("active", !formValues.active)
                      }
                      size="xs"
                      shape="rounded"
                      showLabel
                      label="Active"
                      checkedColor="bg-green-600"
                      uncheckedColor="bg-white"
                      borderColor="border-gray-400"
                    />
                    <Checkbox
                      checked={formValues.inactive}
                      onChange={() =>
                        handleChange("inactive", !formValues.inactive)
                      }
                      size="xs"
                      shape="rounded"
                      showLabel
                      label="Inactive"
                      checkedColor="bg-red-600"
                      uncheckedColor="bg-white"
                      borderColor="border-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* LEFT: Message textarea */}
                <div className="flex-1">
                  <InputField
                    label="Message *"
                    placeholder="Enter your message"
                    type="textarea"
                    value={formValues.message}
                    onChange={(val) => handleChange("message", val)}
                  />
                </div>

                {/* RIGHT: Keyword table */}
                <div className="flex-1">
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full border-collapse">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left px-4 py-2 text-sm font-medium text-gray-700 border-r w-1/3">
                            Keyword
                          </th>
                          <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-2 text-sm text-pink-700">
                            <code>[FULL_NAME]</code>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700">
                            Full name of the user
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-pink-700">
                            <code>[COMPANY_NAME]</code>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700">
                            Name of the company/shop
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div className="md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose File
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
                />
              </div>

              {/* Submit */}
              <div className="text-text-subtle">
                <Button
                  className="p-2 transition-colors rounded-full"
                  text="Submit"
                  size="sm"
                  width="130px"
                  height="40px"
                  icon={() => <Icon name="ri-send-plane-2-line" size={20} />}
                ></Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMessagePage;
