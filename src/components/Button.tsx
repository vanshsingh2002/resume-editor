export function Button({
  children,
  onClick,
  variant = "default",
  size = "md",
  className = "",
  disabled = false,
  title = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
  title?: string;
}) {
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
    icon: "p-2",
  };

  return (
    <button
      className={`rounded-md transition ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}
