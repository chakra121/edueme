// ToastComponent.tsx - Reusable toast notification
"use client";
import React from "react";
import type { ToastMessage } from "./ChapterTypes";

interface ToastProps {
  toast: ToastMessage;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  if (!toast.message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div
        className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"} shadow-lg`}
      >
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
