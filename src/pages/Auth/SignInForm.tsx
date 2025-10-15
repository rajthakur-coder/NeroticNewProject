import React, { useState, useEffect } from "react";
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
// 👇 NEW COMMON COMPONENTS IMPORTS
import OtpScreen from "../../components/Common/OtpScreen"; 
import ForgotPassword from "../../pages/Auth/ForgotPassword";
import ResetPassword from "../../pages/Auth/ResetPassword";


// --- INTERFACES ---

interface SignInFormData {
  email: string;
  password: string;
}

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

// --- CAROUSEL SLIDES (UNCHANGED) ---

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


// --- SIGN IN FORM COMPONENT ---

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

  // Tracks which content view is active inside the card
  const [currentView, setCurrentView] = useState<'form' | 'forgot' | 'otp' | 'reset'>('form');
  
  // State to hold the contact (email/mobile) used for OTP generation/display
  const [otpContact, setOtpContact] = useState<string>("");
  // State to track if the current OTP flow is for Sign-in or Forgot Password
  const [otpFlowType, setOtpFlowType] = useState<'signin' | 'forgot'>('signin');


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

  const handleDotClick = (index: number) => {
    setActiveImageIndex(index);
  }

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
    setCurrentView('form'); // Reset view on form toggle
    setOtpFlowType('signin'); // Reset flow type
    setOtpContact(""); // Clear contact on form toggle
    setTimeout(() => setAnimateSlide(false), 500);
  };

  // --- OTP HANDLERS (Used by OtpScreen.tsx) ---
  const handleOtpConfirm = (otpValue: string) => {
    if (otpFlowType === 'signin') {
      // 1. Complete Sign In flow
      login("mocked_token_12345");
      navigate("/ecommerce", { replace: true });
    } else if (otpFlowType === 'forgot') {
      // 2. Advance to Reset Password view
      ToasterUtils.success("OTP verified. Set your new password.");
      setCurrentView('reset');
    }
  };

  const handleCancelOtp = () => {
    if (otpFlowType === 'signin') {
      setCurrentView('form'); // Back to Sign In Form
    } else if (otpFlowType === 'forgot') {
      setCurrentView('forgot'); // Back to Forgot Password Input
      setOtpContact("");
    }
    setLoading(false);
  };
  // --------------------

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

    // Sign In logic
    if (!isSignInValid) return;

    setLoading(true);
    const toastId = ToasterUtils.loading("Verifying credentials...");

    setTimeout(() => {
      setLoading(false);
      ToasterUtils.dismiss(toastId);
      
      // Setup for Sign In OTP
      setOtpFlowType('signin');
      // Mock phone number/email for Sign In flow
      setOtpContact("xxxxxx8110"); 
      setCurrentView('otp');
      // ToasterUtils.info("Credentials verified. Please enter OTP.");
    }, 500);
  };

  // --- HANDLERS FOR FORGOT PASSWORD FLOW (Used by common components) ---
  
  // 1. ForgotPassword.tsx calls this when OTP request is successfully initiated
  const handleOtpRequest = (contact: string) => {
    setOtpFlowType('forgot');
    setOtpContact(contact); 
    setCurrentView('otp'); // Switch to OTP View
    // setLoading is handled inside ForgotPassword.tsx before this is called
  };

  // 2. ForgotPassword.tsx calls this when 'Back' is clicked
  const handleCancelForgotPassword = () => {
    setCurrentView('form'); // Back to Sign In Form
    setOtpContact("");
    setLoading(false);
  }

  // 3. ResetPassword.tsx calls this when new password is successfully saved
  const handlePasswordSave = () => {
    setCurrentView('form'); // Go back to Sign In form
    setIsSignUp(false);
    // Clear sign-in password to force user to use new password
    setSignInData(prev => ({ ...prev, password: "" }));
    setOtpContact("");
    setLoading(false);
  }
  
  // 4. ResetPassword.tsx calls this when 'Back' is clicked
  const handleCancelResetPassword = () => {
      setCurrentView('otp'); // Back to OTP View
      setLoading(false);
  }

  // --- CONDITIONAL CONTENT RENDERER ---
  const renderContent = () => {
    if (currentView === 'otp') {
      return (
        <div className="p-8 lg:p-6">
          {/* Reusable OTP Screen */}
          <OtpScreen
            onOtpConfirm={handleOtpConfirm}
            onCancel={handleCancelOtp}
            phoneNumber={otpContact}
            flowType={otpFlowType}
          />
        </div>
      );
    }

    if (currentView === 'forgot') {
      return (
        <div className="p-8 lg:p-6">
          {/* Reusable Forgot Password Input */}
          <ForgotPassword
            onOtpRequest={handleOtpRequest}
            onCancel={handleCancelForgotPassword}
            setLoading={setLoading}
            loading={loading}
          />
        </div>
      );
    }

    if (currentView === 'reset') {
       return (
        <div className="p-8 lg:p-6">
           {/* Reusable Reset Password */}
          <ResetPassword
            onPasswordSave={handlePasswordSave}
            onCancel={handleCancelResetPassword}
            setLoading={setLoading}
            loading={loading}
          />
        </div>
      );
    }

    // Default: 'form' (Sign In / Sign Up Form)
    return (
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
              <button
                type="button"
                onClick={() => {
                  setCurrentView('forgot'); // Switch to ForgotPassword view
                }}
                className="text-sm font-medium text-indigo-600 underline hover:text-indigo-500"
              >
                Forgot password?
              </button>
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
                  : "bg-black text-white "
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
    );
  };


  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
      {/* LEFT SECTION — Carousel (Desktop only) */}
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

      {/* RIGHT SECTION — Form / Views */}
      <div className="flex flex-1 h-screen overflow-y-auto conditional-scrollbar animate__animated animate__zoomIn">
        <div className="w-full h-full mx-auto my-auto sm:h-screen sm:max-h-screen lg:h-auto lg:max-w-md lg:rounded-3xl">
          <div className="h-full rotating-neon-wrapper ">
<div className="h-full transition-all duration-300 border-2 border-gray-200 rotating-neon-card sm:rounded-none lg:rounded-2xl">

      
  {/* Conditional rendering of form, OTP, forgot, or reset view */}
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;