import { useState, useEffect } from "react";
import type { ReactNode } from "react";

import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop collapse
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile toggle
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Sidebar width values
  const collapsedWidth = "6rem"; // 24 (96px)
  const expandedWidth = "16rem"; // 64 (256px)

  // Calculate main content margin dynamically
  const mainMarginLeft = isMobile
    ? 0
    : isCollapsed
    ? collapsedWidth
    : expandedWidth;

  return (
    // Main wrapper can use a utility class for background, if needed, but inheriting is fine.
    <div className="flex h-screen ">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onItemClick={() => isMobile && setIsMobileOpen(false)}
      />

      {/* Overlay for mobile */}
      {isMobile && isMobileOpen && (
        <div
          // Overlay color is typically a utility or solid color, but we can use an opinionated variable if defined.
          // Keeping it black/50 is a common and effective practice.
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className="flex flex-col flex-1 transition-all duration-300 ease-in-out w-36"
        style={{
          // Dynamically set margin based on sidebar state
          marginLeft: mainMarginLeft,
        }}
      >
        <Topbar
          isCollapsed={isCollapsed}
          toggleSidebar={() =>
            isMobile
              ? setIsMobileOpen(!isMobileOpen)
              : setIsCollapsed(!isCollapsed)
          }
          isMobile={isMobile}
        />

        <main 
          // Main background uses the semantic surface-body variable
          className="flex-1 p-4 mt-16 overflow-auto custom-scrollbar bg-surface-body"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutWrapper;