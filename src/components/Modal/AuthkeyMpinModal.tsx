// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import BaseModal from "../BaseModals/BaseModal";
// import AuthKeyMpinForm from "../ContentModal/AuthKeyMpinForm";
// import AuthKeyFormInputModal from "./AuthKeyFormInputModal";

// interface AuthkeyMpinModalProps {
//   isOpen: boolean;
//   toggle: () => void;
// }

// const AuthkeyMpinModal: React.FC<AuthkeyMpinModalProps> = ({
//   isOpen,
//   toggle,
// }) => {
//   const [showAuthKeyModal, setShowAuthKeyModal] = useState(false);
//   const [mpin, setMpin] = useState(Array(4).fill(""));
//   const [mpinError, setMpinError] = useState("");
//   const [formData, setFormData] = useState<Record<string, string>>({});

//   // Auto-focus first input when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       setMpin(Array(4).fill(""));
//       setMpinError("");
//       setTimeout(() => {
//         const firstInput = document.getElementById("mpin-0");
//         (firstInput as HTMLInputElement | null)?.focus();
//       }, 100);
//     }
//   }, [isOpen]);

//   // 🔹 Step 1: Verify MPIN, then open next modal
//   const handleVerify = () => {
//     if (mpin.some((d) => d === "")) {
//       setMpinError("Please enter complete 4-digit mPIN");
//       return;
//     }

//     setMpinError("");
//     toggle(); // close mPIN modal
//     setTimeout(() => setShowAuthKeyModal(true), 300); // open AuthKeyFormInputModal after a short delay
//   };

//   // Save Auth Keys
//   const handleSaveAuthKeys = () => {
//     console.log("Saved AuthKeys:", formData, "mPIN:", mpin.join(""));
//     setShowAuthKeyModal(false);
//   };

//   if (!isOpen && !showAuthKeyModal) return null;

//   // --- Framer Motion Variants ---
//   const modalVariants = {
//     hidden: { scale: 0.9, opacity: 0, y: -50 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         damping: 25,
//         stiffness: 250,
//         duration: 0.2,
//       },
//     },
//     exit: { scale: 0.8, opacity: 0, y: 50, transition: { duration: 0.15 } },
//   };

//   const backdropVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
//     exit: { opacity: 0 },
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//           onClick={toggle}
//           variants={backdropVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           <motion.div
//             onClick={(e) => e.stopPropagation()}
//             className="w-[450px] "
//             variants={modalVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             {/* 🔹 First Modal: mPIN Entry */}
//             <BaseModal
//               isOpen={isOpen}
//               toggle={toggle}
//               headerText="Enter mPIN"
//               onConfirm={handleVerify}
//               onCancel={toggle}
//               confirmText="Verify"
//               cancelText="Cancel"
//               widthClass="w-[400px]"
//             >
//               <AuthKeyMpinForm
//                 mpin={mpin}
//                 setMpin={setMpin}
//                 error={mpinError}
//               />
//             </BaseModal>

//             {/* 🔹 Second Modal: Auth Key Form */}
//             <BaseModal
//               isOpen={showAuthKeyModal}
//               toggle={() => setShowAuthKeyModal(false)}
//               headerText="Update Authentication Keys"
//               onConfirm={handleSaveAuthKeys}
//               onCancel={() => setShowAuthKeyModal(false)}
//               confirmText="Submit"
//               cancelText="Cancel"
//               widthClass="w-[600px]"
//             >
//               <AuthKeyFormInputModal
//                 isOpen={showAuthKeyModal}
//                 toggle={() => setShowAuthKeyModal(false)}
//                 mPin="1234"
//               />
//             </BaseModal>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default AuthkeyMpinModal;








import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BaseModal from "../BaseModals/BaseModal";
import AuthKeyMpinForm from "../ContentModal/AuthKeyMpinForm";
import AuthKeyFormInputModal from "./AuthKeyFormInputModal";

interface AuthkeyMpinModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AuthkeyMpinModal: React.FC<AuthkeyMpinModalProps> = ({
  isOpen,
  toggle,
}) => {
  const [showAuthKeyModal, setShowAuthKeyModal] = useState(false);
  const [mpin, setMpin] = useState(Array(4).fill(""));
  const [mpinError, setMpinError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setMpin(Array(4).fill(""));
      setMpinError("");
      setTimeout(() => {
        const firstInput = document.getElementById("mpin-0");
        (firstInput as HTMLInputElement | null)?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleVerify = () => {
    if (mpin.some((d) => d === "")) {
      setMpinError("Please enter complete 4-digit mPIN");
      return;
    }
    setMpinError("");

    // close mPIN modal and open AuthKey modal after short delay
    toggle();
    setTimeout(() => setShowAuthKeyModal(true), 200);
  };

  const handleSaveAuthKeys = (data?: any) => {
    console.log("✅ Saved AuthKeys:", data, "🔐 mPIN:", mpin.join(""));
    setShowAuthKeyModal(false);
  };

  return (
    <>
      {/* 🔹 mPIN Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={toggle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-[450px]"
              initial={{ scale: 0.9, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
            >
              <BaseModal
                isOpen={isOpen}
                toggle={toggle}
                headerText="Enter mPIN"
                onConfirm={handleVerify}
                onCancel={toggle}
                confirmText="Verify"
                cancelText="Cancel"
                widthClass="w-[400px]"
              >
                <AuthKeyMpinForm
                  mpin={mpin}
                  setMpin={setMpin}
                  error={mpinError}
                />
              </BaseModal>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Auth Key Modal (separate) */}
      <AuthKeyFormInputModal
        isOpen={showAuthKeyModal}
        toggle={() => setShowAuthKeyModal(false)}
        mPin={mpin.join("")}
      />
    </>
  );
};

export default AuthkeyMpinModal;