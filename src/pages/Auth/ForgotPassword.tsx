// src/components/Common/ForgotPassword.tsx

// import React, { useState, type FormEvent } from "react";
// // Adjust these imports based on your project structure
// import { ToasterUtils } from "../../components/ui/toast";
// import Icon from "../../components/ui/Icon";
// import InputField from "../../components/Common/inputField"; 

// // --- INTERFACE ---

// export interface ForgotPasswordProps {
//   onOtpRequest: (contact: string) => void;
//   onCancel: () => void;
//   setLoading: (isLoading: boolean) => void;

//   loading: boolean;

// }

// // --- FORGOT PASSWORD COMPONENT ---

// const ForgotPassword: React.FC<ForgotPasswordProps> = ({
//   onOtpRequest,
//   onCancel,
//   setLoading,
//   loading
// }) => {
//   const [data, setData] = useState({
//     email: "",
//     mobile: "",
//   });

//   // Check if at least one field is filled
//   const isProcessValid = data.email.trim() !== "" || data.mobile.trim() !== "";

//   const handleChange = (name: 'email' | 'mobile', value: string) => {
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (!isProcessValid) return;

//     setLoading(true);
//     const toastId = ToasterUtils.loading("Processing request and sending OTP...");

//     // Determine the contact used for verification
//     const contact = data.email.trim() || data.mobile.trim();
//     
//     // Simulate API call delay
//     setTimeout(() => {
//       setLoading(false);
//       ToasterUtils.dismiss(toastId);
//       
//       onOtpRequest(contact); 
//       ToasterUtils.success(`OTP sent to ${contact}.`);
//     }, 1500);
//   };

//   return (
//     <div className="flex flex-col p-6 lg:p-0 animate__animated animate__slideInRight faster-slideInRight ">
//       <div className="flex items-center pb-6">
//         <button
//           onClick={onCancel}
//           className="p-1 mr-4 text-gray-500 transition duration-150 hover:text-gray-700"
//           aria-label="Back to Sign In"
//         >
//           <Icon name="bx bx-arrow-back" size={24} />
//         </button>
//         <h2 className="text-2xl font-semibold text-gray-700">Forgot Password</h2>
//       </div>
//       
//       <p className="mb-6 text-gray-500 text-md gray-700">
//         Enter your email or mobile number to receive a verification code.
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <InputField
//           label="Email"
//           type="email"
//           value={data.email}
//           onChange={(val) => handleChange("email", val)}
//           leftIcon="ri-mail-line"
//         />

//         <div className="relative flex items-center my-4">
//           <div className="flex-grow border-t border-gray-300"></div>
//           <span className="mx-3 text-sm text-gray-500">or</span>
//           <div className="flex-grow border-t border-gray-300"></div>
//         </div>

//         <InputField
//           label="Mobile Number"
//           type="tel"
//           value={data.mobile}
//           onChange={(val) => handleChange("mobile", val)}
//           leftIcon="bx bx-mobile"
//           inputMode="numeric"
//         />

//         <div className="flex justify-center pt-4">
//           <button
//             type="submit"
//             disabled={!isProcessValid || loading}
//             className={`relative flex items-center justify-center font-medium shadow-md transition-all duration-300 ease-in-out overflow-hidden
//               ${!isProcessValid || loading
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-black text-white "
//               }
//               ${loading
//                 ? "w-12 h-12 rounded-full bg-gray-900 " // Shrink to circle when loading
//                 : "w-full h-12 rounded-xl " // Full width when not loading
//               }
//             `}
//           >
//             {loading ? (
//               // Loading spinner SVG (Updated to match the aesthetic of SignInForm.tsx)
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
//               "Send OTP"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;




























import React, { useState, type FormEvent } from "react";
import { ToasterUtils } from "../../components/ui/toast";
import Icon from "../../components/ui/Icon";
import InputField from "../../components/Common/inputField";
import { useForgotPasswordMutation } from "../../features/auth/authApi";

// --- REVISED SelectField Component with better Tailwind UI ---
interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  leftIcon?: string;
}

