// components/PurchaseCourseButton.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Courses } from "@prisma/client";
import Link from "next/link";

interface PurchaseCourseButtonProps {
  course: Courses;
  userId: string;
}

export default function PurchaseCourseButton({
  course,
  userId,
}: PurchaseCourseButtonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [canPurchase, setCanPurchase] = useState(false);
  const [existingCourseId, setExistingCourseId] = useState<string | null>(null);
  const [existingCourseCode, setExistingCourseCode] = useState<string | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    // Check if the user already has a course
    const checkCourseAccess = async () => {
      try {
        const response = await fetch("/api/buyCourse/check-purchasable");
        if (!response.ok) {
          throw new Error("Failed to check course access");
        }

        const data = await response.json();
        setCanPurchase(data.canPurchase);

        if (!data.canPurchase && data.existingCourse) {
          setExistingCourseId(data.existingCourse.courseId);

          // Get the course code for the existing course
          const courseResponse = await fetch(
            `/api/buyCourse/id-param/${data.existingCourse.courseId}`,
          );
          if (courseResponse.ok) {
            const courseData = await courseResponse.json();
            setExistingCourseCode(courseData.courseCode);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error checking course access:", error);
        setIsLoading(false);
        // Default to allowing purchase if check fails
        setCanPurchase(true);
      }
    };

    checkCourseAccess();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-4 flex items-center justify-center">
        <button className="btn btn-primary" disabled>
          <span className="loading loading-spinner loading-md"></span>
          Checking...
        </button>
      </div>
    );
  }

  if (!canPurchase && existingCourseCode) {
    return (
      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="alert alert-warning mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>
            You have already purchased a course. Access your course from your
            dashboard
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 flex items-center justify-center">
      <Link
        href={`/courses/checkout?courseId=${course.id}`}
        className="btn btn-primary"
      >
        Purchase Course for ₹{course.courseFee}
      </Link>
    </div>
  );
}
