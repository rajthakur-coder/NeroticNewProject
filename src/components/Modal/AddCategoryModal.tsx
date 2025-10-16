// import React, { useMemo, useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import BaseModal from "../BaseModals/BaseModal";
// import AddCategoryForm from "../ContentModal/CategoryForm";

// interface AddCategoryModalProps {
//   isOpen: boolean;
//   toggle: () => void;
//   confirmColor?: string;
//   cancelColor?: string;
//   categoryData?: { name: string; status: string } | null;
// }

// const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
//   isOpen,
//   toggle,
//   categoryData,
// }) => {
//   const [formData, setFormData] = useState({ name: "", status: "Active" });
//   const [touched, setTouched] = useState({ name: false, status: false });

//   const isEditMode = Boolean(categoryData);

//   // ✅ Prefill data if editing, or reset if adding new
//   useEffect(() => {
//     if (isOpen) {
//       if (categoryData) {
//         setFormData({
//           name: categoryData.name || "",
//           status: categoryData.status || "Active",
//         });
//       } else {
//         setFormData({ name: "", status: "Active" });
//         setTouched({ name: false, status: false });
//       }
//     }
//   }, [categoryData, isOpen]);

//   const errors = useMemo(
//     () => ({
//       name: formData.name ? "" : "Name is required",
//     }),
//     [formData]
//   );

//   const isValid = useMemo(
//     () => Object.values(errors).every((e) => !e),
//     [errors]
//   );

//   const handleBlur = (field: keyof typeof touched) => {
//     setTouched((prev) => ({ ...prev, [field]: true }));
//   };

//   const handleConfirm = () => {
//     if (!isValid) return;

//     if (isEditMode) {
//       console.log("✅ Updated Category:", formData);
//     } else {
//       console.log("✅ Added New Category:", formData);
//     }
//     // ✅ reset form after submission
//     setFormData({ name: "", status: "Active" });
//     setTouched({ name: false, status: false });
//     toggle();
//   };

//   const handleCancel = () => {
//     setFormData({ name: "", status: "Active" });
//     setTouched({ name: false, status: false });
//     toggle();
//   };

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
//             <BaseModal
//               isOpen={isOpen}
//               toggle={toggle}
//               headerText={
//                 isEditMode ? "Update Product Category" : "Add Product Category"
//               }
//               onConfirm={handleConfirm}
//               onCancel={handleCancel}
//               confirmText={isEditMode ? "Update" : "Submit"}
//               cancelText="Cancel"
//               confirmColor={
//                 isValid
//                   ? "bg-black hover:bg-gray-900 text-white"
//                   : "bg-gray-400 text-white cursor-not-allowed"
//               }
//               widthClass="w-[450px]"
//             >
//               {/* Form */}
//               <AddCategoryForm
//                 values={formData}
//                 errors={errors}
//                 onChange={setFormData}
//                 onBlur={handleBlur}
//                 touched={touched}
//               />
//             </BaseModal>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default AddCategoryModal;



























// import React, { useMemo, useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion"; // ❌ Removed Framer Motion imports
// import BaseModal from "../BaseModals/BaseModal";
// import AddCategoryForm from "../ContentModal/CategoryForm";

// interface AddCategoryModalProps {
//   isOpen: boolean;
//   toggle: () => void;
//   confirmColor?: string;
//   cancelColor?: string;
//   categoryData?: { name: string; status: string } | null;
// }

// const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
//   isOpen,
//   toggle,
//   categoryData,
// }) => {
//   const [formData, setFormData] = useState({ name: "", status: "Active" });
//   const [touched, setTouched] = useState({ name: false, status: false });

//   const isEditMode = Boolean(categoryData);

//   // ✅ Prefill data if editing, or reset if adding new
//   useEffect(() => {
//     if (isOpen) {
//       if (categoryData) {
//         setFormData({
//           name: categoryData.name || "",
//           status: categoryData.status || "Active",
//         });
//       } else {
//         setFormData({ name: "", status: "Active" });
//         setTouched({ name: false, status: false });
//       }
//     }
//   }, [categoryData, isOpen]);

//   const errors = useMemo(
//     () => ({
//       name: formData.name ? "" : "Name is required",
//     }),
//     [formData]
//   );

//   const isValid = useMemo(
//     () => Object.values(errors).every((e) => !e),
//     [errors]
//   );

//   const handleBlur = (field: keyof typeof touched) => {
//     setTouched((prev) => ({ ...prev, [field]: true }));
//   };

//   const handleConfirm = () => {
//     if (!isValid) return;