// **This is the improved SelectField component**
const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  leftIcon = "bx:chevron-down", 
}) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      {/* Left Icon for the Select Field */}
      {leftIcon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon name={leftIcon} size={20} className="text-gray-400" />
        </span>
      )}
      
      {/* The actual select element */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none focus:ring-2 focus:ring-black focus:border-black transition duration-150 ease-in-out text-gray-700 bg-white shadow-sm
          ${leftIcon ? 'pl-10 pr-10' : 'pl-4 pr-10'}
        `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow icon (to hide the default browser arrow) */}
      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <Icon name="bx bx-chevron-down" size={24} className="text-gray-400" />
      </span>
    </div>
  </div>
);
// --- End of REVISED SelectField Component ---

export interface ForgotPasswordProps {
  onOtpRequest: (contact: string) => void;
  onCancel: () => void;
  setLoading: (isLoading: boolean) => void;
  loading: boolean;
}

type ContactMethod = "email" | "mobile";

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onOtpRequest,
  onCancel,
  setLoading,
  loading,
}) => {
  const [method, setMethod] = useState<ContactMethod>("email");
  const [contactValue, setContactValue] = useState("");
  const [forgotPasswordApi] = useForgotPasswordMutation();

  const isProcessValid = contactValue.trim() !== "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isProcessValid) return;

    setLoading(true);
    const toastId = ToasterUtils.loading("Processing request and sending OTP...");

    const body =
      method === "email"
        ? { email: contactValue.trim() }
        : { mobile_no: contactValue.trim() }; 

    try {
      const res = await forgotPasswordApi(body).unwrap();
      ToasterUtils.dismiss(toastId);

      if (res.success) {
        const masked = res.data.email || res.data.mobile_no || contactValue;
        ToasterUtils.success(res.message || `OTP sent to ${masked}`);
        onOtpRequest(masked);
      } else {
        ToasterUtils.error(res.message || "Unable to send OTP. Try again.");
      }
    } catch (err: any) {
      ToasterUtils.dismiss(toastId);
      const msg = err?.data?.message || "Something went wrong while sending OTP.";
      ToasterUtils.error(msg);
    } finally {
      setLoading(false);
    }
  };
  
  const methodOptions = [
    { label: "Email Address", value: "email" },
    { label: "Mobile Number", value: "mobile" },
  ];

  const inputLabel = method === "email" ? "Email" : "Mobile Number";
  const inputType = method === "email" ? "email" : "tel";
  const leftIcon = method === "email" ? "ri-mail-line" : "bx bx-mobile";
  const inputPlaceholder = method === "email" ? "e.g., your@email.com" : "e.g., 9876543210";


  const handleMethodChange = (newMethod: string) => {
    setMethod(newMethod as ContactMethod);
    setContactValue(''); // Clear the input field when the method changes
  };

  return (
    <div className="flex flex-col p-6 lg:p-0 animate__animated animate__slideInRight faster-slideInRight">
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

      <p className="mb-6 text-gray-500 text-md">
        Select a method and enter your contact details to receive a verification code.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Dropdown for selecting recovery method using the improved SelectField */}
        <SelectField
          label="Recovery Method"
          value={method}
          onChange={handleMethodChange}
          options={methodOptions}
          leftIcon="ri-settings-line" // Changed icon for recovery method
        />

        {/* Dynamic Input Field based on the selected method */}
        <InputField
          label={inputLabel}
          type={inputType}
          placeholder={inputPlaceholder}
          value={contactValue}
          onChange={setContactValue} 
          leftIcon={leftIcon}
          inputMode={method === "mobile" ? "numeric" : "text"}
        />

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={!isProcessValid || loading}
            className={`relative flex items-center justify-center font-medium shadow-md transition-all duration-300 ease-in-out overflow-hidden
              ${
                !isProcessValid || loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white"
              }
              ${loading ? "w-12 h-12 rounded-full bg-gray-900" : "w-full h-12 rounded-xl"}`}
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
              "Send OTP"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
