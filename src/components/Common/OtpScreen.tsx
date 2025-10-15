// // src/components/Common/OtpScreen.tsx

// import React, { useState, useEffect, useRef,type FormEvent } from "react";
// import { ToasterUtils } from "../ui/toast";
// import Icon from "../ui/Icon";

// export interface OtpScreenProps {
//   onOtpConfirm: (otp: string) => void;
//   onCancel: () => void;
//   phoneNumber: string;
//   flowType: "signin" | "forgot";
// }

// const OtpScreen: React.FC<OtpScreenProps> = ({
//   onOtpConfirm,
//   onCancel,
//   phoneNumber,
//   flowType,
// }) => {
//   const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
//   const [loading, setLoading] = useState(false);
//   const [resendTimer, setResendTimer] = useState(30);
//   const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

//   const isOtpValid = otp.every((digit) => digit.length === 1);

//   // Helper function to find the index of the first empty OTP box
//   const getFirstEmptyIndex = () => {
//     // Finds the index of the first element that is an empty string
//     const emptyIndex = otp.findIndex(v => v === "");
//     // If all are filled, return the last index for editing/backspace on the last digit
//     if (emptyIndex === -1) return otp.length - 1; 
//     return emptyIndex;
//   };
//   
//   // Get the index of the next editable digit (the first empty one)
//   const firstEmptyIndex = getFirstEmptyIndex();

//   // Resend timer countdown
//   useEffect(() => {
//     if (resendTimer > 0) {
//       const timerId = setInterval(() => {
//         setResendTimer((prevTime) => prevTime - 1);
//       }, 1000);
//       return () => clearInterval(timerId);
//     }
//   }, [resendTimer]);

//   // useEffect to focus on the first empty input or the last input if all are filled
//   useEffect(() => {
//     if (inputRefs.current.length > 0) {
//       // Focus on the first empty box (or the last box if all are filled)
//       inputRefs.current[firstEmptyIndex]?.focus();
//     }
//   }, [firstEmptyIndex, otp]); // Added otp as dependency to refocus on paste/resend

//   // Input change handler
//   const handleChange = (element: HTMLInputElement, index: number, value: string) => {
//     // Paste logic
//     if (value.length > 1) {
//       const pastedCode = value.slice(0, otp.length).split('');
//       if (pastedCode.every(char => /^\d$/.test(char))) {
//         setOtp(pastedCode.concat(new Array(otp.length - pastedCode.length).fill("")));
//         // Refocus is handled by the useEffect watching `firstEmptyIndex`
//       }
//       return;
//     }
//     
//     // Normal digit entry/overwrite
//     if (/^\d?$/.test(value) && value.length === 1) { 
//         const newOtp = [...otp];
//         newOtp[index] = value;
//         setOtp(newOtp);
//         
//         // Forward Focus: Focus on the next input automatically after typing a digit
//         if (index < otp.length - 1) {
//             inputRefs.current[index + 1]?.focus();
//         }
//     }
//   };

//   // Keyboard handler (Includes Backspace logic and Overwrite logic)
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//     
//     // 1. Backspace Logic
//     if (e.key === "Backspace") {
//       e.preventDefault();
//       
//       const newOtp = [...otp];

//       // A. Current box is FILLED: Clear the current box and stay focused.
//       if (newOtp[index] !== "") {
//         newOtp[index] = "";
//         setOtp(newOtp);
//         // Focus remains here (or is set by useEffect)
//         return;
//       } 
//       // B. Current box is EMPTY and not the first box: Clear the previous box and move focus back.
//       else if (index > 0) {
//         newOtp[index - 1] = ""; // Clear the previous box
//         setOtp(newOtp);
//         
//         // Move focus to the previous box (which is now empty)
//         inputRefs.current[index - 1]?.focus();
//         return;
//       }
//     }
//     
//     // 2. Digit/Overwrite Logic: (Mostly handled by the fact that only the current box is editable)
//     if (e.key >= '0' && e.key <= '9') {
//       // If the box is already filled (which shouldn't happen unless all boxes are filled)
//       if (otp[index] !== "") {
//         e.preventDefault(); 
//         // Manually call change handler to ensure state update and focus move
//         handleChange(e.currentTarget, index, e.key);
//         return;
//       }
//     }
//     
//     // 3. Block all keys except digits (0-9), Tab, Enter, and Backspace/Navigation.
//     if (!/^\d$|^Tab$|^Enter$|^ArrowLeft$|^ArrowRight$|^Delete$|^Backspace$/.test(e.key)) {
//       e.preventDefault();
//     }

