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
        className={cn(
          "mb-4 wrap-break-word text-2xl text-foreground",
          textClassName,
        )}
      >
        {title}
      </h2>
      {children}
    </div>
  );
};

export default ProjectSection;
