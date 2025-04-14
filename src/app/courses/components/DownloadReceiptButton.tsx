// components/DownloadReceiptButton.tsx
"use client";

import { useState } from "react";

interface DownloadReceiptButtonProps {
  paymentId: string;
}

export default function DownloadReceiptButton({
  paymentId,
}: DownloadReceiptButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const downloadReceipt = async () => {
    try {
      setIsLoading(true);

      // Get the receipt PDF
      const response = await fetch(
        `/api/payments/generate-receipt?paymentId=${paymentId}`,
        {
          method: "GET",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to generate receipt");
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${paymentId}.pdf`;

      // Append the anchor to the body
      document.body.appendChild(a);

      // Click the anchor
      a.click();

      // Remove the anchor
      document.body.removeChild(a);

      // Revoke the URL to free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Receipt download failed:", error);
      alert("Failed to download receipt. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={downloadReceipt}
      disabled={isLoading}
      className="btn btn-block bg-green-500 text-white hover:bg-green-600"
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        "Download Receipt"
      )}
    </button>
  );
}
