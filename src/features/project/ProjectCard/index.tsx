import { MdOutlineImageNotSupported } from "react-icons/md";
import { ProjectConstants } from "@/constants/project";
import { cn, displayDescription } from "@/lib/utils";
import type { Project } from "@/types";
import ProjectTool from "../ProjectTools/ProjectTool";

/* Most Card CSS from: https://www.youtube.com/watch?v=FLt2TveqHQM */

interface ProjectCardProps {
  item: Project;
  open: (name: string) => void;
  className?: string;
}

const CardTools = ({ tools }: { tools: string[] | null }) => {
  const cardTools = ProjectConstants.CARD.TOOLS;

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {(tools ?? []).slice(cardTools.MIN, cardTools.MAX).map((tool) => (
        <ProjectTool key={tool} tool={tool} />
      ))}
    </div>
  );
};

function ProjectCard({ item, open, className }: ProjectCardProps) {
  const cardConstants = ProjectConstants.CARD;
  const SHORT_DESC = item.short_desc ?? "No short description available";
  const SHORT_DESC_LIMIT = cardConstants.SHORT_DESC_LIMIT;

  const NAME = item.name;
  const COVER_URL = item.cover_img;

  return (
    <button
      className={cn(
        "group relative w-11/12 h-16/17 m-2 flex flex-col justify-start overflow-hidden rounded-3xl border-2 border-primary bg-linear-to-br from-secondary to-primary text-left text-foreground shadow-[0_4px_24px_0_color-mix(in_srgb,var(--color-foreground)_10%,transparent)] transition-all duration-100 hover:-translate-y-1 hover:scale-[1.025] hover:border-foreground hover:bg-linear-to-bl hover:from-primary hover:to-secondary max-md:mx-1 max-md:my-4 hover:cursor-pointer max-h-90",
        className,
      )}
      key={item.id}
      onClick={() => open(item.name)}
      type="button"
    >
      <div className="relative flex min-h-56.25 w-full flex-col items-stretch">
        {COVER_URL ? (
          <img
            className="h-50.25 w-full rounded-t-3xl bg-transparent object-contain max-md:h-40"
            src={COVER_URL}
            alt={NAME}
          />
        ) : (
          <MdOutlineImageNotSupported className="flex h-56.25 w-full items-center justify-center rounded-t-3xl bg-secondary text-4xl text-muted max-md:h-40" />
        )}
        <div className="flex flex-col px-5 mt-2 mb-10 gap-2">
          <div className="flex flex-col">
            <p className="text-xl text-left text-foreground max-md:text-md mt-2">
              {NAME}
            </p>
            <p className="text-left text-base text-accent max-md:text-md">
              {displayDescription(SHORT_DESC, SHORT_DESC_LIMIT)}
            </p>
          </div>
          <CardTools tools={item.tools} />
        </div>
      </div>
    </button>
  );
}

export default ProjectCard;
