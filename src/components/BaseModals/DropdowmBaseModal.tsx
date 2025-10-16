import React from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Icon from "../ui/Icon";
import { shakeAnimation } from "../../assets/functions/modalShake";

interface CenteredSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

const CenteredSearchModal: React.FC<CenteredSearchModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-sm",
}) => {
  const controls = useAnimation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm"
          onClick={() => shakeAnimation(controls)} // global function call
        >
          <motion.div
            key="modal"
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={controls}
            exit={{ y: 0, opacity: 0, scale: 1 }}
            className={`w-full ${maxWidth} overflow-hidden rounded-xl shadow-2xl bg-surface-card`}
            onClick={(e) => e.stopPropagation()} // stop propagation
          >
            <div className="flex items-center justify-between p-4 border-b border-border-primary">
              <h3 className="text-lg font-semibold text-text-main">{title}</h3>
              <button
                className="p-1.5 rounded-full text-text-subtle hover:bg-surface-hover hover:text-text-main transition-colors"
                onClick={onClose} // close only on button
              >
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CenteredSearchModal;
