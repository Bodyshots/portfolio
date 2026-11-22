import LoadingSkeleton from "../LoadingSkeleton";

const LoadingVideo = () => {
  return (
    <div className="my-8 w-full min-w-0">
      <LoadingSkeleton
        height="1.3em"
        width="100%"
        className="block max-w-[30em]"
        containerClassName="block w-full min-w-0 text-lg lg:text-xl"
      />
    </div>
  );
};

export default LoadingVideo;
