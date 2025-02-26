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
      className="select select-bordered mb-4 w-full"
      onChange={(e) => onSelect(e.target.value)}
      defaultValue=""
    >
      <option value="" disabled>
        Select Chapter
      </option>
      {chapters.map((ch) => (
        <option key={ch.id} value={ch.id}>
          {ch.chapterName} ({ch.classes.length} classes)
        </option>
      ))}
    </select>
  );
}
