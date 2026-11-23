import LoadingSkeleton from "../LoadingSkeleton";

const LoadingTools = () => {
  return (
    <LoadingSkeleton
      count={4}
      width="10em"
      className="mb-2 h-[1.5em] max-w-full rounded-full!"
      containerClassName="flex min-w-0 flex-wrap justify-center gap-3 [&>br]:hidden"
    />
  );
};

export default LoadingTools;
