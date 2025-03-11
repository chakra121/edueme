export const updateTeacherAssignment = async (
  studentId: string,
  teacherId: string,
) => {
  const response = await fetch("/api/admin/assign-teacher", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studentId, teacherId }),
  });

  if (!response.ok) {
    throw new Error("Failed to update teacher assignment");
  }

  return response.json();
};
