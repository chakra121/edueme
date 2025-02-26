"use client";

interface Course {
  id: string;
  courseName: string;
  courseCode: string;
  chapters: {
    id: string;
    chapterName: string;
    isCompleted: boolean;
    classes: { id: string }[];
  }[];
}

export default function CourseCard({
  course,
  onAddClass,
  onUpdateChapter,
}: {
  course: Course;
  onAddClass: () => void;
  onUpdateChapter: () => void;
}) {
  return (
    <div className="card mb-4 max-w-xl border-2 bg-base-100 shadow-md transition duration-700 ease-in-out hover:scale-105 hover:shadow-xl">
      <div className="card-body">
        <h2 className="card-title mb-2 text-xl">{course.courseName}</h2>
        <p className="text-lg">{course.courseCode}</p>

        <div className="card-actions mt-4 flex justify-end space-x-3">
          <button className="btn btn-primary" onClick={onAddClass}>
            Add Class
          </button>
          <button className="btn btn-secondary" onClick={onUpdateChapter}>
            Update Chapter
          </button>
        </div>
      </div>
    </div>
  );
}
