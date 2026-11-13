import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProjectSectionProps {
  title: string;
  wrapperClassName?: string;
  textClassName?: string;
  children: ReactNode;
}

const ProjectSection = ({
  title,
  wrapperClassName,
  textClassName,
  children,
}: ProjectSectionProps) => {
  return (
    <div className={cn("my-6", wrapperClassName)}>
      <h2
        className={cn("text-3xl mb-4 text-secondary-foreground", textClassName)}
      >
        {title}
      </h2>
      {children}
    </div>
  );
};

export default ProjectSection;
