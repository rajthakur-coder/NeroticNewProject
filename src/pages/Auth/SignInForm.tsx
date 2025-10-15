// // src/pages/Auth/SignInForm.tsx
// import React, { useState, useEffect } from "react";
// import type { FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import Checkbox from "../../components/Common/Checkbox";
// import hero from "../../assets/hero-img-1.png";
// import InputField from "../../components/Common/inputField";
// import { ToasterUtils } from "../../components/ui/toast";
// import hero2 from "../../assets/hero-img-4.png";
// import hero3 from "../../assets/hero-img-3.webp";
// import hero4 from "../../assets/hero-img-4.png";
// import Icon from "../../components/ui/Icon";
// import Cookies from "js-cookie"; 
// // NEW: API import
// import { useLoginMutation } from "../../features/auth/authApi";
// import { loginSuccess } from "../../features/auth/authSlice";
// import { useDispatch } from "react-redux";

// // 👇 NEW COMMON COMPONENTS IMPORTS
// import OtpScreen from "../../components/Common/OtpScreen"; 
// import ForgotPassword from "../../pages/Auth/ForgotPassword";
// import ResetPassword from "../../pages/Auth/ResetPassword";

// interface SignInFormData {
//   email: string;
//   password: string;
// }

// interface SignUpFormData {
//   name: string;
//   email: string;
//   password: string;
// }

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

// const SignInForm: React.FC = () => {
//   const [slideFromLeft, setSlideFromLeft] = useState(false);
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [animateSlide, setAnimateSlide] = useState(false);
//   const [slideDirection, setSlideDirection] = useState<"down" | "up">("down");
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

//   const [currentView, setCurrentView] = useState<'form' | 'forgot' | 'otp' | 'reset'>('form');
//   const [otpContact, setOtpContact] = useState<string>("");
//   const [otpFlowType, setOtpFlowType] = useState<'signin' | 'forgot'>('signin');

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // RTK Query login hook
//   const [loginApi, { isLoading }] = useLoginMutation();

//   const isSignInValid = signInData.email.trim() !== "" && signInData.password.trim() !== "";
//   const isSignUpValid =
//     signUpData.name.trim() !== "" &&
//     signUpData.email.trim() !== "" &&
//     signUpData.password.trim() !== "";


//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveImageIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleDotClick = (index: number) => {
//     setActiveImageIndex(index);
//   };

//   const handleSignInChange = (name: keyof SignInFormData, value: string) => {
//     setSignInData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignUpChange = (name: keyof SignUpFormData, value: string) => {
//     setSignUpData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleToggle = () => {
//     setSlideDirection(slideDirection === "down" ? "up" : "down");
//     setAnimateSlide(true);
//     setIsSignUp(!isSignUp);
//     setCurrentView('form');
//     setOtpFlowType('signin');
//     setOtpContact("");
//     // NOTE: setSlideFromLeft(false) here is fine, as flip should override.
//     setTimeout(() => setAnimateSlide(false), 500);
//   };


// // ✅ OTP HANDLERS UPDATED: setSlideFromLeft(true) added for slide-in when returning to form
// const handleOtpConfirm = (otpValue: string) => {
//   ToasterUtils.success("OTP verified successfully!");

//   // Move temp credentials to real auth store
//   const token = localStorage.getItem("tempToken");
//   const userStr = localStorage.getItem("tempUser");
//   const user = userStr ? JSON.parse(userStr) : null;

// if (token && user) {
//   Cookies.set("token", token, { secure: true, sameSite: "Strict" });
// dispatch(loginSuccess({ token, user }));
//   localStorage.removeItem("tempToken");
//   localStorage.removeItem("tempUser");
// }

//   
//   // Set slideFromLeft to trigger slide animation before redirecting to '/ecommerce'
//   setSlideFromLeft(true);
//   setCurrentView("form");
//   navigate("/ecommerce", { replace: true });
// };


// const handleCancelOtp = () => {
//   ToasterUtils.info("Login verified without OTP.");

