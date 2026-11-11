import { ProjectConstants } from "@/constants/project";
import { cn } from "@/lib/utils";
import LoadingSkeleton from "../LoadingSkeleton";

interface LoadingProjectCardProps {
  className?: string;
}

const LoadingProjectCard = ({ className }: LoadingProjectCardProps) => {
  const toolCount = ProjectConstants.CARD.TOOLS.MAX;

  return (
    <div
      className={cn(
        "m-0 flex h-full w-full flex-col justify-start overflow-hidden rounded-3xl border-2 border-primary bg-linear-to-br from-secondary to-primary text-left shadow-[0_4px_24px_0_color-mix(in_srgb,var(--color-foreground)_10%,transparent)] max-h-87.5",
        className,
      )}
    >
      <div className="relative flex min-h-56.25 w-full flex-col">
        <LoadingSkeleton
          width="100%"
          containerClassName="flex justify-center"
          className="block h-50.25 max-md:h-40"
        />
        <div className="flex flex-col px-4 mt-2 mb-12 gap-3">
          <div className="flex flex-col">
            <LoadingSkeleton width="75%" height="1.5rem" />
            <LoadingSkeleton width="50%" height="1.25rem" className="mt-2" />
          </div>
          <div className="flex flex-wrap gap-2">
            <LoadingSkeleton
              count={toolCount}
              width="5rem"
              height="1.5rem"
              containerClassName="flex flex-wrap gap-2 [&>br]:hidden"
              className="block rounded-full!"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingProjectCard;
