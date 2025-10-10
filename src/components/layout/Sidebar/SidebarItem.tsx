import { useState } from "react";
import type { ReactNode } from "react";
import ProgressLink from "../../ui/ProgressLink";
import Icon from "../../ui/Icon";
// import { createRipple } from "../../../hooks/useRipple";
import clsx from "clsx";

interface SidebarChild {
  name: string;
  path: string;
}

interface SidebarItemProps {
  item: {
    name: string;
    path?: string;
    icon: ReactNode;
    children?: SidebarChild[];
  };
  isCollapsed: boolean;
  isActive: boolean;
  openManagementMenu?: string | null;
  toggleManagementMenu?: (name: string) => void;
  onItemClick?: () => void; // 👈 mobile close
}

const SidebarItem = ({
  item,
  isCollapsed,
  isActive,
  openManagementMenu,
  toggleManagementMenu,
  onItemClick,
}: SidebarItemProps) => {
  const hasChildren = !!item.children?.length;
  const [activeChild, setActiveChild] = useState<string | null>(null);

  return (
    <div className="relative w-full">
      {hasChildren ? (
        <button
          onClick={() => toggleManagementMenu?.(item.name)}
          data-ripple
          className={clsx(
            "sidebar-item transition-all duration-200",
            isCollapsed
              ? "flex-col py-2 px-1 gap-1"
              : "flex-row px-4 py-3 gap-2 justify-between",
            isActive
              ? "sidebar-item-active" // Custom active state class
              : "text-text-secondary hover:bg-surface-hover" // Default colors replaced
          )}
        >
          {/* Icon + Label */}
          <div
            className={clsx(
              "flex items-center",
              isCollapsed ? "flex-col gap-1" : "flex-row gap-2 flex-1"
            )}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && <span className="ml-1 text-sm">{item.name}</span>}
          </div>

          {/* Arrow */}
          <span
            className={clsx(
              "absolute right-3 top-5 -translate-y-1/2 text-sm transition-transform duration-200",
              !isCollapsed && openManagementMenu === item.name && "rotate-180"
            )}
          >
            <Icon
              name={isCollapsed ? "bx:chevron-right" : "bx:chevron-down"}
              size={16}
            />
          </span>

          {/* Label under icon if collapsed */}
          {isCollapsed && <span className="text-[10px] mt-1">{item.name}</span>}
        </button>
      ) : (
        <ProgressLink
          to={item.path || "#"}
          data-ripple
          className={clsx(
            "sidebar-item mt-1 transition-all duration-200",
            isCollapsed
              ? "flex-col justify-center py-2 px-1 gap-1"
              : "flex-row px-4 py-3 gap-2",
            isActive
              ? "sidebar-item-active" // Custom active state class
              : "text-text-secondary hover:bg-surface-hover" // Default colors replaced
          )}
          onClick={() => {
            setActiveChild(item.name);
            onItemClick?.(); // 👈 mobile close
          }}
        >
          <span className="text-xl">{item.icon}</span>
          <span className={clsx(isCollapsed ? "text-[10px]" : "ml-1 text-sm")}>
            {item.name}
          </span>
        </ProgressLink>
      )}

      {/* Children (expanded only in desktop expanded mode) */}
      {hasChildren && !isCollapsed && (
        <div
          className={clsx(
            "flex flex-col ml-10 mt-1 space-y-1 border-l-2 border-border-secondary overflow-hidden transition-all duration-300",
            openManagementMenu === item.name ? "max-h-[500px]" : "max-h-0"
          )}
        >
          {item.children?.map((child) => (
      <div key={child.name} className="relative flex items-center">
        
<span
  className="absolute -left-[2px] w-3 h-2 border-l-2 border-b-2 border-border-secondary bg-surface-card z-10 rounded-bl-full"
></span>
    
       
 <ProgressLink
              key={child.name}
              to={child.path}
              className={clsx(
                "sidebar-submenu-item ml-2.5 mt-1 relative flex items-center w-full overflow-hidden text-sm rounded-lg hover:bg-surface-hover",
                // Default text color
                "text-text-secondary", 
                
                // Active state logic
                activeChild === child.name ||
                  window.location.pathname.startsWith(child.path)
                  ? "bg-surface-active sidebar-submenu-item-active" // Active background replaced
                  : ""
              )}
            
              onClick={() => {
                setActiveChild(child.name);
                onItemClick?.(); // 👈 mobile close
              }}
            >
              <span className="py-2 pl-4">{child.name}</span>
            </ProgressLink>
      </div>
          ))}
        </div>
      )}


















{/* 
{hasChildren && !isCollapsed && (
  <div
    className={clsx(
      "relative flex flex-col ml-8 mt-2 pl-4 space-y-2 overflow-hidden transition-all duration-300",
      openManagementMenu === item.name ? "max-h-[500px]" : "max-h-0"
    )}
  >
    <span className="absolute left-1 top-0 bottom-0 w-[2px] bg-border-secondary rounded-full" />

    {item.children?.map((child, index) => (
      <div key={child.name} className="relative flex items-center">
        <span className="absolute -left-[7px] w-3 h-3 bg-surface-card border-2 border-border-secondary rounded-full z-10" />

        <ProgressLink
          to={child.path}
          className={clsx(
            "sidebar-submenu-item relative flex items-center w-full text-sm rounded-lg py-2 pl-4 transition-all duration-200 hover:bg-surface-hover",
            "text-text-secondary",
            activeChild === child.name ||
              window.location.pathname.startsWith(child.path)
              ? "bg-surface-active sidebar-submenu-item-active"
              : ""
          )}
          onClick={() => {
            setActiveChild(child.name);
            onItemClick?.();
          }}
        >
          {child.name}
        </ProgressLink>
      </div>
    ))}
  </div>
)}

 */}








    </div>
  );
};

export default SidebarItem;