//   // Move temp credentials to Redux store (same as confirm)
//   const token = localStorage.getItem("tempToken");
//   const userStr = localStorage.getItem("tempUser");
//   const user = userStr ? JSON.parse(userStr) : null;

//   if (token && user) {
//     dispatch(setCredentials({ token, user }));
//     localStorage.removeItem("tempToken");
//     localStorage.removeItem("tempUser");
//   }

//   // Reset states before redirect
//   setCurrentView("form");
//   setOtpContact("");
//   setLoading(false);
//   setSlideFromLeft(true); 
//   // ✅ Redirect to ecommerce (even on back press)
// //   navigate("/ecommerce", { replace: true });
// };


//   // ✅ UPDATED LOGIN HANDLER
//  const handleSubmit = async (e: FormEvent) => {
//   e.preventDefault();

//   if (!isSignInValid) return;

//   setLoading(true);

//   try {
//     const position = await new Promise<GeolocationPosition>((resolve, reject) =>
//       navigator.geolocation.getCurrentPosition(resolve, reject)
//     );

//     const { latitude, longitude } = position.coords;

//     const response = await loginApi({
//       email: signInData.email,
//       password: signInData.password,
//       latitude,
//       longitude,
//     }).unwrap();


//     if (response.success) {
//       localStorage.setItem("tempToken", response.token);
//       localStorage.setItem("tempUser", JSON.stringify(response.user));

//       setOtpFlowType("signin");
//       setOtpContact(response.user.email || "xxxxxx8110");
//       setCurrentView("otp");

//     } else {
//       ToasterUtils.error(response.message || "Invalid login credentials");
//     }
//   } catch (err: any) {
//     console.error("Login Error:", err);
//     ToasterUtils.error(err?.data?.message || "Login failed! Check credentials.");
//   } finally {
//     setLoading(false);
//   }
// };


//   // Forgot / Reset password handlers (updated with setSlideFromLeft)
//   const handleOtpRequest = (contact: string) => {
//     setOtpFlowType('forgot');
//     setOtpContact(contact);
//     setCurrentView('otp');
//   };

//   const handleCancelForgotPassword = () => {
//     setCurrentView('form');
//     setOtpContact("");
//     setLoading(false);
//     setSlideFromLeft(true); // ✅ Added for slide animation on back
//   };

//   const handlePasswordSave = () => {
//     setCurrentView('form');
//     setIsSignUp(false);
//     setSignInData(prev => ({ ...prev, password: "" }));
//     setOtpContact("");
//     setLoading(false);
//     setSlideFromLeft(true); // ✅ Added for slide animation after successful reset
//   };

//   const handleCancelResetPassword = () => {
//     setCurrentView('otp');
//     setLoading(false);
//     setSlideFromLeft(true); // ✅ Added for slide animation on back
//   };


//   // CONTENT RENDERER (restored original logic for slideFromLeft)
//   const renderContent = () => {
//     if (currentView === 'otp') {
//       return (
//         <div className="p-8 lg:p-6">
//           <OtpScreen
//             onOtpConfirm={handleOtpConfirm}
//             onCancel={handleCancelOtp}
//             phoneNumber={otpContact}
//             flowType={otpFlowType}
//           />
//         </div>
//       );
//     }
//     

//     

//     if (currentView === 'forgot') {
//       return (
//         <div className="p-8 lg:p-6">
//           <ForgotPassword
//             onOtpRequest={handleOtpRequest}
//             onCancel={handleCancelForgotPassword}
//             setLoading={setLoading}
//             loading={loading}
//           />
//         </div>
//       );
//     }

//     if (currentView === 'reset') {
//       return (
//         <div className="p-8 lg:p-6">
//           <ResetPassword
//             onPasswordSave={handlePasswordSave}
//             onCancel={handleCancelResetPassword}
//             setLoading={setLoading}
//             loading={loading}
//           />
//         </div>
//       );
//     }

