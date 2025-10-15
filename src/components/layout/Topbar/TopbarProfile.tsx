

// // import Dropdown from "../../ui/Dropdown";
// // import {
// //   FiUser,
// //   FiMessageCircle,
// //   FiCalendar,
// //   FiHelpCircle,
// //   FiSettings,
// //   FiLock,
// //   FiLogOut,
// // } from "react-icons/fi";
// // import { clsx } from "clsx";
// // import { useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { logout } from "../../../features/auth/authSlice"; // Redux action

// // const TopbarProfile = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   // Get user from Redux
// //   const user = useSelector((state: any) => state.auth.user);


// // const handleLogout = () => {
// //   dispatch(logout()); // clears Redux & localStorage
// //   navigate("/login", { replace: true }); // go to login
// // };

// //   const items = [
// //     { label: "Profile", icon: <FiUser /> },
// //     { label: "Messages", icon: <FiMessageCircle /> },
// //     { label: "Taskboard", icon: <FiCalendar /> },
// //     { label: "Help", icon: <FiHelpCircle /> },
// //     { separator: true },
// //     { label: "Balance: $5971.67", disabled: true },
// //     { label: "Settings", icon: <FiSettings />, badge: "New" },
// //     { label: "Lock screen", icon: <FiLock /> },
// //     {
// //       label: "Logout",
// //       icon: <FiLogOut />,
// //       onClick: handleLogout,
// //     },
// //   ];

// //   return (
// //     <Dropdown
// //       trigger={
// //         <div className="flex items-center gap-2 cursor-pointer">
// //           {/* Avatar */}
// //           <div
// //             data-ripple
// //             className={clsx(
// //               "relative w-10 h-10 overflow-hidden rounded-full cursor-pointer",
// //               "transition duration-200 ease-in-out transform",
// //               "hover:scale-105 active:scale-95 hover:bg-surface-hover"
// //             )}
// //           >
// //             <img
// //               src={user?.avatar || "https://randomuser.me/api/portraits/women/68.jpg"}
// //               alt="profile"
// //               className="object-cover w-full h-full"
// //             />
// //           </div>

// //           {/* Name & Role */}
// //           <div className="hidden md:block">
// //             <h4 className="text-sm font-medium text-text-primary">
// //               {user?.name || "Anna Adame"}
// //             </h4>
// //             <p className="text-xs text-text-secondary">{user?.role || "Founder"}</p>
// //           </div>
// //         </div>
// //       }
// //       items={items}
// //     />
// //   );
// // };

// // export default TopbarProfile;


















// import Dropdown from "../../ui/Dropdown";
// import {
//   FiUser,
//   FiMessageCircle,
//   FiCalendar,
//   FiHelpCircle,
//   FiSettings,
//   FiLock,
//   FiLogOut,
// } from "react-icons/fi";
// import { clsx } from "clsx";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../../features/auth/authSlice"; // Redux action
// import { useState } from "react";
// import LogoutModal from "../../Modal/LogoutModal"; // import your modal

// const TopbarProfile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

//   // Get user from Redux
//   const user = useSelector((state: any) => state.auth.user);

//   const handleLogoutConfirm = (allDevices: boolean) => {
//     // You can use `allDevices` if needed
//     dispatch(logout()); // clears Redux & localStorage
//     navigate("/login", { replace: true });
//   };

//   const items = [
//     { label: "Profile", icon: <FiUser /> },
//     { label: "Messages", icon: <FiMessageCircle /> },
//     { label: "Taskboard", icon: <FiCalendar /> },
//     { label: "Help", icon: <FiHelpCircle /> },
//     { separator: true },
//     { label: "Balance: $5971.67", disabled: true },
//     { label: "Settings", icon: <FiSettings />, badge: "New" },
//     { label: "Lock screen", icon: <FiLock /> },
//     {
//       label: "Logout",
//       icon: <FiLogOut />,
//       onClick: () => setLogoutModalOpen(true), // open modal instead of direct logout
//     },
//   ];

