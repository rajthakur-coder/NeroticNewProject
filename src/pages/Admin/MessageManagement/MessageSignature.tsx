import React, { useState } from "react";
import InputField from "../../../components/common/inputField";
import CustomSelect from "../../../components/Common/CustomSelect";
import { Button } from "../../../components/Common/Button";

const MessageSignature = () => {
  const [formValues, setFormValues] = useState({
    smsSignature: "",
    smsStatus: "",
    whatsappSignature: "",
    whatsappStatus: "",
  });

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (type) => {
    console.log(`${type} Signature Updated:`, formValues);
  };

  return (
    <div className="text-text-main">
      <div className="shadow-xl bg-surface-card rounded-xl">
        <div className="p-4 sm:p-6">
          {/* GRID CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT SIDE - SMS SIGNATURE */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-800">
                SMS Signature
              </h2>

              <div>
                <InputField
                  label="SMS Signature"
                  type="textarea"
                  placeholder="Enter SMS signature"
                  value={formValues.smsSignature}
                  onChange={(val) => handleChange("smsSignature", val)}
                />
              </div>

              <CustomSelect
                label="Status"
                placeholder="select status"
                value={formValues.smsStatus}
                options={statusOptions}
                onChange={(val) => handleChange("smsStatus", val)}
              />
              <Button
                className="p-2 transition-colors rounded-full"
                text="Update SMS Signature"
                onClick={() => handleSubmit("SMS")}
                size="sm"
                width="180px"
                height="40px"
              ></Button>
            </div>

            {/* RIGHT SIDE - WHATSAPP SIGNATURE */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-800">
                Whatsapp Signature
              </h2>

              <div>
                <InputField
                  label="Whatsapp Signature"
                  type="textarea"
                  placeholder="Enter Whatsapp signature"
                  value={formValues.whatsappSignature}
                  onChange={(val) => handleChange("whatsappSignature", val)}
                />
              </div>

              <CustomSelect
                label="Status"
                placeholder="select status"
                value={formValues.whatsappStatus}
                options={statusOptions}
                onChange={(val) => handleChange("whatsappStatus", val)}
              />

              <Button
                className="p-2 transition-colors rounded-full"
                text="Update Whatsapp Signature"
                onClick={() => handleSubmit("Whatsapp")}
                size="sm"
                width="200px"
                height="40px"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSignature;