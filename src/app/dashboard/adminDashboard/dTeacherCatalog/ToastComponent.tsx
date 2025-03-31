// ToastComponent.tsx
"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

export default function ToastComponent({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  const alertClass = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
  }[type];

  return (
    <div className="z-10 toast toast-end toast-bottom">
      <div className={`alert ${alertClass}`}>
        <span>{message}</span>
      </div>
    </div>
  );
}
