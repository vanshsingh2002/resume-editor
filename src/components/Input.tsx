export function Input({
    type = "text",
    placeholder,
    value,
    onChange,
    className = "",
  }: {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
  }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-2 text-black border rounded-md ${className}`}
      />
    );
  }
  