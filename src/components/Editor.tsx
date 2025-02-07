import { useState } from "react";

export function Editor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [content, setContent] = useState(value);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML);
    onChange(e.currentTarget.innerHTML);
  };

  return (
    <div
      contentEditable
      dangerouslySetInnerHTML={{ __html: content }}
      onInput={handleInput}
      className="w-full p-2 border rounded-md min-h-[100px] outline-none"
    />
  );
}
