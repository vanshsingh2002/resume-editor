export function Checkbox({
    checked,
    onCheckedChange,
    children,
  }: {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    children: React.ReactNode;
  }) {
    return (
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-black">{children}</span>
      </label>
    );
  }
  