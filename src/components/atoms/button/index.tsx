import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
};

export function Button({ children, className, showIcon = false }: ButtonProps) {
  return (
    <button className={cn("button learn-more", className)}>
      {showIcon && (
        <span className="circle" aria-hidden="true">
          <span className="icon arrow"></span>
        </span>
      )}
      <span className="button-text">{children}</span>
    </button>
  );
}
