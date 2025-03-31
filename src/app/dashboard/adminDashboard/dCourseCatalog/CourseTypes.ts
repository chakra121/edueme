// CourseTypes.ts
export type Course = {
  id: string;
  courseCode: string;
  courseName: string;
  teacher: string;
  chapters: string | number;
};

export type CourseFormData = {
  courseCode: string;
  courseName: string;
};

export type ToastMessage = {
  message: string;
  type: "success" | "error" | null;
};
