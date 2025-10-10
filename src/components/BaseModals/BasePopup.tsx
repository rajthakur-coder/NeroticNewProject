

import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";

interface BasePopupProps {
  open: boolean;
  children: ReactNode;
  position: { top: number; left: number };
  width?: string | number;
  height?: string | number;
  zIndex?: number;
  className?: string;
  animation?: "fade" | "scale" | "slide";
  onClose?: () => void;
  withOverlay?: boolean; // optional overlay
  lockScroll?: boolean; // optional scroll lock
}

const BasePopup = ({
  open,
  children,
  position,
  width = "auto",
  height = "auto",
  zIndex = 80,
  className,
  animation = "scale",
  onClose,
  withOverlay = true,
  lockScroll = true,
}: BasePopupProps) => {
  const [show, setShow] = useState(false);

  // --- Scroll Lock and Animation Logic ---
  useEffect(() => {
    if (open) {
      // 1. Scroll Lock
      if (lockScroll) document.body.style.overflow = "hidden";
      
      // 2. Start Animation (wait a tick for the portal to mount)
      const t = setTimeout(() => setShow(true), 20);

      return () => {
        clearTimeout(t);
        // NOTE: Scroll unlock is handled in the cleanup/return function below 
        // when 'open' turns false, ensuring it only runs on closure.
      };
    } else {
      // 3. Reverse Animation
      setShow(false);
    }

    // 4. Scroll Unlock (Cleanup function runs when 'open' changes from true to false)
    return () => {
      if (!open && lockScroll) {
        document.body.style.overflow = "";
      }
    };
  }, [open, lockScroll]); // Reruns when open or lockScroll changes

  if (!open) return null;

  return createPortal(
    <>
      {withOverlay && (
        <div
          className={clsx(
            "fixed inset-0 transition-colors duration-300",
            // Overlay uses standard dark transparent black, which is universally acceptable.
            "bg-black/20 dark:bg-black/40" 
          )}
          style={{ zIndex: zIndex - 1 }}
          onClick={onClose}
        />
      )}

      <div
        className={clsx(
          "absolute transition-all duration-300 ease-out rounded-xl",
          // animations
          animation === "scale" &&
            (show ? "scale-100 opacity-100" : "scale-95 opacity-0 translate-y-2"),
          animation === "fade" && (show ? "opacity-100" : "opacity-0"),
          animation === "slide" &&
            (show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"),
            
          // FIXED: Default popup colors use semantic classes
          // Popup body: uses semantic surface and border colors
          "bg-surface-card border border-border-primary shadow-lg dark:shadow-black/40",
          className
        )}
        style={{
          top: position.top,
          left: position.left,
          width,
          height,
          zIndex,
        }}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

export default BasePopup;