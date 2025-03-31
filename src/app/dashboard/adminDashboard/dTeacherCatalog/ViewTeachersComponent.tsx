import type { Teacher } from "./TeacherTypes";

interface ViewTeachersComponentProps {
  teachers: Teacher[];
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export default function ViewTeachersComponent({
  teachers,
  total,
  loading,
  onRefresh,
}: ViewTeachersComponentProps) {
  return (
    <div className="card">
      <h2 className="card-title mb-4 text-2xl font-bold">View Teachers</h2>
      <div className="">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Total Teachers: {total}</h2>
          <button
            className="btn btn-primary"
            onClick={onRefresh}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Refreshing...
              </>
            ) : (
              "Refresh"
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        ) : teachers.length === 0 ? (
          <div className="alert alert-info">No teachers available.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>EmployeeID</th>
                  <th>Course</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={teacher.email || index} className="hover">
                    <td>{index + 1}</td>
                    <td>{teacher.teacherName}</td>
                    <td>{teacher.phoneNumber}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.employeeID}</td>
                    <td>
                      {teacher.course?.courseName || "No course assigned"}
                    </td>
                    <td>{new Date(teacher.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
