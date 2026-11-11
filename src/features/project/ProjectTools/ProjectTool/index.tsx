import { cn } from "@/lib/utils";

interface ProjectToolProps {
  tool: string;
  className?: string;
}

const ProjectTool = ({ tool, className }: ProjectToolProps) => {
  return (
    <span
      className={cn(
        "mb-2 rounded-full border border-accent/25 bg-secondary px-3 py-1 text-sm text-foreground shadow-[1px_1px_1px_color-mix(in_srgb,var(--color-foreground)_12%,transparent)] transition-all duration-100 group-hover:border-foreground group-hover:bg-foreground group-hover:text-primary",
        className,
      )}
    >
      {tool}
    </span>
  );
};

export default ProjectTool;
