// src/components/Common/OtpScreen.tsx

import React, { useState, useEffect, useRef, FormEvent } from "react";
// Adjust these imports based on your project structure
import { ToasterUtils } from "../ui/toast"; 
import Icon from "../ui/Icon"; 

// --- INTERFACE ---

export interface OtpScreenProps {
  /** Function to call when OTP is verified. Passes the full 6-digit OTP string. */
  onOtpConfirm: (otp: string) => void;
  /** Function to call when the user clicks the back/cancel button. */
  onCancel: () => void;
  /** The masked contact information (e.g., "xxxxxx8110" or "user@email.com"). */
  phoneNumber: string;
  /** Determines the text shown in the header/description. */
  flowType: 'signin' | 'forgot';
}

// --- OTP SCREEN COMPONENT ---

const OtpScreen: React.FC<OtpScreenProps> = ({
  onOtpConfirm,
  onCancel,
  phoneNumber,
  flowType
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const isOtpValid = otp.every((digit) => digit.length === 1);

  // Resend timer logic
  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setInterval(() => {
        setResendTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [resendTimer]);

  const handleChange = (
    element: HTMLInputElement,
    index: number,
    value: string
  ) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      
      // Update the digit
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus to the next input
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const newOtp = [...otp];
      
      if (newOtp[index] !== "") {
        // Clear the current box and stay
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Current box is empty, move back and clear previous
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === 'ArrowRight' && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = (e: FormEvent) => {
    e.preventDefault();
    if (!isOtpValid) return;

    setLoading(true);
    const fullOtp = otp.join("");

    const toastId = ToasterUtils.loading("Verifying OTP...");
    setTimeout(() => {
      setLoading(false);
      ToasterUtils.dismiss(toastId);
      // --- Mock Verification Logic (Replace with actual API call) ---
      if (fullOtp === "123456" || fullOtp === "000000") {
        onOtpConfirm(fullOtp);
      } else {
        ToasterUtils.error("Invalid OTP. Please try again.");
        setOtp(new Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
      // -----------------------------------------------------------
    }, 1500);
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      ToasterUtils.info("New OTP sent!");
      setResendTimer(30);
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
      // Add actual resend OTP API call here
    }
  };

  // Format the time as 0:XX
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col p-6 lg:p-0">
      <div className="flex items-center pb-6">
        <button
          onClick={onCancel}
          className="p-1 mr-4 text-gray-500 transition duration-150 hover:text-gray-700"
          aria-label={flowType === 'signin' ? "Back to Sign In" : "Back to Forgot Password"}
        >
          <Icon name="bx bx-arrow-back" size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-700">Enter OTP</h2>
      </div>

      <p className="mb-6 text-md gray-700 text-">
        Enter the 6-digit OTP sent to {flowType === 'signin' ? "your phone number" : "the specified contact"}{" "}
        <span className="font-semibold text-gray-900">{phoneNumber}</span>
      </p>

      <form onSubmit={handleConfirm} className="space-y-10">
        {/* OTP Input Boxes (w-12 h-12 for equal size) */}
        <div className="flex justify-between space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              inputMode="numeric"
              pattern="[0-9]"
              value={digit}
              autoFocus={index === 0 && otp[index] === ""}
              onChange={(e) => handleChange(e.currentTarget, index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-xl text-center transition duration-150 border-2 border-gray-300 shadow-md rounded-xl focus:outline-none focus:border-gray-300 focus:border-4"
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-sm">
          {resendTimer > 0 ? (
            <p className="font-medium text-gray-500 transition duration-150">
              Send OTP after {formatTime(resendTimer)}
            </p>
          ) : (
            <button
              type="button"
              className="font-medium text-indigo-600 transition duration-150 hover:text-indigo-500"
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Action Buttons (Only Confirm button remains) */}
        <div className="flex justify-end pt-4 space-x-4">
          <button
            type="submit"
            disabled={!isOtpValid || loading}
            className={`px-6 py-2 rounded-lg font-medium transition duration-300 ease-in-out shadow-md
              ${!isOtpValid || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white"
              }
            `}
          >
            {loading ? (
              <svg
                className="w-5 h-5 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtpScreen;