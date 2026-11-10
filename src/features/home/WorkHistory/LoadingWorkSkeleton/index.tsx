import LoadingSkeleton from "@/features/global/Skeletons/LoadingSkeleton";
import HistoryCircle from "../HistoryCircle";

interface LoadingWorkSkeletonProps {
  leftAlign?: boolean;
}

const LoadingWorkSkeleton = ({ leftAlign }: LoadingWorkSkeletonProps) => {
  return (
    <div
      className={`relative mb-16 flex w-full items-center ${
        leftAlign ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex w-1/2 px-8 ${
          leftAlign ? "justify-end text-right" : "justify-start text-left"
        }`}
      >
        <div
          className={`min-h-40 w-full rounded-lg border-2 p-6 ${
            leftAlign
              ? "border-primary bg-secondary"
              : "border-secondary bg-card"
          }`}
        >
          <LoadingSkeleton
            className="mb-1 text-xl block py-1.25"
            width="100%"
          />
          <LoadingSkeleton
            className="mb-1 text-lg block"
            height="1.5rem"
            width="65%"
          />
          <LoadingSkeleton
            className="mb-3 text-base"
            height="1.5rem"
            width="85%"
          />
          <LoadingSkeleton height="3rem" width="90%" />
        </div>
      </div>
      <HistoryCircle />
    </div>
  );
};

export default LoadingWorkSkeleton;
