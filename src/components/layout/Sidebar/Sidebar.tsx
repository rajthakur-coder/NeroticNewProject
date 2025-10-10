

import { useState, useRef, useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import { sidebarSections } from "./sideData";
import SidebarItem from "./SidebarItem";
import SidebarSubmenu from "./SidebarSubmenu";
import Icon from "../../ui/Icon";
import clsx from "clsx";

// Types
type SidebarItemType = {
  name: string;
  path?: string;
  icon?: React.ReactNode;
  children?: SidebarItemType[];
};

type Position = { top: number; left: number; height: number };

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onItemClick?: () => void; // mobile close
};

const SidebarHeader = ({
  isCollapsed,
  toggleCollapse,
}: {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}) => (
  <div className="relative flex items-center h-20 px-4 ">
    <img
      src="https://www.vhv.rs/dpng/d/355-3553213_crm-dorm-room-fund-logo-transparent-hd-png.png"
      alt="Logo"
      className="w-10 h-10 ml-3 rounded-3xl"
    />
     {!isCollapsed && (
      <span className="ml-2 text-2xl font-bold">
        {/* OFF: Uses primary color */}
        <span className="text-primary">OFF</span>
        {/* ICE: Uses text-subtle variable */}
        <span className="text-text-subtle sidebar-header">ICE</span>
      </span>
    )}

    <button data-no-ripple
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      onClick={toggleCollapse}
      className={clsx(
        // Button colors replaced with variables
        "absolute flex items-center justify-center w-6 h-6 rounded-full hover:bg-surface-hover",
        "bg-surface-card text-text-subtle", 
        
        "transition-transform duration-300 transform hover:scale-110 active:scale-95 overflow-hidden -right-3 hidden lg:flex"
      )}
    >
      <Icon
        name={isCollapsed ? "bx:chevron-right" : "bx:chevron-left"}
        size={16}
      />
    </button>
  </div>
);

const MemoizedSidebarItem = memo(SidebarItem);

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  onItemClick,
}: SidebarProps) => {
  const location = useLocation();
  const activePath = location.pathname;

  const [openManagementMenu, setOpenManagementMenu] = useState<string | null>(
    null
  );
  const [hoveredManagementMenu, setHoveredManagementMenu] =
    useState<SidebarItemType | null>(null);
  const [hoveredElementPos, setHoveredElementPos] = useState<Position>({
    top: 0,
    left: 0,
    height: 0,
  });
  const [showScroll, setShowScroll] = useState(false);

  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll detection
  useEffect(() => {
    const sidebarEl = document.getElementById("sidebar-scroll");
    if (!sidebarEl) return;

    const handleScroll = () => {
      setShowScroll(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setShowScroll(false), 800);
    };

    sidebarEl.addEventListener("scroll", handleScroll);
    return () => sidebarEl.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleManagementMenu = (name: string) => {
    setOpenManagementMenu(openManagementMenu === name ? null : name);
  };

  // Hover handlers (desktop collapsed only)
  const handleHoverEnter = (e: React.MouseEvent, item: SidebarItemType) => {
    if (isCollapsed && item.children) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setHoveredElementPos({
        top: rect.top,
        left: rect.right + 8,
        height: rect.height,
      });
      setHoveredManagementMenu(item);
    }
  };

  const handleHoverLeave = () => {
    if (isCollapsed) {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredManagementMenu(null);
      }, 300);
    }
  };

  const handleItemClick = () => setHoveredManagementMenu(null);

  return (
    <>
      <aside
        className={clsx(
          "h-screen fixed top-0 left-0 transition-all duration-300 z-50",
          // Sidebar Background aur Border ke liye custom variables
          "bg-surface-card border-r border-border-primary", 
          
          "w-64",
          isCollapsed ? "lg:w-24" : "lg:w-64",
"sidebar-dark",
          isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />

        <nav
          id="sidebar-scroll"
          className={clsx(
            "mt-1 flex flex-col overflow-y-auto  h-[calc(100vh-80px)] pb-8 sidebar-scroll",
            isCollapsed
              ? "px-1 space-y-1 no-scrollbar"
              : "px-2 space-y-3 scrollbar-hidden",
            showScroll && "show-scroll"
          )}
        >
          {sidebarSections.map((section, index) => (
            <div key={index}>
              {!isCollapsed && (
                // Standard JavaScript comment ka upyog kiya gaya hai taki JSX parser confuse na ho
                <h2 className="px-3 mb-2 text-xs font-semibold uppercase text-text-subtle">
                  {section.section}
                </h2>
              )}
              {section.items.map((item) => (
                <div
                  key={item.name}
                  onMouseEnter={(e) => handleHoverEnter(e, item)}
                  onMouseLeave={handleHoverLeave}
                >
                  <MemoizedSidebarItem
                    item={item}
                    isCollapsed={isCollapsed}
                    isActive={
                      item.children
                        ? item.children.some((c) =>
                            activePath.startsWith(c.path || "")
                          )
                        : activePath.startsWith(item.path || "")
                    }
                    openManagementMenu={openManagementMenu}
                    toggleManagementMenu={toggleManagementMenu}
                    onItemClick={onItemClick} 
                  />
                </div>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Hovered submenu (desktop collapsed only) */}
      <SidebarSubmenu
        hoveredElementPos={hoveredElementPos}
        item={hoveredManagementMenu}
        handleHoverLeave={handleHoverLeave}
        handleItemClick={handleItemClick}
        activePath={activePath}
        isCollapsed={isCollapsed}
        hoverTimeoutRef={hoverTimeoutRef}
        onItemClick={onItemClick} // 👈 pass to close sidebar in mobile
      />
    </>
  );
};

export default Sidebar;