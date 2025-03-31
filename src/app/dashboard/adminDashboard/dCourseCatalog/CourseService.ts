// CourseService.ts
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

export type ServiceResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export const CourseService = {
  // Fetch all courses
  fetchCourses: async (): Promise<Course[]> => {
    const res = await fetch("/api/admin/courses/getCourse");
    if (!res.ok) throw new Error("Failed to fetch courses");
    return (await res.json()) as Course[];
  },

  // Create a new course
  createCourse: async (data: CourseFormData): Promise<ServiceResponse> => {
    const response = await fetch("/api/admin/courses/createCourse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create course");
    }

    return {
      success: true,
      message: "Course created successfully!",
    };
  },

  // Delete course (using server action)
  deleteCourse: async (id: string): Promise<ServiceResponse> => {
    // This is a wrapper for your server action
    return await window.deleteCourse(id);
  },

  // Update course (using server action)
  updateCourse: async (
    id: string,
    data: CourseFormData,
  ): Promise<ServiceResponse> => {
    // This is a wrapper for your server action
    return await window.updateCourse(id, data);
  },
};

// Add these to make TypeScript happy with the global declarations
declare global {
  interface Window {
    deleteCourse: (id: string) => Promise<ServiceResponse>;
    updateCourse: (
      id: string,
      data: CourseFormData,
    ) => Promise<ServiceResponse>;
  }
}
