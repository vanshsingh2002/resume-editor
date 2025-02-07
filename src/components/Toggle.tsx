"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

interface ToggleProps {
  pressed: boolean;
  onPressedChange: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function Toggle({ pressed, onPressedChange, children, size = "md" }: ToggleProps) {
  const [isPressed, setIsPressed] = useState(pressed);

  const handleClick = () => {
    setIsPressed(!isPressed);
    onPressedChange();
  };

  return (
    <Button
      className={`rounded-md ${isPressed ? "bg-gray-300" : "bg-transparent"} p-1`}
      size={size}
      onClick={handleClick}
      variant="ghost"
    >
      {children}
    </Button>
  );
}
