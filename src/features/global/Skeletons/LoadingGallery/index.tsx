import LoadingSkeleton from "../LoadingSkeleton";

const LoadingGallery = () => {
  return (
    <div className="mt-4 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
      <LoadingSkeleton
        count={4}
        width="100%"
        className="block h-64 max-w-full rounded-lg!"
        containerClassName="contents [&>br]:hidden"
      />
    </div>
  );
};

export default LoadingGallery;