//     // Default: form (Sign In / Up)
//     return (
//       <div
//         key={isSignUp ? "signup" : "signin"}
//         className={
//           animateSlide
//             ? `animate__animated ${
//                 isSignUp
//                   ? slideDirection === "down"
//                     ? "animate__flipOutYRight"
//                     : "animate__flipInYRight"
//                   : slideDirection === "down"
//                   ? "animate__flipOutYLeft"
//                   : "animate__flipInYLeft"
//               }`
//             : slideFromLeft // ✅ This enables the slide animation when returning from other views
//             ? "animate__animated animate__slideInLeft faster-slideInLeft"
//             : ""
//         }
//         style={{ ["--animate-duration" as any]: "0.6s" }}
//       >
//         {/* form header and input fields (same as before) */}
//           <div className="flex justify-start pl-8 mt-12 lg:mt-3 sm:justify-start md:justify-start lg:justify-start mb-7 md:pl-8 lg:pl-0">
//           <img
//             src="https://dashboard.nerotix.in/storage/logo/logo.svg"
//             alt="Nerotix Logo"
//             className="h-auto duration-500 w-36 drop-shadow-md ransition-transform hover:scale-105"
//           />
//         </div>

//         <h2 className="pl-8 mb-5 text-2xl font-semibold text-gray-700 sm:text-2xl text-start md:pl-8 lg:pl-0">
//           {isSignUp ? "Sign Up" : "Sign In"}
//           <p className="mt-1 text-base tracking-wider text-gray-500 sm:text-lg sm:pl-0 md:pl-0 lg:pl-0">
//             {isSignUp ? "Create your account" : "Welcome Back!"}
//           </p>
//         </h2>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="px-6 space-y-5 sm:px-10 lg:px-0"
//         >
//           {isSignUp && (
//             <InputField
//               label="Name"
//               type="text"
//               value={signUpData.name}
//               onChange={(val) => handleSignUpChange("name", val)}
//               leftIcon="ri-user-line"
//             />
//           )}

//           <InputField
//             label="Email"
//             type="email"
//             value={isSignUp ? signUpData.email : signInData.email}
//             leftIcon="ri-mail-line"
//             onChange={(val) =>
//               isSignUp
//                 ? handleSignUpChange("email", val)
//                 : handleSignInChange("email", val)
//             }
//           />

//           <InputField
//             label={isSignUp ? "New Password" : "Password"}
//             type={showPassword ? "text" : "password"}
//             value={
//               isSignUp ? signUpData.password : signInData.password
//             }
//             leftIcon="ri-lock-2-line"
//             onChange={(val) =>
//               isSignUp
//                 ? handleSignUpChange("password", val)
//                 : handleSignInChange("password", val)
//             }
//           />

//           {!isSignUp && (
//             <div className="flex items-center justify-between">
//               <Checkbox
//                 checked={rememberMe}
//                 onChange={() => setRememberMe(!rememberMe)}
//                 label="Remember me"
//                 size="xs"
//                 shape="rounded"
//                 checkedColor="bg-primary"
//                 uncheckedColor="bg-white"
//                 showLabel
//               />
//               <button
//                 type="button"
//                 onClick={() => {
//                   setCurrentView('forgot'); // Switch to ForgotPassword view
//                 }}
//                 className="text-sm font-medium text-indigo-600 underline hover:text-indigo-500"
//               >
//                 Forgot password?
//               </button>
//             </div>
//           )}

//           {/* Submit Button */}
//           <div className="flex justify-center ">
//             <button
//               type="submit"
//               disabled={
//                 (isSignUp && !isSignUpValid) ||
//                 (!isSignUp && !isSignInValid) ||
//                 loading
//               }
//               className={`relative flex items-center justify-center font-medium shadow-md transition-all duration-300 ease-in-out overflow-hidden
//                 ${(!isSignUp && !isSignInValid) ||
//                 (isSignUp && !isSignUpValid)
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-black text-white "
//                 }
//                 ${loading
//                   ? "w-12 h-12 rounded-full"
//                   : "w-full h-12 rounded-xl"
//                 }
//               `}
//             >
//               {loading && (
//                 <svg
//                   className="absolute w-8 h-8 text-white animate-spin"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-100"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="white"
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     strokeDasharray="31.4"
//                     strokeDashoffset="0"
//                   />
//                 </svg>
//               )}
//               {!loading && (
//                 <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
//               )}
//             </button>
//           </div>
//         </form>

