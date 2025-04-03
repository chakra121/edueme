// lib/types.ts
export interface BaseUser {
  id: string;
  email: string;
  hashedPassword: string;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
}

export interface Student extends BaseUser {
  firstName: string;
  lastName: string;
  gender: string;
  grade: string;
  schoolName: string;
  phoneNumber: string;
  parentEmail: string;
  userRole: string;
  photoLink?: string | null;
  courseID?: string | null;
  teacherID?: string | null;
  createdAt: Date;
  updatedAt: Date;
  classLinkId?: string | null;
}

export interface Teacher extends BaseUser {
  teacherName: string;
  phoneNumber: string;
  employeeID: string;
  photoLink?: string | null;
  userRole: string;
  courseID?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Admin extends BaseUser {
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
}

export type UserType = "user" | "teacher" | "admin";
