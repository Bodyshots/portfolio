import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  containerClassName?: string;
  width?: string | number;
  height?: string | number;
  count?: number;
  enableAnimation?: boolean;
  circle?: boolean;
  direction?: "ltr" | "rtl";
}

const LoadingSkeleton = ({
  className,
  containerClassName,
  width,
  height,
  enableAnimation,
  count,
  circle,
  direction,
}: LoadingSkeletonProps) => {
  return (
    <Skeleton
      baseColor="var(--accent)"
      highlightColor="var(--secondary-foreground)"
      className={cn("inline leading-relaxed", className)}
      containerClassName={containerClassName}
      width={width}
      height={height}
      enableAnimation={enableAnimation}
      count={count}
      circle={circle}
      direction={direction}
    />
  );
};

export default LoadingSkeleton;
