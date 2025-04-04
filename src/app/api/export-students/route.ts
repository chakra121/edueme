import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import prisma from "@/lib/globalPrisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Fetch all students (users with userRole = 'student')
    const students = await prisma.user.findMany({
      where: {
        userRole: "student",
      },
      include: {
        course: true, // Include course information
      },
    });

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Students");

    // Define columns
    worksheet.columns = [
      { header: "First Name", key: "firstName", width: 15 },
      { header: "Last Name", key: "lastName", width: 15 },
      { header: "Gender", key: "gender", width: 10 },
      { header: "Grade", key: "grade", width: 10 },
      { header: "School Name", key: "schoolName", width: 25 },
      { header: "Phone Number", key: "phoneNumber", width: 15 },
      { header: "Email", key: "email", width: 25 },
      { header: "Parent Email", key: "parentEmail", width: 25 },
      { header: "Course", key: "course", width: 20 },
      { header: "Registration Date", key: "createdAt", width: 15 },
    ];

    // Style the header row
    worksheet.getRow(1).font = { bold: true };

    // Add rows to the worksheet
    students.forEach((student) => {
      worksheet.addRow({
        firstName: student.firstName,
        lastName: student.lastName,
        gender: student.gender,
        grade: student.grade,
        schoolName: student.schoolName,
        phoneNumber: student.phoneNumber,
        email: student.email,
        parentEmail: student.parentEmail,
        course: student.course ? student.course.courseName : "NA", // Assuming course has a name field
        createdAt: new Date(student.createdAt)
          .toLocaleDateString("en-GB")
          .split("/")
          .join("-"), // Format date to DD-MM-YYYY
      });
    });

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Return the Excel file as a response
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Disposition": 'attachment; filename="student-list.xlsx"',
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Error exporting students:", error);
    return NextResponse.json(
      { error: "Failed to export students" },
      { status: 500 },
    );
  }
}
