// src/components/Common/ForgotPassword.tsx

import React, { useState, type FormEvent } from "react";
// Adjust these imports based on your project structure
import { ToasterUtils } from "../../components/ui/toast";
import Icon from "../../components/ui/Icon";
import InputField from "../../components/Common/inputField"; 

// --- INTERFACE ---

export interface ForgotPasswordProps {
  onOtpRequest: (contact: string) => void;
  onCancel: () => void;
  setLoading: (isLoading: boolean) => void;

  loading: boolean;
}

// --- FORGOT PASSWORD COMPONENT ---

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onOtpRequest,
  onCancel,
  setLoading,
  loading
}) => {
  const [data, setData] = useState({
    email: "",
    mobile: "",
  });

  // Check if at least one field is filled
  const isProcessValid = data.email.trim() !== "" || data.mobile.trim() !== "";

  const handleChange = (name: 'email' | 'mobile', value: string) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isProcessValid) return;

    setLoading(true);
    const toastId = ToasterUtils.loading("Processing request and sending OTP...");

    // Determine the contact used for verification
    const contact = data.email.trim() || data.mobile.trim();
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      ToasterUtils.dismiss(toastId);
      
      onOtpRequest(contact); 
      ToasterUtils.success(`OTP sent to ${contact}.`);
    }, 1500);
  };

  return (
    <div className="flex flex-col p-6 lg:p-0">
      <div className="flex items-center pb-6">
        <button
          onClick={onCancel}
          className="p-1 mr-4 text-gray-500 transition duration-150 hover:text-gray-700"
          aria-label="Back to Sign In"
        >
          <Icon name="bx bx-arrow-back" size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-700">Forgot Password</h2>
      </div>
      
      <p className="mb-6 text-md gray-700 text-">
        Enter your **email or mobile number** to receive a verification code.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          label="Email"
          type="email"
          value={data.email}
          onChange={(val) => handleChange("email", val)}
          leftIcon="ri-mail-line"
        />

        <div className="relative flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <InputField
          label="Mobile Number"
          type="tel"
          value={data.mobile}
          onChange={(val) => handleChange("mobile", val)}
          leftIcon="bx bx-mobile"
          inputMode="numeric"
        />

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={!isProcessValid || loading}
            className={`relative flex items-center justify-center font-medium shadow-md transition-all duration-300 ease-in-out overflow-hidden
              ${!isProcessValid || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white "
              }
              ${loading
                ? "w-12 h-12 rounded-full" // Shrink to circle when loading
                : "w-full h-12 rounded-xl" // Full width when not loading
              }
            `}
          >
            {loading ? (
              // Loading spinner SVG (Updated to match the aesthetic of SignInForm.tsx)
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
              "Send OTP"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;