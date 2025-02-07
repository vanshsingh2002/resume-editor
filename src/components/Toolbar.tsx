"use client";
import { List, Bold, Italic, Underline, ListOrdered } from "lucide-react";
import { Editor } from "@tiptap/react";
import Toggle from "./Toggle"; // Ensure the correct import path

export default function ToolBar({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const Options = [
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Underline className="size-4" />, // Added underline button
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      pressed: editor.isActive("underline"),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
  ];

  return (
    <div className="border rounded-md p-2 mb-2 bg-gray-100 space-x-2 sticky top-10 z-50 shadow-sm">
      {Options.map((option, i) => (
        <Toggle key={i} size="sm" pressed={option.pressed} onPressedChange={option.onClick}>
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}
