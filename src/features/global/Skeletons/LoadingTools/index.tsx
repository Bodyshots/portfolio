import { cn } from "@/lib/utils";
import LoadingSkeleton from "../LoadingSkeleton";

interface LoadingToolsProps {
  count?: number;
  width?: string;
  className?: string;
  containerClassName?: string;
}

const LoadingTools = ({
  count = 4,
  width = "10em",
  className,
  containerClassName,
}: LoadingToolsProps) => {
  return (
    <LoadingSkeleton
      count={count}
      width={width}
      className={cn(className, "mb-2 h-[1.5em] max-w-full rounded-full!")}
      containerClassName={cn(
        containerClassName,
        "flex min-w-0 flex-wrap justify-center gap-3 [&>br]:hidden",
      )}
    />
  );
};

export default LoadingTools;
