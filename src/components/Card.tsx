export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>;
  }
  
  export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-4 border-b ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-4 ${className}`}>{children}</div>;
  }
  