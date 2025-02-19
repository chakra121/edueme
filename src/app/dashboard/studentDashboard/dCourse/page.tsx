import CourseCard from "../components/CourseCard";

const courses = [
  { id: "course-1", name: "React Basics" },
  { id: "course-2", name: "Next.js Advanced" },
];

export default function CoursesPage() {
  return (
    <div className="p-6 card bg-base-100">
      <h1 className="text-3xl font-bold card-title text-base-content">Enrolled Courses</h1>
      <div className="mt-4 space-y-4">
        {courses.map((course) => (
          <CourseCard key={course.id} id={course.id} name={course.name} />
        ))}
      </div>
    </div>
  );
}
