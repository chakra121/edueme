import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import prisma from "@/lib/globalPrisma"; // Adjust the path to your Prisma client

export async function GET() {
  try {
    // Fetch all teachers
    const teachers = await prisma.teacher.findMany({
      include: {
        course: true, // Include course information
      },
    });

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Teachers");

    // Define columns
    worksheet.columns = [
      { header: "Teacher Name", key: "teacherName", width: 20 },
      { header: "Phone Number", key: "phoneNumber", width: 15 },
      { header: "Email", key: "email", width: 25 },
      { header: "Employee ID", key: "employeeID", width: 15 },
      { header: "Course", key: "course", width: 20 },
      { header: "Registration Date", key: "createdAt", width: 15 },
    ];

    // Style the header row
    worksheet.getRow(1).font = { bold: true };

    // Add rows to the worksheet
    teachers.forEach((teacher) => {
      worksheet.addRow({
        teacherName: teacher.teacherName,
        phoneNumber: teacher.phoneNumber,
        email: teacher.email,
        employeeID: teacher.employeeID,
        course: teacher.course ? teacher.course.courseName : "NA", // Assuming course has a name field
        createdAt: new Date(teacher.createdAt)
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
        "Content-Disposition": 'attachment; filename="teacher-list.xlsx"',
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Error exporting teachers:", error);
    return NextResponse.json(
      { error: "Failed to export teachers" },
      { status: 500 },
    );
  }
}
