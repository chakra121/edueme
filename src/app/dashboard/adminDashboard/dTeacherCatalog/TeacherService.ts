import type {
  Course,
  Teacher,
  TeacherFormData,
  UpdateTeacherData,
} from "./TeacherTypes";

// Import server actions directly
import { deleteTeacher as deleteTeacherAction } from "@/app/actions/deleteTeacher";
import { updateTeacher as updateTeacherAction } from "@/app/actions/updateTeacher";

export async function registerTeacher(
  teacherData: TeacherFormData & { userRole: string },
): Promise<{ success: boolean; message: string }> {
  const response = await fetch("/api/auth/registerTeacher", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teacherData),
  });

  return (await response.json()) as { success: boolean; message: string };
}

export async function fetchTeachers(): Promise<Teacher[]> {
  try {
    const response = await fetch("/api/teachers", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch teachers: ${response.status} ${response.statusText}`,
      );
    }

    // Debug the response
    const data: unknown = await response.json();
    console.log("Raw teachers data:", data);

    // Check if the data is an array
    if (!Array.isArray(data)) {
      console.error("Teachers data is not an array:", data);

      // If it's an object with a specific structure, try to extract teachers
      if (
        data &&
        typeof data === "object" &&
        "teachers" in data &&
        Array.isArray(data.teachers)
      ) {
        console.log("Found teachers array in response object");
        return data.teachers as Teacher[];
      }

      return []; // Return empty array if no valid data found
    }

    return data as Teacher[];
  } catch (error) {
    console.error("Error in fetchTeachers:", error);
    throw error;
  }
}

export async function fetchCourses(): Promise<Course[]> {
  try {
    const res = await fetch("/api/teachers/coursesDrop", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch courses: ${res.status} ${res.statusText}`,
      );
    }

    // Debug the response
    const data: unknown = await res.json();
    console.log("Raw courses data:", data);

    // Check if the data is an array
    if (!Array.isArray(data)) {
      console.error("Courses data is not an array:", data);

      // If it's an object with a specific structure, try to extract courses
      if (
        data &&
        typeof data === "object" &&
        "courses" in data &&
        Array.isArray(data.courses)
      ) {
        console.log("Found courses array in response object");
        return data.courses as Course[];
      }

      return []; // Return empty array if no valid data found
    }

    return data as Course[];
  } catch (error) {
    console.error("Error in fetchCourses:", error);
    throw error;
  }
}

// Use the server action directly instead of a fetch call
export async function deleteTeacher(
  email: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const result = await deleteTeacherAction(email);
    return result;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return {
      success: false,
      message: "An error occurred while deleting the teacher",
    };
  }
}

// Use the server action directly instead of a fetch call
export async function updateTeacher(
  email: string,
  updateData: UpdateTeacherData,
): Promise<{ success: boolean; message: string }> {
  try {
    const result = await updateTeacherAction(email, updateData);
    return result;
  } catch (error) {
    console.error("Error updating teacher:", error);
    return {
      success: false,
      message: "An error occurred while updating the teacher",
    };
  }
}
