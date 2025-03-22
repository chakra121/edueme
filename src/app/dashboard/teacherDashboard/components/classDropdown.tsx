interface ClassDropdownProps {
  classes: { id: string; classTitle: string }[];
  selectedClassId: string | null;
  setSelectedClassId: (id: string) => void;
}

const ClassDropdown: React.FC<ClassDropdownProps> = ({
  classes,
  selectedClassId,
  setSelectedClassId,
}) => {
  return (
    <select
      className="select select-bordered w-full"
      defaultValue=""
      onChange={(e) => setSelectedClassId(e.target.value)}
    >
      <option value="" disabled>
        Select a class
      </option>
      {classes.map((cls) => (
        <option key={cls.id} value={cls.id}>
          {cls.classTitle}
        </option>
      ))}
    </select>
  );
};

export default ClassDropdown;
