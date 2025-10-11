// src/components/Common/ResetPassword.tsx

import React, { useState, type FormEvent } from "react";
// Adjust these imports based on your project structure
import { ToasterUtils } from "../../components/ui/toast";
import Icon from "../../components/ui/Icon";
import InputField from "../../components/Common/inputField"; // Assuming inputField is a common component
import Checkbox from "../../components/Common/Checkbox"; // Assuming Checkbox is a common component


// --- INTERFACE ---

export interface ResetPasswordProps {
  onPasswordSave: () => void;
  onCancel: () => void;
  setLoading: (isLoading: boolean) => void;
  loading: boolean;
}

// --- RESET PASSWORD COMPONENT ---

const ResetPassword: React.FC<ResetPasswordProps> = ({
  onPasswordSave,
  onCancel,
  setLoading,
  loading
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Validation: Password must be at least 6 characters long and match
  const isSaveValid = newPassword.trim().length >= 6 && newPassword === confirmPassword;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isSaveValid) {
      if (newPassword !== confirmPassword) {
        ToasterUtils.error("Passwords do not match.");
      } else if (newPassword.trim().length < 6) {
        ToasterUtils.error("Password must be at least 6 characters.");
      }
      return;
    }

    setLoading(true);
    const toastId = ToasterUtils.loading("Saving new password...");

    // --- Mock API Call (Replace with actual API call) ---
    setTimeout(() => {
      setLoading(false);
      ToasterUtils.dismiss(toastId);
      
      // Call the prop function to signal the parent that saving is complete
      onPasswordSave();
      ToasterUtils.success("Password updated successfully! Please sign in.");
    }, 1500);
    // ----------------------------------------------------
  };

  return (
    <div className="flex flex-col p-6 lg:p-0">
      <div className="flex items-center pb-6">
        <button
          onClick={onCancel}
          className="p-1 mr-4 text-gray-500 transition duration-150 hover:text-gray-700"
          aria-label="Back to Previous Step (OTP)"
        >
          <Icon name="bx bx-arrow-back" size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-700">Set New Password</h2>
      </div>

      <p className="mb-6 text-gray-700 text-md">
        Enter and confirm your new password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
      <InputField
        label="New Password (min 6 chars)"
        type={showPass ? "text" : "password"}
        value={newPassword}
        onChange={setNewPassword}
        leftIcon="ri-lock-2-line"
      />

      <InputField
        label="Confirm Password"
        type={showPass ? "text" : "password"}
        value={confirmPassword}
        onChange={setConfirmPassword}
        leftIcon="ri-lock-2-line"
      />

        <div className="flex items-center">
          <Checkbox
            checked={showPass}
            onChange={() => setShowPass(!showPass)}
            label="Show Passwords"
            size="xs"
            shape="rounded"
            checkedColor="bg-primary"
            uncheckedColor="bg-white"
            showLabel
          />
        </div>

        <div className="flex justify-center pt-4"> 
          <button
            type="submit"
            disabled={!isSaveValid || loading}
            className={`relative flex items-center justify-center font-medium shadow-md transition-all duration-300 ease-in-out overflow-hidden
              ${!isSaveValid || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white "
              }
              ${loading
                ? "w-12 h-12 rounded-full" 
                : "w-full h-12 rounded-xl" 
              }
            `}
          >
            {loading ? (
              // Updated spinner SVG to match the consistent style
              <svg 
                className="absolute w-8 h-8 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-100"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="31.4"
                  strokeDashoffset="0"
                />
              </svg>
            ) : (
              "Save Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;