//     if (isEditMode) {
//       console.log("✅ Updated Category:", formData);
//       // Actual update logic goes here (e.g., API call)
//     } else {
//       console.log("✅ Added New Category:", formData);
//       // Actual add logic goes here (e.g., API call)
//     }
//     // ✅ reset form after submission
//     setFormData({ name: "", status: "Active" });
//     setTouched({ name: false, status: false });
//     toggle();
//   };

//   const handleCancel = () => {
//     setFormData({ name: "", status: "Active" });
//     setTouched({ name: false, status: false });
//     toggle();
//   };

//   // ❌ Removed Framer Motion Variants

//   return (
//     // <AnimatePresence> ❌ Removed AnimatePresence
//     <>
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//           onClick={toggle}
//           // ❌ Removed variants, initial, animate, exit props
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="w-[450px]"
//             // ❌ Removed variants, initial, animate, exit props
//           >
//             <BaseModal
//               isOpen={isOpen}
//               toggle={toggle}
//               headerText={
//                 isEditMode ? "Update Product Category" : "Add Product Category"
//               }
//               onConfirm={handleConfirm}
//               onCancel={handleCancel}
//               confirmText={isEditMode ? "Update" : "Submit"}
//               cancelText="Cancel"
//               confirmColor={
//                 isValid
//                   ? "bg-black hover:bg-gray-900 text-white"
//                   : "bg-gray-400 text-white cursor-not-allowed"
//               }
//               widthClass="w-[450px]"
//             >
//               {/* Form */}
//               <AddCategoryForm
//                 values={formData}
//                 errors={errors}
//                 onChange={setFormData}
//                 onBlur={handleBlur}
//                 touched={touched}
//               />
//             </BaseModal>
//           </div>
//         </div>
//       )}
//     </>
//     // </AnimatePresence>
//   );
// };

// export default AddCategoryModal;





























import React, { useMemo, useState, useEffect } from "react";
import BaseModal from "../BaseModals/BaseModal";
import AddCategoryForm from "../ContentModal/CategoryForm";

interface AddCategoryModalProps {
  isOpen: boolean;
  toggle: () => void;
  categoryData?: { name: string; status: string } | null;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  toggle,
  categoryData,
}) => {
  const [formData, setFormData] = useState({ name: "", status: "Active" });
  const [touched, setTouched] = useState({ name: false, status: false });

  const isEditMode = Boolean(categoryData);

  // Prefill data if editing, or reset if adding new
  useEffect(() => {
    if (isOpen) {
      if (categoryData) {
        setFormData({
          name: categoryData.name || "",
          status: categoryData.status || "Active",
        });
      } else {
        // Reset form for new category
        setFormData({ name: "", status: "Active" });
        setTouched({ name: false, status: false });
      }
    }
  }, [categoryData, isOpen]);

  const errors = useMemo(
    () => ({
      name: formData.name.trim() ? "" : "Name is required", // Added .trim() for better validation
    }),
    [formData]
  );

  const isValid = useMemo(
    () => Object.values(errors).every((e) => !e),
    [errors]
  );

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleConfirm = () => {
    if (!isValid) {
      // Mark all fields as touched to show errors on invalid submit attempt
      setTouched({ name: true, status: true });
      return;
    }

    if (isEditMode) {
      console.log("✅ Updated Category:", formData);
      // Actual update logic here
    } else {
      console.log("✅ Added New Category:", formData);
      // Actual add logic here
    }
    
    // Reset form and close modal
    setFormData({ name: "", status: "Active" });
    setTouched({ name: false, status: false });
    toggle();
  };

  const handleCancel = () => {
    // Reset form and close modal without saving
    setFormData({ name: "", status: "Active" });
    setTouched({ name: false, status: false });
    toggle();
  };

  return (
    // Correct usage: BaseModal is the only element needed to render the modal,
    // as it handles the backdrop, portal, and animation internally.
    <BaseModal
      isOpen={isOpen}
      toggle={toggle}
      headerText={
        isEditMode ? "Update Product Category" : "Add Product Category"
      }
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      confirmText={isEditMode ? "Update" : "Submit"}
      cancelText="Cancel"
      // Disable confirm button visually and functionally if form is invalid
      confirmColor={
        isValid
          ? "bg-black hover:bg-gray-900 text-white"
          : "bg-gray-400 text-white cursor-not-allowed"
      }
    widthClass="w-[450px]"
    >
      {/* Form Content */}
      <AddCategoryForm
        values={formData}
        errors={errors}
        onChange={setFormData}
        onBlur={handleBlur}
        touched={touched}
      />
    </BaseModal>
  );
};

export default AddCategoryModal;