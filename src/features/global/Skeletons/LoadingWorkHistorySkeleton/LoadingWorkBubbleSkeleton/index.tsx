import LoadingSkeleton from "@/features/global/Skeletons/LoadingSkeleton";

const LoadingWorkBubbleSkeleton = ({ leftAlign }: { leftAlign: boolean }) => {
  const direction = leftAlign ? "ltr" : "rtl";

  const alignment = leftAlign
    ? {
        container: "justify-start",
        content: "justify-end text-right",
        bubble: "border-primary bg-secondary",
      }
    : {
        container: "justify-end",
        content: "justify-start text-left",
        bubble: "border-secondary bg-white",
      };

  return (
    <div
      className={`relative mb-16 flex w-full items-center motion-reduce:transition-none ${alignment.container}`}
    >
      <div className={`flex w-1/2 px-8 ${alignment.content}`}>
        <div
          className={`min-h-40 w-full rounded-lg border-2 p-6 ${alignment.bubble}`}
        >
          <LoadingSkeleton
            className="mb-1 py-1 text-xl"
            width="100%"
            direction={direction}
          />
          <LoadingSkeleton
            className="mb-1 block text-lg"
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
      </div>
    </div>
  );
};

export default LoadingWorkBubbleSkeleton;
