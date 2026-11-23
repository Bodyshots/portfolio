import { useQuery } from "@tanstack/react-query";
import { motion, type Variants } from "framer-motion";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { AnimationConstants } from "@/constants/animation";
import { ProjectConstants } from "@/constants/project";
import LoadingSkeleton from "@/features/global/Skeletons/LoadingSkeleton";
import { getProjectCoverUrl } from "@/lib/images";
import { cn, displayCardDescription } from "@/lib/utils";
import { createProjectCoverImagesOptions } from "@/tanstack/queryFns/images";
import { createProjectToolsOptions } from "@/tanstack/queryFns/tools";
import type { Project, ProjectTool } from "@/types";
import Tool from "../../global/Tool";

/* Most Card CSS from: https://www.youtube.com/watch?v=FLt2TveqHQM */

const EASING = AnimationConstants.EASING;

interface ProjectCardProps {
  item: Project;
  open: (name: string) => void;
  className?: string;
}

interface CardImageProps {
  img: string | null;
  isPending: boolean;
  isError: boolean;
}

interface CardToolsProps {
  tools: ProjectTool[] | null;
  isPending: boolean;
  isError: boolean;
}

const cardAnimation: Variants = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  whileInView: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASING,
    },
  },
};

const CardImage = ({ img, isPending, isError }: CardImageProps) => {
  if (isPending) {
    return (
      <LoadingSkeleton
        width="100%"
        containerClassName="flex h-50.25 w-full max-md:h-40"
        className="block h-50.25 w-full rounded-t-3xl max-md:h-40"
        enableAnimation
      />
    );
  }
  if (isError) {
    return (
      <MdOutlineImageNotSupported
        aria-label={`Cover image unavailable`}
        className="flex h-56.25 w-full items-center justify-center rounded-t-3xl bg-secondary text-4xl text-muted max-md:h-40"
      />
    );
  }

  return (
    <div className="relative h-50.25 w-full max-md:h-40">
      <img
        className="h-50.25 w-full rounded-t-3xl bg-transparent object-contain max-md:h-40"
        src={img ?? undefined}
        alt={"Card cover"}
      />
    </div>
  );
};

const CardTools = ({ tools, isPending, isError }: CardToolsProps) => {
  const cardTools = ProjectConstants.CARD.TOOLS;

  if (isPending) {
    return (
      <LoadingSkeleton
        count={cardTools.MAX}
        width="5rem"
        height="1.5rem"
        containerClassName="flex min-w-0 flex-wrap gap-2 [&>br]:hidden"
        className="block rounded-full!"
        enableAnimation
      />
    );
  }

  if (isError) {
    return (
      <div className="flex w-full min-w-0 flex-row flex-wrap gap-2">
        <span
          className="min-w-0 wrap-break-word text-sm text-card-foreground"
          role="alert"
        >
          Failed to load tools
        </span>
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-row flex-wrap gap-2">
      {(tools ?? []).slice(cardTools.MIN, cardTools.MAX).map((tool) => (
        <Tool
          key={tool.tool}
          tool={tool.tool}
          className="min-w-0 max-w-full wrap-break-word"
        />
      ))}
    </div>
  );
};

function ProjectCard({ item, open, className }: ProjectCardProps) {
  const cardConstants = ProjectConstants.CARD;
  const SHORT_DESC = item.short_desc ?? "No short description available";
  const SHORT_DESC_LIMIT = cardConstants.SHORT_DESC_LIMIT;

  const NAME = item.name;
  const {
    data: images,
    isPending: isCoverPending,
    isError: isCoverError,
  } = useQuery({
    ...createProjectCoverImagesOptions(item.name),
    enabled: Boolean(item.name),
  });
  const {
    data: tools,
    isPending: toolsPending,
    isError: toolsError,
  } = useQuery({
    ...createProjectToolsOptions(item.name),
    enabled: Boolean(item.name),
  });

  const COVER_URL = images ? getProjectCoverUrl(images) : null;
  const showCoverError = isCoverError || (!isCoverPending && !COVER_URL);

  return (
    <motion.div
      className="flex w-full justify-center"
      variants={cardAnimation}
      initial="hidden"
      whileInView="whileInView"
      viewport={{ once: true }}
    >
      <button
        className={cn(
          "group relative m-2 flex h-auto w-11/12 min-w-0 max-w-full flex-col justify-start overflow-hidden rounded-3xl border-2 border-primary bg-linear-to-br from-secondary to-primary text-left text-foreground transition-all duration-100 hover:-translate-y-1 hover:scale-[1.025] hover:border-foreground hover:bg-linear-to-bl hover:from-primary hover:to-secondary max-md:mx-1 max-md:my-4 hover:cursor-pointer",
          className,
        )}
        key={item.id}
        onClick={() => open(item.name)}
        type="button"
      >
        <div className="relative flex min-h-56.25 w-full min-w-0 flex-col items-stretch max-md:min-h-40">
          <CardImage
            img={COVER_URL}
            isPending={isCoverPending}
            isError={showCoverError}
          />
          <div className="flex min-w-0 flex-col px-5 mt-2 mb-10 gap-2">
            <div className="flex min-w-0 flex-col">
              <p className="mt-2 wrap-break-word text-left text-xl text-foreground max-md:text-base">
                {NAME}
              </p>
              <p className="wrap-break-word text-left text-card-foreground max-md:text-base">
                {displayCardDescription(SHORT_DESC, SHORT_DESC_LIMIT)}
              </p>
            </div>
            <CardTools
              tools={tools ?? null}
              isPending={toolsPending}
              isError={toolsError}
            />
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export default ProjectCard;
