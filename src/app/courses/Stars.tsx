import React from "react";

export default function StarRating() {
  const rating = 4.7;
  const totalStars = 5;

  // Create an array for stars
  const stars = Array.from({ length: totalStars }, (_, index) => {
    if (rating >= index + 1) {
      return "full"; // Full star
    } else if (rating > index && rating < index + 1) {
      return "half"; // Half star
    } else {
      return "empty"; // Empty star
    }
  });

  return (
    <div className="flex items-center space-x-2">
      <span className="text-lg font-bold text-orange-500">
        {rating.toFixed(1)}
      </span>
      <div className="flex text-xl text-orange-500">
        {stars.map((star, idx) => (
          <span key={idx}>
            {star === "full" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="h-5 w-5"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927a1 1 0 011.902 0l1.34 4.125a1 1 0 00.95.691h4.235a1 1 0 01.59 1.809l-3.43 2.574a1 1 0 00-.364 1.118l1.34 4.125a1 1 0 01-1.538 1.118L10 14.434l-3.43 2.574a1 1 0 01-1.538-1.118l1.34-4.125a1 1 0 00-.364-1.118L2.579 9.552a1 1 0 01.59-1.809h4.235a1 1 0 00.95-.691L9.049 2.927z" />
              </svg>
            )}
            {star === "half" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="h-5 w-5"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927a1 1 0 011.902 0l1.34 4.125a1 1 0 00.95.691h4.235a1 1 0 01.59 1.809l-3.43 2.574a1 1 0 00-.364 1.118l1.34 4.125a1 1 0 01-1.538 1.118L10 14.434V2.927z" />
              </svg>
            )}
            {star === "empty" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927a1 1 0 011.902 0l1.34 4.125a1 1 0 00.95.691h4.235a1 1 0 01.59 1.809l-3.43 2.574a1 1 0 00-.364 1.118l1.34 4.125a1 1 0 01-1.538 1.118L12 14.812l-3.83 2.877a1 1 0 01-1.538-1.118l1.34-4.125a1 1 0 00-.364-1.118L2.18 9.552a1 1 0 01.59-1.809h4.235a1 1 0 00.95-.691l1.34-4.125z"
                />
              </svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
