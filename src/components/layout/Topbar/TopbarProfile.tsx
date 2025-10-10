import Dropdown from "../../ui/Dropdown";
import {
  FiUser,
  FiMessageCircle,
  FiCalendar,
  FiHelpCircle,
  FiSettings,
  FiLock,
  FiLogOut,
} from "react-icons/fi";
import { clsx } from "clsx";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TopbarProfile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Dropdown items with logout handler
  const items = [
    { label: "Profile", icon: <FiUser /> },
    { label: "Messages", icon: <FiMessageCircle /> },
    { label: "Taskboard", icon: <FiCalendar /> },
    { label: "Help", icon: <FiHelpCircle /> },
    { separator: true },
    { label: "Balance: $5971.67", disabled: true },
    { label: "Settings", icon: <FiSettings />, badge: "New" },
    { label: "Lock screen", icon: <FiLock /> },
    {
      label: "Logout",
      icon: <FiLogOut />,
      onClick: () => {
        logout();               // Clear token and auth state
      },
    },
  ];

  return (
    <Dropdown
      trigger={
        <div className="flex items-center gap-2 cursor-pointer">
          {/* Avatar */}
          <div
            data-ripple
            className={clsx(
              "relative w-10 h-10 overflow-hidden rounded-full cursor-pointer",
              "transition duration-200 ease-in-out transform",
              "hover:scale-105 active:scale-95 hover:bg-surface-hover"
            )}
          >
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="profile"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Name & Role */}
          <div className="hidden md:block">
            <h4 className="text-sm font-medium text-text-primary">Anna Adame</h4>
            <p className="text-xs text-text-secondary">Founder</p>
          </div>
        </div>
      }
      items={items}
    />
  );
};

export default TopbarProfile;
