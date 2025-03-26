"use client";
import { useState } from "react";

// Define API response type
interface ApiResponse {
  success?: boolean;
  error?: string;
}

export default function ClassForm({
  chapterId,
  onClose,
}: {
  chapterId: string;
  onClose: () => void;
}) {
  const [classTitle, setClassTitle] = useState<string>("");
  const [classLink, setClassLink] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );

  async function handleSubmit() {
    try {
      const res = await fetch("/api/class", {
        method: "POST",
        body: JSON.stringify({ chapterId, classTitle, classLink }),
        headers: { "Content-Type": "application/json" },
      });

      // Parse JSON response safely
      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add class");
      }

      setMessage("Class added successfully!");
      setMessageType("success");

      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 2000);
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
      setMessageType("error");
    }
  }

  return (
    <div>
      {/* Form Content */}
      <div>
        <label className="label mb-1">
          <span className="label-text text-base-content">Class Title:</span>
        </label>
        <input
          type="text"
          placeholder="Class Title"
          className="input input-bordered mb-4 w-full"
          value={classTitle}
          onChange={(e) => setClassTitle(e.target.value)}
        />
        <label className="label mb-1">
          <span className="label-text text-base-content">YouTube Link:</span>
        </label>
        <input
          type="text"
          placeholder="YouTube Link"
          className="input input-bordered mb-4 w-full"
          value={classLink}
          onChange={(e) => setClassLink(e.target.value)}
        />
      </div>

      <button className="btn btn-primary mb-3 w-full" onClick={handleSubmit}>
        Submit
      </button>

      {/* Toast Notification */}
      {message && (
        <div className="fixed bottom-5 right-5 z-50">
          <div
            className={`alert ${messageType === "success" ? "alert-success" : "alert-error"} shadow-lg`}
          >
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