//     // 4. Navigation (Optional but good UX)
//     if (e.key === "ArrowLeft" && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     } else if (e.key === "ArrowRight" && index < otp.length - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   // Confirm OTP handler
//   const handleConfirm = (e: FormEvent) => {
//     e.preventDefault();
//     if (!isOtpValid) return;

//     setLoading(true);
//     const fullOtp = otp.join("");

//     setTimeout(() => {
//       setLoading(false);
//       // Mock validation for demonstration
//       if (fullOtp === "123456" || fullOtp === "000000") {
//         onOtpConfirm(fullOtp);
//       } else {
//         ToasterUtils.error("Invalid OTP. Please try again.");
//         setOtp(new Array(6).fill(""));
//         // Focus will automatically shift due to useEffect on state change
//       }
//     }, 1500);
//   };

//   // Resend OTP handler
//   const handleResendOtp = () => {
//     if (resendTimer === 0) {
//       ToasterUtils.info("New OTP sent!");
//       setResendTimer(30);
//       setOtp(new Array(6).fill(""));
//       // Focus will automatically shift due to useEffect on state change
//     }
//   };

//   // Format resend timer
//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

//   return (
//     <div className="flex flex-col p-6 lg:p-0 animate__animated animate__slideInRight faster-slideInRight ">
//       {/* Header */}
//       <div className="flex items-center pb-6">
//         <button
//           onClick={onCancel}
//           className="p-1 mr-4 text-gray-500 transition duration-150 hover:text-gray-700"
//           aria-label={flowType === "signin" ? "Back to Sign In" : "Back to Forgot Password"}
//         >
//           <Icon name="bx bx-arrow-back" size={24} />
//         </button>
//         <h2 className="text-2xl font-semibold text-gray-700">Enter OTP</h2>
//       </div>

//       {/* Info Text */}
//       <p className="mb-6 text-gray-700 text-md">
//         Enter the 6-digit OTP sent to{" "}
//         {flowType === "signin" ? "your phone number" : "the specified contact"}{" "}
//         <span className="font-semibold text-gray-900">{phoneNumber}</span>
//       </p>

//       {/* OTP Input Form */}
//       <form onSubmit={handleConfirm} className="space-y-10">
//         <div className="flex justify-between space-x-2">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               ref={(el) => (inputRefs.current[index] = el)}
//               type="text"
//               maxLength={1}
//               inputMode="numeric"
//               pattern="[0-9]"
//               value={digit}
//               
//               // Logic: Only the 'first empty box' is enabled. If all are filled, only the last box is enabled.
//               disabled={index !== firstEmptyIndex}

//               autoFocus={index === 0} // Kept for initial focus on mount
//               
//               onChange={(e) => handleChange(e.currentTarget, index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               className="w-12 h-12 text-xl text-center text-gray-600 border-2 border-gray-300 shadow-md rounded-xl focus:outline-none focus:border-gray-400 focus:border-4 disabled:bg-gray-50 disabled:cursor-not-allowed"
//             />
//           ))}
//         </div>

//         {/* Resend Timer */}
//         <div className="flex items-center justify-between text-sm">
//           {resendTimer > 0 ? (
//             <p className="font-medium text-gray-500">
//               Send OTP after {formatTime(resendTimer)}
//             </p>
//           ) : (
//             <button
//               type="button"
//               className="font-medium text-indigo-600 hover:text-indigo-500"
//               onClick={handleResendOtp}
//             >
//               Resend OTP
//             </button>
//           )}
//         </div>

//         {/* Confirm Button */}
//         <div className="flex justify-center pt-4">
//           <button
//             type="submit"
//             disabled={!isOtpValid || loading}
//             className={`relative flex items-center justify-center font-medium shadow-md
//               ${!isOtpValid || loading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white"}
//               ${loading ? "w-12 h-12 rounded-full bg-gray-900 " : "w-full h-12 rounded-xl"}
//             `}
//           >
//             {loading ? (
//               <svg
//                 className="absolute w-8 h-8 text-white animate-spin"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-100"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="white"
//                   strokeWidth="3"
//                   strokeLinecap="round"
//                   strokeDasharray="31.4"
//                   strokeDashoffset="0"
//                 />
//               </svg>
//             ) : (
//               "Confirm"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default OtpScreen;








