//         {/* Toggle Sign In / Up */}
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-900">
//             {isSignUp
//               ? "Already have an account?"
//               : "Don’t have an account?"}{" "}
//             <button
//               type="button"
//               onClick={handleToggle}
//               className="relative inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               {isSignUp ? "Sign In" : "Sign Up"}
//             </button>
//           </p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
//       {/* Left carousel and right form section (same as before) */}

//           <div className="hidden lg:flex w-[60%] relative bg-gradient-to-br from-[#00AD7D] via-[#0A5C4F] text-white">
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
//       {/* ... full JSX stays same */}
//       {/* Just ensure renderContent() is called correctly */}
//       <div className="flex flex-1 h-screen overflow-y-auto conditional-scrollbar animate__animated animate__zoomIn">
//         <div className="w-full h-full mx-auto my-auto sm:h-screen sm:max-h-screen lg:h-auto lg:max-w-md lg:rounded-3xl">
//           <div className="h-full rotating-neon-wrapper ">
//             <div className="h-full transition-all duration-300 border-2 border-gray-200 rotating-neon-card sm:rounded-none lg:rounded-2xl">
//               {renderContent()}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignInForm;


























// src/pages/Auth/SignInForm.tsx (A to Z Updated Code with Correct OTP Flow)

import React, { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../components/Common/Checkbox";
import hero from "../../assets/hero-img-1.png";
import InputField from "../../components/Common/inputField";
import { ToasterUtils } from "../../components/ui/toast";
import hero2 from "../../assets/hero-img-4.png";
import hero3 from "../../assets/hero-img-3.webp";
import hero4 from "../../assets/hero-img-4.png";
import Icon from "../../components/ui/Icon";
import Cookies from "js-cookie";
import { useLoginMutation, type LoginResponseData } from "../../features/auth/authApi"; 
import { loginStart, loginSuccess, setError, type User, type LoginPayload } from "../../features/auth/authSlice"; 
import { useDispatch } from "react-redux";
import OtpScreen from "../../components/Common/OtpScreen";
import ForgotPassword from "../../pages/Auth/ForgotPassword";
import ResetPassword from "../../pages/Auth/ResetPassword";
import { useVerifyForgotPasswordOtpMutation } from "../../features/auth/authApi";


interface SignInFormData {
    email: string;
    password: string;
}

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

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
    const [slideFromLeft, setSlideFromLeft] = useState(false);
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

    const [currentView, setCurrentView] = useState<'form' | 'forgot' | 'otp' | 'reset'>('form');
    const [otpContact, setOtpContact] = useState<string>("");
    const [otpFlowType, setOtpFlowType] = useState<'signin' | 'forgot'>('signin');
    const [verifyOtpApi, { isLoading: isVerifyingOtp }] = useVerifyForgotPasswordOtpMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginApi, { isLoading }] = useLoginMutation();

    const isSignInValid = signInData.email.trim() !== "" && signInData.password.trim() !== "";
    const isSignUpValid =
        signUpData.name.trim() !== "" &&
        signUpData.email.trim() !== "" &&
        signUpData.password.trim() !== "";

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveImageIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index: number) => {
        setActiveImageIndex(index);
    };

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
        setCurrentView('form');
        setOtpFlowType('signin');
        setOtpContact("");
        setTimeout(() => setAnimateSlide(false), 500);
    };


    /**
     * Common function to finalize login after OTP or skip, using API expiry time.
     */
    const finalizeLogin = (token: string, user: User, expiresAtStr: string) => {

        const expiryDate = new Date(expiresAtStr);
        const tokenExpiryTimestamp = expiryDate.getTime();

        // Calculate the number of days until expiry (approximate)
        const daysUntilExpiry = Math.ceil((tokenExpiryTimestamp - Date.now()) / (1000 * 60 * 60 * 24));

        // 1. Store the token securely in Cookies, respecting API expiry
        Cookies.set("token", token, {
            expires: daysUntilExpiry > 0 ? daysUntilExpiry : 1,
            secure: true,
            sameSite: "Strict"
        });

        // 2. Dispatch loginSuccess (handles Redux state and localStorage update)
        const payload: LoginPayload = { token, user, expires_at: expiresAtStr };
        dispatch(loginSuccess(payload));

        // 3. Clean up temporary storage
        localStorage.removeItem("tempToken");
        localStorage.removeItem("tempUser");

        // 4. Reset state and redirect
        setLoading(false);
        setCurrentView("form");
        setSlideFromLeft(true);
        navigate("/ecommerce", { replace: true });
    }


    // ✅ CORRECTED OTP CONFIRM HANDLER
    const handleOtpConfirm = async (otpValue: string) => {
        try {
            const isEmail = otpContact;
            
            // Construct the payload based on whether otpContact is email or mobile_no (assuming email for this flow)
            const payload: { otp: string, email?: string, mobile_no?: string } = { otp: otpValue };
            console.log("OTP Payload:", payload);
            
            
            if (isEmail) {
                payload.email = otpContact;
            } else {
                // If it's a mobile number, you'd need a way to determine that from the parent state/context.
                // For now, assuming email in the forgot password flow, or using mobile_no if the API requires it.
                // You might need to adjust this if your API uses mobile_no.
                payload.email = otpContact; 
            }

            const response = await verifyOtpApi(payload).unwrap();
            console.log("hh:",response);
            

            if (response.success) {
                ToasterUtils.success("OTP verified successfully!");

                // Store the token from verify-otp API (This token is for password reset OR login session)
                localStorage.setItem("tempToken", response.data.token);

                if (otpFlowType === 'forgot') {
                    // 1. FORGOT PASSWORD FLOW: Move to Reset Password screen
                    setCurrentView('reset'); 
                    setLoading(false);
                } else {
                    // 2. SIGN IN FLOW: Finalize login
                    const tempUser = localStorage.getItem("tempUser");
                    const userData = tempUser ? JSON.parse(tempUser) : null;

                    if (userData && userData.user && userData.expires_at) {
                        finalizeLogin(response.data.token, userData.user, userData.expires_at);
                    } else {
                        ToasterUtils.error("Login data incomplete. Please try signing in again.");
                        setCurrentView("form");
                        setLoading(false);
                    }
                }
            }
        } catch (err: any) {
            console.error("OTP Error:", err);
            ToasterUtils.error(err?.data?.message || "OTP verification failed");
            setLoading(false);
        }
    };



    // 🚀 LOGIN HANDLER: Correctly handles nested 'data' and stores expires_at
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (isSignUp || !isSignInValid) return; // Only process sign-in here

        setLoading(true);
        dispatch(loginStart());

        let isMovingToOtp = false;

        try {
            // --- Geolocation Logic ---
            const position = await new Promise<GeolocationPosition>((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );
            const { latitude, longitude } = position.coords;
            // -------------------------

            const response = await loginApi({
                email: signInData.email,
                password: signInData.password,
                latitude,
                longitude,
            }).unwrap();

            // 🆕 Destructure the actual login data from the 'data' property
            const loginData: LoginResponseData = response.data;

            console.log("Login Data:", loginData);


            if (response.success) {
                // Store credentials TEMPORARILY, pending OTP confirmation
                localStorage.setItem("tempToken", loginData.token);

                // Store user object AND API's expires_at string in tempUser
                localStorage.setItem("tempUser", JSON.stringify({
                    user: loginData.user,
                    expires_at: loginData.expires_at, // API's string "2025-10-14 14:15:38"
                }));

                setOtpFlowType("signin");
                setOtpContact(loginData.user.email || "xxxxxx8110"); // Use email for contact
                setCurrentView("otp"); // Move to OTP screen
                isMovingToOtp = true; // Flag set
            } else {
                ToasterUtils.error(response.message || "Invalid login credentials");
                dispatch(setError(response.message || "Invalid login credentials"));
            }
        } catch (err: any) {
            console.error("Login Error:", err);
            const errorMessage = err?.data?.message || err?.message || "Login failed! Check credentials.";
            ToasterUtils.error(errorMessage);
            dispatch(setError(errorMessage));
        } finally {
            // Only stop loading if we are NOT moving to the OTP screen
            if (!isMovingToOtp) {
                setLoading(false);
            }
        }
    };

    const handleCancelOtp = () => {
        // This is called when the user cancels the OTP screen

        if (otpFlowType === "forgot") {
            ToasterUtils.info("OTP verification cancelled. Please try again.");
            setCurrentView("forgot"); // go back to forgot password screen
        } else {
            // Sign-in flow: Treat cancel as skipping OTP (risky, but based on your original logic)
            ToasterUtils.info("Login verified without OTP.");
            const token = localStorage.getItem("tempToken");
            const userStr = localStorage.getItem("tempUser");
            let user: User | null = null;
            let expiresAtStr: string | null = null;

            try {
                const tempUserData = userStr ? JSON.parse(userStr) : null;
                user = tempUserData?.user || null;
                expiresAtStr = tempUserData?.expires_at || null;
            } catch {
                user = null;
                expiresAtStr = null;
            }

            if (token && user && expiresAtStr) {
                finalizeLogin(token, user, expiresAtStr);
            } else {
                ToasterUtils.error("Login data incomplete. Please try signing in again.");
                setCurrentView("form");
            }
        }

        setLoading(false);
    };

    // Forgot / Reset password handlers 
    const handleOtpRequest = (contact: string) => {
        setCurrentView('otp');
        setOtpFlowType('forgot');
        setOtpContact(contact);
        setLoading(false); // Reset loading state after successful request
    };

    const handleCancelForgotPassword = () => {
        setCurrentView('form');
        setOtpContact("");
        setLoading(false);
        setSlideFromLeft(true);
    };


    const handlePasswordSave = () => {
        // Clear tempToken (reset token) after password reset is complete
        localStorage.removeItem("tempToken");

        setCurrentView('form');
        setSignInData(prev => ({ ...prev, password: "" }));
        setOtpContact("");
        setLoading(false);
        setSlideFromLeft(true);

        ToasterUtils.success("Password reset successfully! Please sign in.");
    };


    const handleCancelResetPassword = () => {
        setCurrentView('forgot'); // Go back to the 'Forgot Password' screen
        setLoading(false);
        setSlideFromLeft(true);
    };


    // CONTENT RENDERER
    const renderContent = () => {
        if (currentView === 'otp') {
            return (
                <div className="p-8 lg:p-6">
                    <OtpScreen
                        onOtpConfirm={handleOtpConfirm}
                        onCancel={handleCancelOtp}
                        phoneNumber={otpContact}
                        flowType={otpFlowType}
                    />
                    {otpFlowType === 'forgot' && (
                        <button
                            type="button"
                            onClick={() => setCurrentView('forgot')}
                            className="mt-4 text-sm font-medium text-indigo-600 underline hover:text-indigo-500"
                        >
                            Go back to Forgot Password
                        </button>
                    )}
                </div>
            );
        }

        if (currentView === 'forgot') {
            return (
                <div className="p-8 lg:p-6">
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
                    <ResetPassword
                        onPasswordSave={handlePasswordSave}
                        onCancel={handleCancelResetPassword}
                        setLoading={setLoading}
                        loading={loading}
                    />
                </div>
            );
        }

        // Default: form (Sign In / Up)
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
                        : slideFromLeft
                            ? "animate__animated animate__slideInLeft faster-slideInLeft"
                            : ""
                }
                style={{ ["--animate-duration" as any]: "0.6s" }}
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

            <div className="flex flex-1 h-screen overflow-y-auto conditional-scrollbar animate__animated animate__zoomIn">
                <div className="w-full h-full mx-auto my-auto sm:h-screen sm:max-h-screen lg:h-auto lg:max-w-md lg:rounded-3xl">
                    <div className="h-full rotating-neon-wrapper ">
                        <div className="h-full transition-all duration-300 border-2 border-gray-200 rotating-neon-card sm:rounded-none lg:rounded-2xl">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;