"use client";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  id: string;
  name: string;
}

export default function CourseCard({ id, name }: CourseCardProps) {
  const router = useRouter();

  return (
    <div
      className="card cursor-pointer bg-base-100 shadow-xl transition-all hover:shadow-2xl"
      onClick={() =>
        router.push(`dCourse/courses/${id}`)
      }
    >
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
      </div>
    </div>
  );
}
