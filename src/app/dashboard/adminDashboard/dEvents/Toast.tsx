"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
};

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast toast-end z-50">
      <div
        className={`alert ${type === "success" ? "alert-success" : "alert-error"}`}
      >
        <span>{message}</span>
      </div>
    </div>
  );
};