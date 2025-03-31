// TeacherTypes.ts
export interface Teacher {
  teacherName: string;
  phoneNumber: string;
  email: string;
  employeeID: string;
  course: { courseName: string };
  createdAt: string;
}

export interface Course {
  id: string;
  courseName: string;
  courseCode: string;
}

export interface TeacherFormData {
  teacherName: string;
  phoneNumber: string;
  email: string;
  password: string;
  employeeID: string;
  courseID: string;
}

export interface RegisterTeacherResponse {
  success: boolean;
  message?: string;
}

export interface UpdateTeacherData {
  teacherName: string;
  phoneNumber: string;
  employeeID: string;
}
