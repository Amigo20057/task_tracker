import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MessageBoxProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

export default function MessageBox({
  message,
  type,
  onClose,
}: MessageBoxProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-5 right-5 ${bgColors[type]} text-white px-5 py-3 rounded-lg shadow-lg z-50`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
