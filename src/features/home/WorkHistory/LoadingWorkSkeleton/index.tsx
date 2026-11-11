import LoadingSkeleton from "@/features/global/Skeletons/LoadingSkeleton";

interface LoadingWorkSkeletonProps {
  leftAlign: boolean;
}

const LoadingWorkSkeleton = ({ leftAlign }: LoadingWorkSkeletonProps) => {
  const direction: "ltr" | "rtl" = leftAlign ? "ltr" : "rtl";
  return (
    <div
      className={`min-h-40 w-full rounded-lg border-2 p-6 ${
        leftAlign ? "border-primary bg-secondary" : "border-secondary bg-card"
      }`}
    >
      <LoadingSkeleton
        className="mb-1 text-xl py-1"
        width="100%"
        direction={direction}
      />
      <LoadingSkeleton
        className="mb-1 text-lg block"
        height="1.25rem"
        width="65%"
        direction={direction}
      />
      <LoadingSkeleton
        className="mb-3 text-base"
        height="1.25rem"
        width="85%"
        direction={direction}
      />
      <LoadingSkeleton height="3rem" width="90%" direction={direction} />
    </div>
  );
};

export default LoadingWorkSkeleton;
