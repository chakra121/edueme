// components/PurchaseCourseButton.tsx
"use client";

import { useState, useEffect } from "react";
import { type Courses } from "@prisma/client";
import Link from "next/link";

interface PurchaseCourseButtonProps {
  course: Courses;
  userId: string;
}

export default function PurchaseCourseButton({
  course,
}: PurchaseCourseButtonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [canPurchase, setCanPurchase] = useState(false);
  const [existingCourseCode, setExistingCourseCode] = useState<string | null>(
    null,
  );
  

  useEffect(() => {
    // Check if the user already has a course
    const checkCourseAccess = async () => {
      try {
        const response = await fetch("/api/buyCourse/check-purchasable");
        if (!response.ok) {
          throw new Error("Failed to check course access");
        }

        interface CheckCourseAccessResponse {
          canPurchase: boolean;
          existingCourse?: { courseId: string };
        }
        const json = (await response.json()) as CheckCourseAccessResponse;
        const data = {
          canPurchase: json.canPurchase,
          existingCourse: json.existingCourse
            ? { courseId: json.existingCourse.courseId }
            : undefined,
        };
        setCanPurchase(data.canPurchase);

        if (!data.canPurchase && data.existingCourse) {
          setExistingCourseCode(data.existingCourse.courseId);

          // Get the course code for the existing course
          const courseResponse = await fetch(
            `/api/buyCourse/id-param/${data.existingCourse.courseId}`,
          );
          if (courseResponse.ok) {
            interface CourseData {
              courseCode: string;
            }
            const courseData = (await courseResponse.json()) as CourseData;
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

    void checkCourseAccess();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-5 flex items-center justify-center">
        <button className="btn btn-primary" disabled>
          <span className="loading loading-spinner loading-md"></span>
          Checking...
        </button>
      </div>
    );
  }

  if (!canPurchase && existingCourseCode) {
    return (
      <div className="mt-5 flex justify-center">
        <div
          role="alert"
          className="alert alert-success alert-outline w-auto px-4"
        >
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-lg font-medium whitespace-nowrap">
            You have already purchased a course. Access your course from your
            dashboard
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 flex items-center justify-center">
      <Link
        href={`/courses/checkout?courseId=${course.id}`}
        className="btn btn-primary"
      >
        Purchase Course for ₹{course.courseFee}
      </Link>
    </div>
  );
}
