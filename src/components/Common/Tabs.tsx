

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Icon from "../ui/Icon";

export interface Tab {
  name: string;
  key: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  selectedTab: string;
  onTabChange: (key: string) => void;
}

interface TabColor {
  countBg: string;
  countDarkBg: string;
  countActiveBg: string;
  countActiveDarkBg: string;
}

const TAB_COLORS: Record<string, TabColor> = {
  All: {
    countBg: "bg-[#1C252E] text-[#FFFFFF]",
    countDarkBg: "dark:bg-[#FFFFFF] dark:text-black",
    countActiveBg: "bg-[#1C252E] text-white",
    countActiveDarkBg: "dark:bg:white dark:text-[#1C252E]",
  },
  // Pending: {
  //   countBg: "bg-[#FFAB0029] text-[#B76E00]",
  //   countDarkBg: "dark:bg-[#403A27] dark:text-[#FFD600]",
  //   countActiveBg: "bg-[#FFAB00] text-white",
  //   countActiveDarkBg: "dark:bg-[#FFAB00] dark:text-black",
  // },
  Active: {
    countBg: "bg-[#22C55E29] text-[#118057]",
    countDarkBg: "dark:bg-[#164E2B] dark:text-[#77ED8B]",
    countActiveBg: "bg-[#22C55E] text-white",
    countActiveDarkBg: "dark:bg-[#22C55E] dark:text:white",
  },
  Inactive: {
    countBg: "bg-[#FF563029] text-[#B71D18]",
    countDarkBg: "dark:bg-[#40241F] dark:text-[#FFAC82]",
    countActiveBg: "bg-[#FF5630] text:white",
    countActiveDarkBg: "dark:bg-[#FF5630] dark:text:white",
  },
  // Refunded: {
  //   countBg: "bg-[#919EAB29] text-[#637381]",
  //   countDarkBg: "dark:bg-[#374151] dark:text-[#919EAB]",
  //   countActiveBg: "bg-[#1C252E] text-[#ffff]",
  //   countActiveDarkBg: "dark:bg-[#ffff] dark:text-[#1C252E]",
  // },
};

const Tabs: React.FC<TabsProps> = ({ tabs, selectedTab, onTabChange }) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [underlinePos, setUnderlinePos] = useState({ left: 0, width: 0 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Update underline + auto-scroll
  useEffect(() => {
    const updateUnderline = () => {
      const index = tabs.findIndex((tab) => tab.key === selectedTab);
      const currentTab = tabRefs.current[index];
      if (currentTab && containerRef.current) {
        const rect = currentTab.getBoundingClientRect();
        const parentRect = containerRef.current.getBoundingClientRect();
        const left = rect.left - parentRect.left + containerRef.current.scrollLeft;

        setUnderlinePos({ left, width: currentTab.offsetWidth });

        // Smooth scroll selected tab into view
        currentTab.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    };

    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [selectedTab, tabs]);

  // Check scroll buttons visibility
  useEffect(() => {
    const checkScroll = () => {
      if (!containerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    checkScroll();
    containerRef.current?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      containerRef.current?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({
      left: -containerRef.current.offsetWidth / 2,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({
      left: containerRef.current.offsetWidth / 2,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full ">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          data-no-ripple
          className="absolute left-0 z-10 flex items-center justify-start w-8 h-8 -translate-y-1/2 top-1/2"
        >
          <Icon name="bx:chevron-left" className="text-lg text-gray-600" />
        </button>
      )}

      {/* Tabs Container */}
      <div
      data-no-ripple
        role="tablist"
        ref={containerRef}
        className="relative flex items-center gap-6 pb-2 pl-0 pr-0 overflow-x-auto border-b ml-7 border-border-primary flex-nowrap no-scrollbar sm:px-30 sm:pl-0 sm:pr-0 lg:ml-0 lg:mr-0 mr-7"
      >
        {tabs.map((tab, index) => {
          const colors = TAB_COLORS[tab.key] || TAB_COLORS["All"];
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={selectedTab === tab.key}
              className={clsx(
                "flex items-center gap-2 px-0 lg:px-3  lg:ml-0 py-2 text-[13px] font-medium transition-colors duration-200 min-w-fit max-w-full whitespace-nowrap",
                selectedTab === tab.key
                  ? "text-text-main font-semibold"
                  : "text-text-subtle"
              )}
              onClick={() => onTabChange(tab.key)}
              ref={(el) => (tabRefs.current[index] = el)}
            >
              <span title={tab.name}>{tab.name}</span>
              {typeof tab.count === "number" && (
                <span
                  className={clsx(
                    "px-2 py-1 rounded-md text-xs font-bold transition",
                    selectedTab === tab.key
                      ? `${colors.countActiveBg} ${colors.countActiveDarkBg}`
                      : `${colors.countBg} ${colors.countDarkBg}`
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}

        {/* Underline */}
        <motion.div
          className="absolute bottom-0 h-[2px] bg-black dark:bg-white rounded-full"
          animate={{ left: underlinePos.left, width: underlinePos.width }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          data-no-ripple
          className="absolute right-0 z-10 flex items-center justify-end w-8 h-8 -translate-y-1/2 top-1/2"
        >
          <Icon name="bx:chevron-right" className="text-lg text-main" />
        </button>
      )}
    </div>
  );
};

export default Tabs;
