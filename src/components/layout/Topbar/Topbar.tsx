// import { useEffect, useState } from "react";
// import TopbarLeft from "./TopbarLeft";
// import TopbarRight from "./TopbarRight";

// interface TopbarProps {
//   isCollapsed: boolean;
//   toggleSidebar: () => void;
//   isMobile: boolean;
// }

// const Topbar = ({ isCollapsed, toggleSidebar, isMobile }: TopbarProps) => {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 5);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const headerWidthClass = isMobile
//     ? "left-0 w-full"
//     : isCollapsed
//     ? "left-24 w-[calc(100%-6rem)]"
//     : "left-64 w-[calc(100%-16rem)]";

//   return (
//     <header
//       className={`fixed top-0 h-16 flex items-center justify-between px-4 shadow-md  transition-all duration-300 z-10 ${
//         scrolled
//           ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur"
//           : "bg-white dark:bg-gray-800"
//       } ${headerWidthClass}`}
//     >
//       <TopbarLeft toggleSidebar={toggleSidebar} isMobile={isMobile} />
//       <TopbarRight />
//     </header>
//   );
// };

// export default Topbar;











import { useEffect, useState } from "react";
import TopbarLeft from "./TopbarLeft";
import TopbarRight from "./TopbarRight";
import clsx from "clsx";

interface TopbarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
}

const Topbar = ({ isCollapsed, toggleSidebar, isMobile }: TopbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check scroll position only on window (if main content is scrollable)
    const handleScroll = () => setScrolled(window.scrollY > 5);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate header position and width based on sidebar state
  const headerWidthClass = isMobile
    ? "left-0 w-full"
    : isCollapsed
    ? "left-24 w-[calc(100%-6rem)]"
    : "left-64 w-[calc(100%-16rem)]";

  // Semantic background class (bg-surface-body handles both light and dark)
  const baseBgClass = "bg-surface-card";

  return (
    <header
      className={clsx(
        "fixed top-0 h-16 flex items-center justify-between px-4 shadow-md transition-all duration-300 z-10",
        headerWidthClass,
        
        // Background logic using the semantic variable
        scrolled
          ? `${baseBgClass}/90 backdrop-blur` // Scrolled: Add slight transparency and blur
          : baseBgClass // Default: Solid background color
      )}
    >
      <TopbarLeft toggleSidebar={toggleSidebar} isMobile={isMobile} />
      <TopbarRight />
    </header>
  );
};

export default Topbar;






