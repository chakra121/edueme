interface Course {
  id: string;
  courseName: string;
  courseCode: string;
  chapters: {
    id: string;
    chapterName: string;
    isCompleted: boolean;
    classes: { id: string; classTitle: string; youTubeLink: string }[];
  }[];
}

interface Props {
  course: Course;
  onAddClass: () => void;
  onUpdateChapter: () => void;
  onUpdateClass: () => void; // ✅ Added
  onDeleteClass: () => void; // ✅ Added
}

const CourseCard: React.FC<Props> = ({
  course,
  onAddClass,
  onUpdateChapter,
  onUpdateClass,
  onDeleteClass,
}) => {
  return (
    <div className="card border-2 bg-base-100 text-base-content hover:shadow-md">
      <div className="card-body">
        <h2 className="mb-4 text-2xl font-semibold">{course.courseName}</h2>
        <p className="mb-4 text-gray-600">Course Code: {course.courseCode}</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button className="btn btn-primary" onClick={onAddClass}>
            Add Class
          </button>

          <button className="btn btn-secondary" onClick={onUpdateClass}>
            Update Class
          </button>

          <button className="btn btn-error" onClick={onDeleteClass}>
            Delete Class
          </button>

          <button className="btn btn-outline" onClick={onUpdateChapter}>
            Update Chapter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
