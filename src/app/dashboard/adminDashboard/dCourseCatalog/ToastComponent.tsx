import React from "react";
import type { ToastMessage } from "./CourseTypes";

type ToastProps = {
  toast: ToastMessage;
};

const ToastComponent: React.FC<ToastProps> = ({ toast }) => {
  if (!toast.type) return null;

  return (
    <div className="toast toast-end transition-opacity">
      <div
        className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"}`}
      >
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

export default ToastComponent;
