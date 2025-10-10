import React, { useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";
import Checkbox from "../../components/Common/Checkbox";
import hero from "../../assets/hero-img-1.png";
import InputField from "../../components/Common/inputField";
import { ToasterUtils } from "../../components/ui/toast";

import hero2 from "../../assets/hero-img-4.png";
import hero3 from "../../assets/hero-img-3.webp";
import hero4 from "../../assets/hero-img-4.png";
import Icon from "../../components/ui/Icon";

interface SignInFormData {
  email: string;
  password: string;
}

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface OtpScreenProps {
  onOtpConfirm: (otp: string) => void;
  onCancel: () => void;
  phoneNumber: string;
}

const OtpScreen: React.FC<OtpScreenProps> = ({
  onOtpConfirm,
  onCancel,
  phoneNumber,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const isOtpValid = otp.every((digit) => digit.length === 1);

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

      const allFilled = newOtp.every((v) => v !== "");

      if (allFilled && value !== "") {
        newOtp[newOtp.length - 1] = value;
        setOtp(newOtp);
        inputRefs.current[newOtp.length - 1]?.focus();
        return;
      }

      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };


  const handleFocus = (index: number) => {
    const lastFilledIndex = [...otp].reverse().findIndex(val => val !== "");
    const actualIndex = lastFilledIndex === -1 ? 0 : otp.length - 1 - lastFilledIndex;

    inputRefs.current[actualIndex]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const lastFilledIndex = [...otp].reverse().findIndex(val => val !== "");

      if (lastFilledIndex !== -1) {
        const actualIndex = otp.length - 1 - lastFilledIndex;
        const newOtp = [...otp];
        newOtp[actualIndex] = "";
        setOtp(newOtp);

        if (actualIndex > 0) {
          inputRefs.current[actualIndex - 1]?.focus();
        } else {
          inputRefs.current[actualIndex]?.focus();
        }
      } else if (index > 0) {
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
      if (fullOtp === "123456" || fullOtp === "000000") {
        onOtpConfirm(fullOtp);
      } else {
        ToasterUtils.error("Invalid OTP. Please try again.");
        setOtp(new Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      ToasterUtils.info("New OTP sent!");
      setResendTimer(30);
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
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
          aria-label="Back to Sign In"
        >
          <Icon name="bx bx-arrow-back" size={24} />

        </button>
        <h2 className="text-2xl font-semibold text-gray-700">Enter OTP</h2>
      </div>

      <p className="mb-6 text-md gray-700 text-">
        Enter the 6-digit OTP sent to your phone number{" "}
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
              autoFocus={index === 0}
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
                : "bg-primary text-white hover:bg-primary/90"
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

const carouselSlides = [
  {
    img: hero,
    title: "Welcome to Our Dashboard",
    description: "Manage your ecommerce store and track performance.",
  },
  {
    img: hero2,
    title: "Empower Your Business",
    description: "Get insights, analytics, and reports all in one place.",
  },
  {
    img: hero3,
    title: "Streamline Your Workflow",
    description: "Boost productivity with smart automation and tools.",
  },
  {
    img: hero4,
    title: "Experience Innovation",
    description: "Unlock the power of AI-driven insights and seamless.",
  },
];

const SignInForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [animateSlide, setAnimateSlide] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"down" | "up">("down");
  const [signInData, setSignInData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  const isSignInValid =
    signInData.email.trim() !== "" && signInData.password.trim() !== "";
  const isSignUpValid =
    signUpData.name.trim() !== "" &&
    signUpData.email.trim() !== "" &&
    signUpData.password.trim() !== "";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/ecommerce", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSignInChange = (name: keyof SignInFormData, value: string) => {
    setSignInData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (name: keyof SignUpFormData, value: string) => {
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setSlideDirection(slideDirection === "down" ? "up" : "down");
    setAnimateSlide(true);
    setIsSignUp(!isSignUp);
    setShowOtpScreen(false);

    setTimeout(() => setAnimateSlide(false), 500);
  };

  const handleDotClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      if (!isSignUpValid) return;

      setLoading(true);
      const toastId = ToasterUtils.loading("Creating account...");
      setTimeout(() => {
        setLoading(false);
        ToasterUtils.dismiss(toastId);
        ToasterUtils.success("Account created! Please sign in.");
        handleToggle();
      }, 500);
      return;
    }

    if (!isSignInValid) return;

    setLoading(true);
    const toastId = ToasterUtils.loading("Verifying credentials...");

    setTimeout(() => {
      setLoading(false);
      ToasterUtils.dismiss(toastId);
      setShowOtpScreen(true);
      ToasterUtils.success("Credentials verified. Please enter OTP.");
    }, 500);
  };

  const handleOtpConfirm = (otpValue: string) => {
    login("mocked_token_12345");
    navigate("/ecommerce", { replace: true });
  };

  const handleCancelOtp = () => {
    setShowOtpScreen(false);
    setLoading(false);
  };

  const mockedPhoneNumber = "xxxxxx8110";

  return (
    <div className="flex flex-col h-screen lg:flex-row">
      {/* LEFT SECTION — Carousel (Desktop only) (Unchanged) */}
      <div className="hidden lg:flex w-[60%] relative bg-gradient-to-br from-[#00AD7D] via-[#0A5C4F] text-white">
        <div className="relative sticky top-0 w-full h-screen overflow-hidden">
          <div className="relative w-full h-full">
            {carouselSlides.map((slide, index) => (
              <img
                key={index}
                src={slide.img}
                alt={`Slide ${index + 1}`}
                className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === activeImageIndex ? "opacity-100" : "opacity-0"
                  }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00AD7D]/10 via-[#1F1F1F]/20 to-[#000000]/10"></div>
          </div>
          <div className="absolute w-full max-w-lg px-4 text-center text-white transform -translate-x-1/2 bottom-10 left-1/2">
            <h1
              key={activeImageIndex + "-title"}
              className="text-4xl font-bold drop-shadow-lg animate__animated animate__backInUp"
              style={{ ["--animate-duration" as any]: "0.8s" }}
            >
              {carouselSlides[activeImageIndex].title}
            </h1>
            <p
              key={activeImageIndex + "-desc"}
              className="mt-2 text-lg drop-shadow-md animate__animated animate__bounceIn"
              style={{ ["--animate-duration" as any]: "1s" }}
            >
              {carouselSlides[activeImageIndex].description}
            </p>
            <div className="flex justify-center mt-6 space-x-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION — Form / OTP Screen (Conditional Rendering) */}
      <div className="flex flex-1 h-screen overflow-y-auto conditional-scrollbar animate__animated animate__zoomIn">
        <div className="w-full h-full mx-auto my-auto sm:h-screen sm:max-h-screen lg:h-auto lg:max-w-md">
          <div className="h-full rotating-neon-wrapper group">
            <div className="h-full transition duration-100 bg-white shadow-xl rotating-neon-card sm:rounded-none lg:rounded-2xl lg:p-6">

              {showOtpScreen ? (
                // --- RENDER OTP SCREEN ---
                <div className="p-8 lg:p-6">
                  <OtpScreen
                    onOtpConfirm={handleOtpConfirm}
                    onCancel={handleCancelOtp}
                    phoneNumber={mockedPhoneNumber}
                  />
                </div>
              ) : (
              <div
  key={isSignUp ? "signup" : "signin"}
  className={
    animateSlide
      ? `animate__animated ${
          isSignUp
            ? slideDirection === "down"
              ? "animate__flipOutYRight"
              : "animate__flipInYRight"
            : slideDirection === "down"
              ? "animate__flipOutYLeft"
              : "animate__flipInYLeft"
        }`
      : ""
  }
  style={{ ["--animate-duration" as any]: "0.8s" }}
>



                  <div className="flex justify-start pl-8 mt-12 lg:mt-3 sm:justify-start md:justify-start lg:justify-start mb-7 md:pl-8 lg:pl-0">
                    <img
                      src="https://dashboard.nerotix.in/storage/logo/logo.svg"
                      alt="Nerotix Logo"
                      className="h-auto duration-500 w-36 drop-shadow-md ransition-transform hover:scale-105"
                    />
                  </div>

                  <h2 className="pl-8 mb-5 text-2xl font-semibold text-gray-700 sm:text-2xl text-start md:pl-8 lg:pl-0">
                    {isSignUp ? "Sign Up" : "Sign In"}
                    <p className="mt-1 text-base tracking-wider text-gray-500 sm:text-lg sm:pl-0 md:pl-0 lg:pl-0">
                      {isSignUp ? "Create your account" : "Welcome Back!"}
                    </p>
                  </h2>

                  {/* Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="px-6 space-y-5 sm:px-10 lg:px-0"
                  >
                    {isSignUp && (
                      <InputField
                        label="Name"
                        type="text"
                        value={signUpData.name}
                        onChange={(val) => handleSignUpChange("name", val)}
                        leftIcon="ri-user-line"
                      />
                    )}

                    <InputField
                      label="Email"
                      type="email"
                      value={isSignUp ? signUpData.email : signInData.email}
                      leftIcon="ri-mail-line"
                      onChange={(val) =>
                        isSignUp
                          ? handleSignUpChange("email", val)
                          : handleSignInChange("email", val)
                      }
                    />

                    <InputField
                      label={isSignUp ? "New Password" : "Password"}
                      type={showPassword ? "text" : "password"}
                      value={
                        isSignUp ? signUpData.password : signInData.password
                      }
                      leftIcon="ri-lock-2-line"
                      onChange={(val) =>
                        isSignUp
                          ? handleSignUpChange("password", val)
                          : handleSignInChange("password", val)
                      }
                    />

                    {!isSignUp && (
                      <div className="flex items-center justify-between">
                        <Checkbox
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                          label="Remember me"
                          size="xs"
                          shape="rounded"
                          checkedColor="bg-primary"
                          uncheckedColor="bg-white"
                          showLabel
                        />
                        <a
                          href="#"
                          className="text-sm font-medium text-indigo-600 underline hover:text-indigo-500"
                        >
                          Forgot password?
                        </a>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center ">
                      <button
                        type="submit"
                        disabled={
                          (isSignUp && !isSignUpValid) ||
                          (!isSignUp && !isSignInValid) ||
                          loading
                        }
                        className={`relative flex items-center justify-center font-medium shadow-md transition-all duration-300 ease-in-out overflow-hidden
                          ${(!isSignUp && !isSignInValid) ||
                            (isSignUp && !isSignUpValid)
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-primary text-white hover:bg-primary/90"
                          }
                          ${loading
                            ? "w-12 h-12 rounded-full"
                            : "w-full h-12 rounded-xl"
                          }
                        `}
                      >
                        {loading && (
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
                        )}
                        {!loading && (
                          <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Toggle Sign In / Up */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-900">
                      {isSignUp
                        ? "Already have an account?"
                        : "Don’t have an account?"}{" "}
                      <button
                        type="button"
                        onClick={handleToggle}
                        className="relative inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {isSignUp ? "Sign In" : "Sign Up"}
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;



















// import React, { useState, useEffect, useRef } from "react";
// import type { FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../components/context/AuthContext";
// import Checkbox from "../../components/Common/Checkbox";
// import hero from "../../assets/hero-img-1.png";
// import InputField from "../../components/Common/inputField";
// import { ToasterUtils } from "../../components/ui/toast";

// import hero2 from "../../assets/hero-img-4.png";
// import hero3 from "../../assets/hero-img-3.webp";
// import hero4 from "../../assets/hero-img-4.png";
// import Icon from "../../components/ui/Icon";

// // --- OtpScreen component (Keeping it as is for context) ---
// interface SignInFormData {
//   email: string;
//   password: string;
// }

// interface SignUpFormData {
//   name: string;
//   email: string;
//   password: string;
// }

// interface OtpScreenProps {
//   onOtpConfirm: (otp: string) => void;
//   onCancel: () => void;
//   phoneNumber: string;
// }

// const OtpScreen: React.FC<OtpScreenProps> = ({
//   onOtpConfirm,
//   onCancel,
//   phoneNumber,
// }) => {
//   const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
//   const [loading, setLoading] = useState(false);
//   const [resendTimer, setResendTimer] = useState(30);
//   const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

//   const isOtpValid = otp.every((digit) => digit.length === 1);

//   useEffect(() => {
//     if (resendTimer > 0) {
//       const timerId = setInterval(() => {
//         setResendTimer((prevTime) => prevTime - 1);
//       }, 1000);
//       return () => clearInterval(timerId);
//     }
//   }, [resendTimer]);

//   const handleChange = (
//     element: HTMLInputElement,
//     index: number,
//     value: string
//   ) => {
//     if (/^\d?$/.test(value)) {
//       const newOtp = [...otp];

//       const allFilled = newOtp.every((v) => v !== "");

//       if (allFilled && value !== "") {
//         newOtp[newOtp.length - 1] = value;
//         setOtp(newOtp);
//         inputRefs.current[newOtp.length - 1]?.focus();
//         return;
//       }

//       newOtp[index] = value;
//       setOtp(newOtp);

//       if (value !== "" && index < otp.length - 1) {
//         inputRefs.current[index + 1]?.focus();
//       }
//     }
//   };


//   const handleFocus = (index: number) => {
//     const lastFilledIndex = [...otp].reverse().findIndex(val => val !== "");
//     const actualIndex = lastFilledIndex === -1 ? 0 : otp.length - 1 - lastFilledIndex;

//     inputRefs.current[actualIndex]?.focus();
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//     if (e.key === "Backspace") {
//       e.preventDefault();

//       const lastFilledIndex = [...otp].reverse().findIndex(val => val !== "");

//       if (lastFilledIndex !== -1) {
//         const actualIndex = otp.length - 1 - lastFilledIndex;
//         const newOtp = [...otp];
//         newOtp[actualIndex] = "";
//         setOtp(newOtp);

//         if (actualIndex > 0) {
//           inputRefs.current[actualIndex - 1]?.focus();
//         } else {
//           inputRefs.current[actualIndex]?.focus();
//         }
//       } else if (index > 0) {
//         inputRefs.current[index - 1]?.focus();
//       }
//     }

//     if (e.key === 'ArrowRight' && index < otp.length - 1) {
//       inputRefs.current[index + 1]?.focus();
//     } else if (e.key === 'ArrowLeft' && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleConfirm = (e: FormEvent) => {
//     e.preventDefault();
//     if (!isOtpValid) return;

//     setLoading(true);
//     const fullOtp = otp.join("");

//     const toastId = ToasterUtils.loading("Verifying OTP...");
//     setTimeout(() => {
//       setLoading(false);
//       ToasterUtils.dismiss(toastId);
//       if (fullOtp === "123456" || fullOtp === "000000") {
//         onOtpConfirm(fullOtp);
//       } else {
//         ToasterUtils.error("Invalid OTP. Please try again.");
//         setOtp(new Array(6).fill(""));
//         inputRefs.current[0]?.focus();
//       }
//     }, 1500);
//   };

//   const handleResendOtp = () => {
//     if (resendTimer === 0) {
//       ToasterUtils.info("New OTP sent!");
//       setResendTimer(30);
//       setOtp(new Array(6).fill(""));
//       inputRefs.current[0]?.focus();
//     }
//   };

//   // Format the time as 0:XX
//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//   };

//   return (
//     <div className="flex flex-col p-6 lg:p-0">
//       <div className="flex items-center pb-6">
//         <button
//           onClick={onCancel}
//           className="p-1 mr-4 text-gray-500 transition duration-150 hover:text-gray-700"
//           aria-label="Back to Sign In"
//         >
//           <Icon name="bx bx-arrow-back" size={24} />

//         </button>
//         <h2 className="text-2xl font-semibold text-gray-700">Enter OTP</h2>
//         </div>

//       <p className="mb-6 text-md gray-700 text-">
//         Enter the 6-digit OTP sent to your phone number{" "}
//         <span className="font-semibold text-gray-900">{phoneNumber}</span>
//       </p>

//       <form onSubmit={handleConfirm} className="space-y-10">
//         {/* OTP Input Boxes (w-12 h-12 for equal size) */}
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
//               autoFocus={index === 0}
//               onChange={(e) => handleChange(e.currentTarget, index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               className="w-12 h-12 text-xl text-center transition duration-150 border-2 border-gray-300 shadow-md rounded-xl focus:outline-none focus:border-gray-300 focus:border-4"
//             />
//           ))}
//         </div>

//         <div className="flex items-center justify-between text-sm">
//           {resendTimer > 0 ? (
//             <p className="font-medium text-gray-500 transition duration-150">
//               Send OTP after {formatTime(resendTimer)}
//             </p>
//           ) : (
//             <button
//               type="button"
//               className="font-medium text-indigo-600 transition duration-150 hover:text-indigo-500"
//               onClick={handleResendOtp}
//             >
//               Resend OTP
//             </button>
//           )}

//           
//         </div>

//         {/* Action Buttons (Only Confirm button remains) */}
//         <div className="flex justify-end pt-4 space-x-4">
//           <button
//             type="submit"
//             disabled={!isOtpValid || loading}
//             className={`px-6 py-2 rounded-lg font-medium transition duration-300 ease-in-out shadow-md
//               ${!isOtpValid || loading
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-primary text-white hover:bg-primary/90"
//               }
//             `}
//           >
//             {loading ? (
//               <svg
//                 className="w-5 h-5 text-white animate-spin"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
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

// // --- Carousel Data (Keeping it as is for context) ---
// const carouselSlides = [
//   {
//     img: hero,
//     title: "Welcome to Our Dashboard",
//     description: "Manage your ecommerce store and track performance.",
//   },
//   {
//     img: hero2,
//     title: "Empower Your Business",
//     description: "Get insights, analytics, and reports all in one place.",
//   },
//   {
//     img: hero3,
//     title: "Streamline Your Workflow",
//     description: "Boost productivity with smart automation and tools.",
//   },
//   {
//     img: hero4,
//     title: "Experience Innovation",
//     description: "Unlock the power of AI-driven insights and seamless.",
//   },
// ];

// // --- SignInForm Component (Refactored for Flip Effect) ---
// const SignInForm: React.FC = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   // **MODIFIED STATE:** Tracks the current rotation for the flip effect
//   // A positive rotation (0, 180, 360...) for Sign Up flips
//   // A negative rotation (180, 0, -180...) for Sign In flips
//   const [rotation, setRotation] = useState(0); 
//   
//   const [signInData, setSignInData] = useState<SignInFormData>({
//     email: "",
//     password: "",
//   });
//   const [signUpData, setSignUpData] = useState<SignUpFormData>({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [showOtpScreen, setShowOtpScreen] = useState(false);

//   const navigate = useNavigate();
//   const { isAuthenticated, login } = useAuth();

//   const isSignInValid =
//     signInData.email.trim() !== "" && signInData.password.trim() !== "";
//   const isSignUpValid =
//     signUpData.name.trim() !== "" &&
//     signUpData.email.trim() !== "" &&
//     signUpData.password.trim() !== "";

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/ecommerce", { replace: true });
//     }
//   }, [isAuthenticated, navigate]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveImageIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSignInChange = (name: keyof SignInFormData, value: string) => {
//     setSignInData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignUpChange = (name: keyof SignUpFormData, value: string) => {
//     setSignUpData((prev) => ({ ...prev, [name]: value }));
//   };

//   // **MODIFIED: Now forces forward rotation for Sign Up, and reverse for Sign In.**
//   const handleToggle = () => {
//     const nextIsSignUp = !isSignUp;

//     setRotation(prevRotation => {
//       if (nextIsSignUp) {
//         // Moving to Sign Up (Forward Flip): Find the nearest 'odd' multiple of 180 (180, 540, 900, ...)
//         // e.g., if prevRotation is 0, next is 180. If prev is 360, next is 540.
//         // This ensures a consistent clockwise flip for Sign Up.
//         return prevRotation + 180;
//       } else {
//         // Moving to Sign In (Reverse Flip): Find the nearest 'even' multiple of 180 (0, 360, 720, ...)
//         // This ensures a consistent counter-clockwise flip for Sign In.
//         return prevRotation - 180;
//       }
//     });
//     
//     // Toggle the form state immediately for the content change
//     setIsSignUp(nextIsSignUp); 
//     setShowOtpScreen(false);
//   };

//   const handleDotClick = (index: number) => {
//     setActiveImageIndex(index);
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();

//     if (isSignUp) {
//       if (!isSignUpValid) return;

//       setLoading(true);
//       const toastId = ToasterUtils.loading("Creating account...");
//       setTimeout(() => {
//         setLoading(false);
//         ToasterUtils.dismiss(toastId);
//         ToasterUtils.success("Account created! Please sign in.");
//         
//         // After successful sign-up, flip back to sign-in
//         handleToggle();
//       }, 500);
//       return;
//     }

//     if (!isSignInValid) return;

//     setLoading(true);
//     const toastId = ToasterUtils.loading("Verifying credentials...");

//     setTimeout(() => {
//       setLoading(false);
//       ToasterUtils.dismiss(toastId);
//       setShowOtpScreen(true);
//       ToasterUtils.success("Credentials verified. Please enter OTP.");
//     }, 500);
//   };

//   const handleOtpConfirm = (otpValue: string) => {
//     login("mocked_token_12345");
//     navigate("/ecommerce", { replace: true });
//   };

//   const handleCancelOtp = () => {
//     setShowOtpScreen(false);
//     setLoading(false);
//   };

//   const mockedPhoneNumber = "xxxxxx8110";

//   return (
//     <div className="flex flex-col h-screen lg:flex-row">
//       {/* LEFT SECTION — Carousel (Desktop only) (Unchanged) */}
//       <div className="hidden lg:flex w-[60%] relative bg-gradient-to-br from-[#00AD7D] via-[#0A5C4F] text-white">
//         <div className="relative sticky top-0 w-full h-screen overflow-hidden">
//           <div className="relative w-full h-full">
//             {carouselSlides.map((slide, index) => (
//               <img
//                 key={index}
//                 src={slide.img}
//                 alt={`Slide ${index + 1}`}
//                 className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === activeImageIndex ? "opacity-100" : "opacity-0"
//                   }`}
//               />
//             ))}
//             <div className="absolute inset-0 bg-gradient-to-br from-[#00AD7D]/10 via-[#1F1F1F]/20 to-[#000000]/10"></div>
//           </div>
//           <div className="absolute w-full max-w-lg px-4 text-center text-white transform -translate-x-1/2 bottom-10 left-1/2">
//             <h1
//               key={activeImageIndex + "-title"}
//               className="text-4xl font-bold drop-shadow-lg animate__animated animate__backInUp"
//               style={{ ["--animate-duration" as any]: "0.8s" }}
//             >
//               {carouselSlides[activeImageIndex].title}
//             </h1>
//             <p
//               key={activeImageIndex + "-desc"}
//               className="mt-2 text-lg drop-shadow-md animate__animated animate__bounceIn"
//               style={{ ["--animate-duration" as any]: "1s" }}
//             >
//               {carouselSlides[activeImageIndex].description}
//             </p>
//             <div className="flex justify-center mt-6 space-x-2">
//               {carouselSlides.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleDotClick(index)}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
//                     }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>



//       {/* RIGHT SECTION — Form / OTP Screen (Conditional Rendering) */}
// <div className="flex flex-1 h-screen overflow-y-auto conditional-scrollbar animate__animated animate__zoomIn">
//   <div className="w-full h-full mx-auto my-auto sm:h-screen sm:max-h-screen lg:h-auto lg:max-w-md">
//     {/* Card Wrapper for Flip effect */}
//     <div 
//       className="relative h-full rotating-neon-wrapper"
//       style={{ perspective: '1000px' }} // 3D perspective
//     >
//       {/* Rotating card */}
//       <div 
//         className="h-full transition-transform duration-700 bg-white shadow-xl rotating-neon-card sm:rounded-none lg:rounded-2xl lg:p-6"
//         style={{
//           transform: `rotateY(${rotation}deg)`,
//           transformStyle: 'preserve-3d',
//         }}
//       >
//         {/* Inner content counter-rotated - CHANGED CLASS HERE */}
//         <div
//           className="w-full h-full bg-white backface-hidden" // MODIFIED: Removed conditional pink background. Now always white.
//           style={{ transform: `rotateY(${-rotation}deg)` }}
//         >
//           {showOtpScreen ? (
//             <div className="p-8 lg:p-6">
//               <OtpScreen
//                 onOtpConfirm={handleOtpConfirm}
//                 onCancel={handleCancelOtp}
//                 phoneNumber={mockedPhoneNumber}
//               />
//             </div>
//           ) : (
//             <div className="p-8 lg:p-6">
//               {/* Logo */}
//               <div className="flex justify-start pl-8 mt-12 lg:mt-3 mb-7 md:pl-0">
//                 <img
//                   src="https://dashboard.nerotix.in/storage/logo/logo.svg"
//                   alt="Nerotix Logo"
//                   className="h-auto transition-transform w-36 drop-shadow-md hover:scale-105"
//                 />
//               </div>

//               {/* Header */}
//               <h2 className="pl-8 mb-5 text-2xl font-semibold text-gray-700 sm:text-2xl md:pl-0">
//                 {isSignUp ? "Sign Up" : "Sign In"}
//                 <p className="mt-1 text-base tracking-wider text-gray-500 sm:text-lg">
//                   {isSignUp ? "Create your account" : "Welcome Back!"}
//                 </p>
//               </h2>

//               {/* Form */}
//               <form onSubmit={handleSubmit} className="px-6 space-y-5 sm:px-10 lg:px-0">
//                 {isSignUp && (
//                   <InputField
//                     label="Name"
//                     type="text"
//                     value={signUpData.name}
//                     onChange={(val) => handleSignUpChange("name", val)}
//                     leftIcon="ri-user-line"
//                   />
//                 )}

//                 <InputField
//                   label="Email"
//                   type="email"
//                   value={isSignUp ? signUpData.email : signInData.email}
//                   leftIcon="ri-mail-line"
//                   onChange={(val) =>
//                     isSignUp
//                       ? handleSignUpChange("email", val)
//                       : handleSignInChange("email", val)
//                   }
//                 />

//                 <InputField
//                   label={isSignUp ? "New Password" : "Password"}
//                   type={showPassword ? "text" : "password"}
//                   value={isSignUp ? signUpData.password : signInData.password}
//                   leftIcon="ri-lock-2-line"
//                   onChange={(val) =>
//                     isSignUp
//                       ? handleSignUpChange("password", val)
//                       : handleSignInChange("password", val)
//                   }
//                 />

//                 {!isSignUp && (
//                   <div className="flex items-center justify-between">
//                     <Checkbox
//                       checked={rememberMe}
//                       onChange={() => setRememberMe(!rememberMe)}
//                       label="Remember me"
//                       size="xs"
//                       shape="rounded"
//                       checkedColor="bg-primary"
//                       uncheckedColor="bg-white"
//                       showLabel
//                     />
//                     <a
//                       href="#"
//                       className="text-sm font-medium text-indigo-600 underline hover:text-indigo-500"
//                     >
//                       Forgot password?
//                     </a>
//                   </div>
//                 )}

//                 {/* Submit Button */}
//                 <div className="flex justify-center">
//                   <button
//                     type="submit"
//                     disabled={
//                       (isSignUp && !isSignUpValid) ||
//                       (!isSignUp && !isSignInValid) ||
//                       loading
//                     }
//                     className={`relative flex items-center justify-center font-medium shadow-md transition-all duration-300 ease-in-out overflow-hidden
//                       ${(!isSignUp && !isSignInValid) ||
//                       (isSignUp && !isSignUpValid)
//                         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                         : "bg-primary text-white hover:bg-primary/90"
//                       }
//                       ${loading
//                         ? "w-12 h-12 rounded-full"
//                         : "w-full h-12 rounded-xl"
//                       }
//                     `}
//                   >
//                     {loading && (
//                       <svg
//                         className="absolute w-8 h-8 text-white animate-spin"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-100"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="white"
//                           strokeWidth="3"
//                           strokeLinecap="round"
//                           strokeDasharray="31.4"
//                           strokeDashoffset="0"
//                         />
//                       </svg>
//                     )}
//                     {!loading && (
//                       <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
//                     )}
//                   </button>
//                 </div>
//               </form>

//               {/* Toggle Sign In / Up */}
//               <div className="mt-6 text-center">
//                 <p className="text-sm text-gray-900">
//                   {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
//                   <button
//                     type="button"
//                     onClick={handleToggle}
//                     className="relative inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500"
//                   >
//                     {isSignUp ? "Sign In" : "Sign Up"}
//                   </button>
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>

// </div>
//     </div>
//   );
// };

// export default SignInForm;