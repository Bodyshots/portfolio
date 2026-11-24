import { WorkConstants } from "@/constants/work";
import { createIds } from "@/lib/utils";
import LoadingWorkBubble from "./LoadingWorkBubbleSkeleton";

const LOADING_BUBBLE_IDS = createIds(
  WorkConstants.HOME.MAX,
  "skeleton-work-bubble",
);

const LoadingWorkHistorySkeleton = () => {
  return (
    <div className="mx-auto max-w-5xl overflow-hidden p-12 ">
      <h1 className="mb-16 text-center text-5xl text-foreground">
        From latest to oldest (2023)
      </h1>
      <div className="relative">
        <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-muted" />
        {LOADING_BUBBLE_IDS.map((id, i) => (
          <LoadingWorkBubble key={id} leftAlign={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
};

export default LoadingWorkHistorySkeleton;