//   return (
//     <>
//       <Dropdown
//         trigger={
//           <div className="flex items-center gap-2 cursor-pointer">
//             {/* Avatar */}
//             <div
//               data-ripple
//               className={clsx(
//                 "relative w-10 h-10 overflow-hidden rounded-full cursor-pointer",
//                 "transition duration-200 ease-in-out transform",
//                 "hover:scale-105 active:scale-95 hover:bg-surface-hover"
//               )}
//             >
//               <img
//                 src={user?.avatar || "https://randomuser.me/api/portraits/women/68.jpg"}
//                 alt="profile"
//                 className="object-cover w-full h-full"
//               />
//             </div>

//             {/* Name & Role */}
//             <div className="hidden md:block">
//               <h4 className="text-sm font-medium text-text-primary">
//                 {user?.name || "Anna Adame"}
//               </h4>
//               <p className="text-xs text-text-secondary">{user?.role || "Founder"}</p>
//             </div>
//           </div>
//         }
//         items={items}
//       />

//       {/* Logout Modal */}
//       <LogoutModal
//         isOpen={isLogoutModalOpen}
//         toggle={() => setLogoutModalOpen(false)}
//         onLogout={handleLogoutConfirm}
//       />
//     </>
//   );
// };

// export default TopbarProfile;

















// components/Layout/TopbarProfile.tsx

import Dropdown from "../../ui/Dropdown";
import { FiUser, FiMessageCircle, FiCalendar, FiHelpCircle, FiSettings, FiLock, FiLogOut } from "react-icons/fi";
import { clsx } from "clsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice"; 
import { useState } from "react";
import LogoutModal from "../../Modal/LogoutModal";
import { useLogoutMutation } from "../../../features/auth/authApi";
// import Cookies from "js-cookie"; // Not needed here
import { ToasterUtils } from "../../ui/toast"; // Assuming toast utility is available

const TopbarProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const user = useSelector((state: any) => state.auth.user);
  const [logoutApi, { isLoading }] = useLogoutMutation();

  // ✅ CORRECTED Logout handler: Cleanup and redirect ONLY on API success
  const handleLogoutConfirm = async (allDevices: boolean) => {
    try {
      // 1. Call the logout API
      const response = await logoutApi({ all_device: allDevices }).unwrap();
      
      // 2. API Call Successful: Perform Frontend Cleanup and Redirect
      if (response.success) {
        ToasterUtils.success(response.message || "सफलतापूर्वक लॉगआउट किया गया!");
        
        // 3. Clear Redux state, local storage, and cookies
        dispatch(logout()); 
        
        // 4. Redirect to login
        navigate("/login", { replace: true });
      } else {
         ToasterUtils.error(response.message || "Logout unsuccessful. Please try again.");
      }

    } catch (err: any) {
      // 5. API Call Failed: Log error and show toast, but DO NOT clear frontend state
      console.error("Logout failed", err);
      const errorMessage = err?.data?.message || err?.message || "Logout failed. Server issue.";
      ToasterUtils.error(errorMessage);

    } finally {
      // 6. Close the modal after the attempt is complete
      setLogoutModalOpen(false); 
    }
  };

  const items = [
    { label: "Profile", icon: <FiUser /> },
    // ... (other items)
    { label: "Lock screen", icon: <FiLock /> },
    { label: "Logout", icon: <FiLogOut />, onClick: () => setLogoutModalOpen(true) },
  ];

  return (
    <>
      <Dropdown
        trigger={
          <div className="flex items-center gap-2 cursor-pointer">
            <div
              data-ripple
              className={clsx(
                "relative w-10 h-10 overflow-hidden rounded-full cursor-pointer",
                "transition duration-200 ease-in-out transform",
                "hover:scale-105 active:scale-95 hover:bg-surface-hover"
              )}
            >
              <img
                src={user?.avatar || "https://randomuser.me/api/portraits/women/68.jpg"}
                alt="profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hidden md:block">
              <h4 className="text-sm font-medium text-text-primary">{user?.name || "Anna Adame"}</h4>
              <p className="text-xs text-text-secondary">{user?.role || "Founder"}</p>
            </div>
          </div>
        }
        items={items}
      />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        toggle={() => setLogoutModalOpen(false)}
        onLogout={handleLogoutConfirm}
        loading={isLoading}
      />
    </>
  );
};

export default TopbarProfile;

