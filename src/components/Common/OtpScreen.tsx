// src/components/Common/OtpScreen.tsx

import React, { useState, useEffect, useRef, FormEvent } from "react";
import { ToasterUtils } from "../ui/toast";
import Icon from "../ui/Icon";

export interface OtpScreenProps {
  onOtpConfirm: (otp: string) => void;
  onCancel: () => void;
  phoneNumber: string;
  flowType: "signin" | "forgot";
}

const OtpScreen: React.FC<OtpScreenProps> = ({
  onOtpConfirm,
  onCancel,
  phoneNumber,
  flowType,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [exiting, setExiting] = useState(false);
  const [entering, setEntering] = useState(true);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const isOtpValid = otp.every((digit) => digit.length === 1);

  // Entrance animation on mount
  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 10);
    return () => clearTimeout(t);
  }, []);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setInterval(() => {
        setResendTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [resendTimer]);

  // Input change handler
  const handleChange = (element: HTMLInputElement, index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Keyboard navigation and backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[index] !== "") {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Confirm OTP handler
  const handleConfirm = (e: FormEvent) => {
    e.preventDefault();
    if (!isOtpValid) return;

    setLoading(true);
    const fullOtp = otp.join("");

    setTimeout(() => {
      setLoading(false);
      if (fullOtp === "123456" || fullOtp === "000000") {
        onOtpConfirm(fullOtp);
      } else {
        ToasterUtils.error("Invalid OTP. Please try again.");
        setOtp(new Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  // Resend OTP handler
  const handleResendOtp = () => {
    if (resendTimer === 0) {
      ToasterUtils.info("New OTP sent!");
      setResendTimer(30);
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    }
  };

  // Format resend timer
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Smooth exit animation
  const handleCancelClick = () => {
    setExiting(true);
    setTimeout(() => {
      onCancel();
    }, 400);
  };

  return (
  <div
  className={`flex flex-col  p-6 lg:p-0 animate__animated ${
    exiting ? 'animate__slideInLeft faster-slideInLeft' : 'animate__slideInRight faster-slideInRight'
  }`}
>

      {/* Header */}
      <div className="flex items-center pb-6">
        <button
          onClick={handleCancelClick}
          className="p-1 mr-4 text-gray-500 transition duration-150 hover:text-gray-700"
          aria-label={flowType === "signin" ? "Back to Sign In" : "Back to Forgot Password"}
        >
          <Icon name="bx bx-arrow-back" size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-700">Enter OTP</h2>
      </div>

      {/* Info Text */}
      <p className="mb-6 text-gray-700 text-md">
        Enter the 6-digit OTP sent to{" "}
        {flowType === "signin" ? "your phone number" : "the specified contact"}{" "}
        <span className="font-semibold text-gray-900">{phoneNumber}</span>
      </p>

      {/* OTP Input Form */}
      <form onSubmit={handleConfirm} className="space-y-10">
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
              className="w-12 h-12 text-xl text-center transition duration-150 border-2 border-gray-300 shadow-md rounded-xl focus:outline-none focus:border-gray-400 focus:border-4"
            />
          ))}
        </div>

        {/* Resend Timer */}
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

        {/* Confirm Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={!isOtpValid || loading}
            className={`relative flex items-center justify-center font-medium shadow-md transition-all duration-300 ease-in-out overflow-hidden
              ${
                !isOtpValid || loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white"
              }
              ${loading ? "w-12 h-12 rounded-full" : "w-full h-12 rounded-xl"}
            `}
          >
            {loading ? (
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
              "Confirm"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtpScreen;
