export function Textarea({
    placeholder,
    value,
    onChange,
    className = "",
  }: {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
  }) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded-md ${className}`}
      />
    );
  }
  