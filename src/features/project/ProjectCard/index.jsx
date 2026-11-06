import { MdOutlineImageNotSupported } from "react-icons/md";
import { ProjectConstants } from "@/constants/project";

/* Most Card CSS from: https://www.youtube.com/watch?v=FLt2TveqHQM */

function ProjectCard(item, open) {
  const cardConstants = ProjectConstants.CARD;
  const cardTools = cardConstants.TOOLS;
  const SHORT_DESC = item.short_desc;
  const SHORT_DESC_LIMIT = cardConstants.SHORT_DESC_LIMIT;

  const NAME = item.name;
  const COVER_URL = item.cover_img;
  const TOOLS = item.tools;

  const card_tools = () => {
    return (
      <div className="mt-2 mb-2 flex flex-wrap gap-2">
        {TOOLS.slice(cardTools.MIN, cardTools.MAX).map((tool) => (
          <div
            className="mb-2 rounded-full border border-primary! bg-secondary px-3 py-1 text-[0.85rem] text-foreground shadow-[1px_1px_1px_color-mix(in_srgb,var(--color-foreground)_12%,transparent)] transition-all duration-150 group-hover:border-foreground! group-hover:bg-foreground group-hover:text-primary"
            key={tool}
          >
            {tool}
          </div>
        ))}
      </div>
    );
  };

  return (
    <button
      className="group relative m-8 flex h-100 flex-col justify-start overflow-hidden rounded-[1.25rem] border-2 border-primary! bg-linear-to-br from-secondary to-primary text-left font-[PixelFont] text-foreground shadow-[0_4px_24px_0_color-mix(in_srgb,var(--color-foreground)_10%,transparent)] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.025] hover:border-foreground! hover:bg-linear-to-bl hover:from-primary hover:to-secondary max-[1278px]:h-auto max-[700px]:mx-[0.2em] max-[700px]:my-[1em]"
      key={item.id}
      onClick={() => open(item.name)}
      data-aos="fade-right"
      type="button"
    >
      <div className="relative flex min-h-56.25 w-full flex-col items-stretch">
        {COVER_URL ? (
          <img
            className="h-56.25 w-full rounded-t-[1.25rem] bg-transparent object-contain max-[700px]:h-40"
            src={COVER_URL}
            alt={NAME}
          />
        ) : (
          <MdOutlineImageNotSupported className="flex h-56.25 w-full items-center justify-center rounded-t-[1.25rem] bg-secondary text-[2.5em] text-muted max-[700px]:h-40" />
        )}
        <div className="bg-none px-[1.2em] pt-[0.5em] pb-[0.2em]">
          <p className="m-0 text-[1.25rem] font-extralight leading-[1.2] tracking-[0.01em] text-left text-foreground max-[700px]:text-[1.05rem]">
            {NAME}
          </p>
        </div>
        <p className="mx-[1.2em] my-[0.5em] min-h-[2.5em] text-left text-base leading-[1.4] text-accent max-[700px]:text-[0.95rem]">
          {SHORT_DESC.length > SHORT_DESC_LIMIT
            ? `${SHORT_DESC.substring(0, SHORT_DESC_LIMIT)}...`
            : SHORT_DESC.length === 0
              ? "No short description"
              : SHORT_DESC}
        </p>
      </div>
      <span className="ml-[1.2em] flex flex-col">{card_tools()}</span>
    </button>
  );
}

export default ProjectCard;
