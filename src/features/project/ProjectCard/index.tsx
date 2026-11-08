import { MdOutlineImageNotSupported } from "react-icons/md";
import { ProjectConstants } from "@/constants/project";
import { displayDescription } from "@/lib/utils";
import type { Project } from "@/types";

/* Most Card CSS from: https://www.youtube.com/watch?v=FLt2TveqHQM */

interface ProjectCardProps {
  item: Project;
  open: (id: number, name: string) => void;
}

const CardTool = ({ tool }: { tool: string }) => {
  return (
    <div
      className="mb-2 rounded-full border border-primary bg-secondary px-3 py-1 text-sm text-foreground shadow-[1px_1px_1px_color-mix(in_srgb,var(--color-foreground)_12%,transparent)] transition-all duration-150 group-hover:border-foreground group-hover:bg-foreground group-hover:text-primary"
      key={tool}
    >
      {tool}
    </div>
  );
};

const CardTools = ({ tools }: { tools: string[] | null }) => {
  const cardTools = ProjectConstants.CARD.TOOLS;

  return (
    <div className="flex flex-row mt-2 mb-2 mx-5 flex-wrap gap-2">
      {(tools ?? []).slice(cardTools.MIN, cardTools.MAX).map((tool) => (
        <CardTool key={tool} tool={tool} />
      ))}
    </div>
  );
};

function ProjectCard({ item, open }: ProjectCardProps) {
  const cardConstants = ProjectConstants.CARD;
  const SHORT_DESC = item.short_desc ?? "No short description available";
  const SHORT_DESC_LIMIT = cardConstants.SHORT_DESC_LIMIT;

  const NAME = item.name;
  const COVER_URL = item.cover_img;

  return (
    <button
      className="group relative m-8 flex h-100 flex-col justify-start overflow-hidden rounded-3xl border-2 border-primary bg-linear-to-br from-secondary to-primary text-left text-foreground shadow-[0_4px_24px_0_color-mix(in_srgb,var(--color-foreground)_10%,transparent)] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.025] hover:border-foreground hover:bg-linear-to-bl hover:from-primary hover:to-secondary max-xl:h-auto max-md:mx-1 max-md:my-4"
      key={item.id}
      onClick={() => open(item.id, item.name)}
      data-aos="fade-right"
      type="button"
    >
      <div className="relative flex min-h-56.25 w-full flex-col items-stretch">
        {COVER_URL ? (
          <img
            className="h-56.25 w-full rounded-t-3xl bg-transparent object-contain max-md:h-40"
            src={COVER_URL}
            alt={NAME}
          />
        ) : (
          <MdOutlineImageNotSupported className="flex h-56.25 w-full items-center justify-center rounded-t-3xl bg-secondary text-4xl text-muted max-md:h-40" />
        )}
        <p className="bg-none px-5 pt-4 pb-1 m-0 text-xl font-extralight leading-[1.2] tracking-[0.01em] text-left text-foreground max-md:text-md">
          {NAME}
        </p>
        <p className="mx-5 my-2 min-h-10 text-left text-base leading-[1.4] text-accent max-md:text-md">
          {displayDescription(SHORT_DESC, SHORT_DESC_LIMIT)}
        </p>
      </div>
      <CardTools tools={item.tools} />
    </button>
  );
}

export default ProjectCard;
