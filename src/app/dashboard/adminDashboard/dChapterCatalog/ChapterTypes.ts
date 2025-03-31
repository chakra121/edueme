// ChapterTypes.ts - Types and interfaces
export interface Course {
  id: string;
  courseName: string;
}

export interface Chapter {
  id: string;
  chapterCode: string;
  chapterName: string;
  chapterDescription: string;
  courseID: string;
  courseName?: string;
  isCompleted?: boolean;
  notesLink: string;
  classes?: string | number;
  _count?: {
    classes: number;
  };
}

export interface ToastMessage {
  message: string;
  type: "success" | "error" | null;
}

export interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  teacher?: { teacherName: string } | null;
  _count: { chapters: number }; 
}