import React, { useState, useEffect, useRef, type FormEvent } from "react";
import { ToasterUtils } from "../ui/toast";
import Icon from "../ui/Icon";

export interface OtpScreenProps {
  onOtpConfirm: (otp: string) => Promise<void> | void; // parent API call
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
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const isOtpValid = otp.every((digit) => digit.length === 1);

  // Find first empty index
  const getFirstEmptyIndex = () => {
    const emptyIndex = otp.findIndex((v) => v === "");
    return emptyIndex === -1 ? otp.length - 1 : emptyIndex;
  };
  const firstEmptyIndex = getFirstEmptyIndex();

  // Timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const id = setInterval(() => setResendTimer((t) => t - 1), 1000);
      return () => clearInterval(id);
    }
  }, [resendTimer]);

  // Auto focus first empty input
  useEffect(() => {
    inputRefs.current[firstEmptyIndex]?.focus();
  }, [firstEmptyIndex, otp]);

  // Handle input change
  const handleChange = (el: HTMLInputElement, index: number, value: string) => {
    // Handle paste (multi-character)
    if (value.length > 1) {
      const pasted = value.slice(0, otp.length).split("");
      if (pasted.every((c) => /^\d$/.test(c))) {
        setOtp(pasted.concat(new Array(otp.length - pasted.length).fill("")));
      }
      return;
    }

    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle keyboard
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
      return;
    }

    if (e.key >= "0" && e.key <= "9") {
      if (otp[index] !== "") {
        e.preventDefault();
        handleChange(e.currentTarget, index, e.key);
      }
    }

    if (!/^\d$|^Tab$|^Enter$|^ArrowLeft$|^ArrowRight$|^Delete$|^Backspace$/.test(e.key)) {
      e.preventDefault();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Confirm OTP
  const handleConfirm = async (e: FormEvent) => {
    e.preventDefault();
    if (!isOtpValid) {
      ToasterUtils.error("Please enter complete 6-digit OTP.");
      return;
    }

    setLoading(true);
    const fullOtp = otp.join("");

    try {
      await onOtpConfirm(fullOtp); // parent API call (SignInForm)
    } catch (err: any) {
      console.error("OTP Confirm Error:", err);
      ToasterUtils.error(err?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = () => {
    if (resendTimer === 0) {
      ToasterUtils.info("A new OTP has been sent!");
      setOtp(new Array(6).fill(""));
      setResendTimer(30);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="flex flex-col p-6 lg:p-0 animate__animated animate__slideInRight faster-slideInRight">
      {/* Header */}
      <div className="flex items-center pb-6">
        <button
          onClick={onCancel}
          className="p-1 mr-4 text-gray-500 transition duration-150 hover:text-gray-700"
          aria-label={flowType === "signin" ? "Back to Sign In" : "Back to Forgot Password"}
        >
          <Icon name="bx bx-arrow-back" size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-700">Enter OTP</h2>
      </div>

      {/* Info */}
      <p className="mb-6 text-gray-700 text-md">
        Enter the 6-digit OTP sent to{" "}
        {flowType === "signin" ? "your phone number" : "your registered email"}{" "}
        <span className="font-semibold text-gray-900">{phoneNumber}</span>
      </p>

      {/* OTP Form */}
      <form onSubmit={handleConfirm} className="space-y-10">
        <div className="flex justify-between space-x-2">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              maxLength={1}
              inputMode="numeric"
              pattern="[0-9]"
              value={digit}
              disabled={i !== firstEmptyIndex}
              onChange={(e) => handleChange(e.currentTarget, i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-12 h-12 text-xl text-center text-gray-600 border-2 border-gray-300 shadow-md rounded-xl focus:outline-none focus:border-gray-400 focus:border-4 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          ))}
        </div>

        {/* Resend timer */}
        <div className="flex items-center justify-between text-sm">
          {resendTimer > 0 ? (
            <p className="font-medium text-gray-500">
              Send OTP after {formatTime(resendTimer)}
            </p>
          ) : (
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Confirm */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={!isOtpValid || loading}
            className={`relative flex items-center justify-center font-medium shadow-md
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
