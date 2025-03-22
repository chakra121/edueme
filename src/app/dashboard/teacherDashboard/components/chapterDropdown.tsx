interface Chapter {
  id: string;
  chapterName: string;
  classes: { id: string }[];
}

export default function ChapterDropdown({
  chapters,
  onSelect,
}: {
  chapters: Chapter[];
  onSelect: (id: string) => void;
}) {
  return (
    <select
      className="select mb-4 select-bordered w-full"
      onChange={(e) => onSelect(e.target.value)}
      defaultValue=""
    >
      <option value="" disabled>
        Select a Chapter
      </option>
      {chapters.map((ch) => (
        <option key={ch.id} value={ch.id}>
          {ch.chapterName} (
          {ch.classes.length === 1
            ? `${ch.classes.length} class`
            : `${ch.classes.length} classes`}
          )
        </option>
      ))}
    </select>
  );
}
