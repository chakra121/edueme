"use client";
import { useState } from "react";
import { revalidatePath } from "next/cache";

export default function ClassForm({
  chapterId,
  onClose,
}: {
  chapterId: string;
  onClose: () => void;
}) {
  const [classTitle, setClassTitle] = useState("");
  const [classLink, setClassLink] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">("success");


  async function handleSubmit() {
    const res = await fetch("/api/class", {
      method: "POST",
      body: JSON.stringify({ chapterId, classTitle, classLink }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Class added successfully!");
      setMessageType("success");

     setTimeout(() => {
       setMessage(null);
       onClose(); // Close modal after success
     }, 2000);
    } else {
      setMessage(`Error: ${data.error}`);
      setMessageType("error");
    }
  }

  return (
    <div>
      <label className="label">
        <span className="label-text text-base-content">Class Title:</span>
      </label>
      <input
        type="text"
        placeholder="Class Title"
        className="input input-bordered mb-4 w-full"
        value={classTitle}
        onChange={(e) => setClassTitle(e.target.value)}
      />
      <label className="label">
        <span className="label-text text-base-content">YouTube Link:</span>
      </label>
      <input
        type="text"
        placeholder="YouTube Link"
        className="input input-bordered mb-4 w-full"
        value={classLink}
        onChange={(e) => setClassLink(e.target.value)}
      />
      <button className="btn btn-primary mb-4 w-full" onClick={handleSubmit}>
        Submit
      </button>
      {message && (
        <div className={`alert-${messageType} alert mb-2`}>
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
