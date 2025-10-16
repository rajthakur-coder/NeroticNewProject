// src/components/Common/AnimatedDropdown.tsx
import React, { useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedDropdownProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  button: ReactNode; // The button that triggers the dropdown
  children: ReactNode; // The content of the dropdown
  // Optional positioning classes, defaults to bottom-full right-0
  positionClasses?: string;
}

const AnimatedDropdown: React.FC<AnimatedDropdownProps> = ({
  isOpen,
  setIsOpen,
  button,
  children,
  positionClasses = "bottom-full right-0",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Effect to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Toggle Button */}
      <div onClick={() => setIsOpen(!isOpen)}>{button}</div>

      {/* Animated Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-20 p-1 mb-2 overflow-hidden border rounded-lg shadow-lg bg-surface-card border-border-primary ${positionClasses}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedDropdown;