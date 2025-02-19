"use client";
import { useRouter } from "next/navigation";

interface ChapterCardProps {
  courseId: string;
  id: string;
  name: string;
}

export default function ChapterCard({ courseId, id, name }: ChapterCardProps) {
  const router = useRouter();

  return (
    <div
      className="card cursor-pointer bg-base-100 shadow-xl transition-all hover:shadow-2xl"
      onClick={() => router.push(`${courseId}/${id}`)}
    >
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
      </div>
    </div>
  );
}
