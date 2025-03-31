// ChapterService.ts - Data fetching and API interactions
"use client";
import type { Chapter,Course } from "./ChapterTypes";

export const fetchCourses = async () => {
  try {
    const response = await fetch("/api/admin/courses/getCourse");
    if (!response.ok) throw new Error("Failed to fetch courses");
    return (await response.json()) as Course[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchChapters = async (): Promise<Chapter[]> => {
  try {
    const response = await fetch("/api/admin/chapters/getChapters");
    if (!response.ok) throw new Error("Failed to fetch chapters");
    return (await response.json()) as Chapter[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createChapter = async (data: {
  chapterCode: string;
  chapterName: string;
  chapterDescription: string;
  notesLink: string;
  courseID: string;
}) => {
  try {
    const response = await fetch("/api/admin/chapters/createChapter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to create chapter");
    }

    return { success: true, message: "Chapter created successfully!" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};
