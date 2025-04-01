import DownloadStudents from "./DownloadStudents";
import DownloadTeachers from "./DownloadTeachers";

export default function AdminDashboard() {
  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h1 className="card-title text-3xl font-bold mb-5">Download the Students and Teachers Data</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DownloadStudents />
          <DownloadTeachers />
        </div>
      
    </div>
  );
}
