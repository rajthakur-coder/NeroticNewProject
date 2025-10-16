// components/Layout/TopbarProfile.tsx

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
// import Dropdown from "../../ui/Dropdown";
import { FiUser, FiMessageCircle, FiCalendar, FiHelpCircle, FiSettings, FiLock, FiLogOut } from "react-icons/fi";
import LogoutModal from "../../Modal/LogoutModal";
import { useLogoutMutation } from "../../../features/auth/authApi";
import { logout } from "../../../features/auth/authSlice";
import { ToasterUtils } from "../../ui/toast";

const TopbarProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = useSelector((state: any) => state.auth.user);
  const [logoutApi, { isLoading }] = useLogoutMutation();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutConfirm = async (allDevices: boolean) => {
    try {
      const response = await logoutApi({ all_device: allDevices }).unwrap();
      if (response.success) {
        ToasterUtils.success(response.message || "सफलतापूर्वक लॉगआउट किया गया!");
        dispatch(logout());
        navigate("/login", { replace: true });
      } else {
        ToasterUtils.error(response.message || "Logout unsuccessful. Please try again.");
      }
    } catch (err: any) {
      console.error("Logout failed", err);
      const errorMessage = err?.data?.message || err?.message || "Logout failed. Server issue.";
      ToasterUtils.error(errorMessage);
    } finally {
      setLogoutModalOpen(false);
    }
  };

  const items = [
    { label: "Profile", icon: <FiUser />, onClick: () => {} },
    { label: "Messages", icon: <FiMessageCircle />, onClick: () => {} },
    { label: "Calendar", icon: <FiCalendar />, onClick: () => {} },
    { label: "Help", icon: <FiHelpCircle />, onClick: () => {} },
    { label: "Settings", icon: <FiSettings />, onClick: () => {} },
    { label: "Lock screen", icon: <FiLock />, onClick: () => {} },
    { label: "Logout", icon: <FiLogOut />, onClick: () => setLogoutModalOpen(true) },
  ];

  return (
    <>
      <div ref={dropdownRef} className="relative">
        <div onClick={() => setDropdownOpen(!isDropdownOpen)}>
          <div className="flex items-center gap-2 cursor-pointer">
            <div
              data-ripple
              className={clsx(
                "relative w-10 h-10 overflow-hidden rounded-full cursor-pointer",
                "transition duration-200 ease-in-out transform",
                "hover:scale-105 active:scale-95 hover:bg-gray-800"
              )}
            >
              <img
                src={user?.avatar || "https://randomuser.me/api/portraits/women/68.jpg"}
                alt="profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hidden md:block">
              <h4 className="text-sm font-medium text-text-main">{user?.name || "Anna Adame"}</h4>
              <p className="text-xs text-text-main">{user?.role || "Founder"}</p>
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 z-50 w-48 p-2 mt-2 overflow-hidden rounded-lg shadow-lg bg-surface-card"
            >
              {items.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    item.onClick();
                    setDropdownOpen(false);
                  }}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition",
                    item.label === "Logout"
                      ? "bg-danger text-white hover:bg-red-700"
                      : "text-text-main hover:bg-surface-hover"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
