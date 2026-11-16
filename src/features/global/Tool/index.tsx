import { cn } from "@/lib/utils";

interface ToolProps {
  tool: string;
  className?: string;
}

const Tool = ({ tool, className }: ToolProps) => {
  return (
    <span
      className={cn(
        "mb-2 rounded-full border border-accent/25 bg-secondary px-3 py-1 text-sm text-foreground shadow-[1px_1px_1px_color-mix(in_srgb,var(--foreground)_12%,transparent)] transition-all duration-100",
        className,
      )}
    >
      {tool}
    </span>
  );
};

export default Tool;
