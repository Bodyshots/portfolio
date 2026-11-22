import LoadingGallery from "@/features/global/Skeletons/LoadingGallery";
import LoadingSkeleton from "@/features/global/Skeletons/LoadingSkeleton";
import LoadingSpinner from "@/features/global/Skeletons/LoadingSpinner";
import LoadingVideo from "@/features/global/Skeletons/LoadingVideo";

const ProjectSkeleton = () => {
  return (
    <>
      {" "}
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-8 pb-0 pt-4 max-xs:px-2">
        <LoadingSkeleton
          height="3em"
          width="100%"
          className="mt-8 block max-w-[24em]"
        />
        <LoadingVideo />
        <button
          className="my-8 mt-0 inline-flex w-full max-w-47 min-w-0 flex-wrap items-center justify-center gap-2 rounded-lg bg-muted p-2 font-medium text-secondary-foreground opacity-70 max-xs:text-sm"
          type="button"
          disabled
          aria-disabled="true"
        >
          <LoadingSpinner color="var(--secondary-foreground)" size={20} />
          <span>Loading...</span>
        </button>
      </div>
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-8 pt-0 sm:px-8 max-xs:px-2">
        <LoadingSkeleton className="my-6 mt-0 block aspect-video w-full max-w-full rounded-lg!" />
        <div className="my-8 mt-2 min-w-0">
          <h2 className="mb-6 wrap-break-word py-0 text-3xl text-foreground max-xs:text-xl">
            About This Project
          </h2>
          <p className="m-0 min-w-0 wrap-break-word px-2 text-lg leading-relaxed text-muted-foreground max-xs:px-1 max-xs:text-base sm:px-8">
            <LoadingSkeleton
              width="100%"
              count={4}
              className="block max-w-full"
              containerClassName="block w-full min-w-0"
            />
          </p>
        </div>
        <div className="my-6 min-w-0">
          <h2 className="mb-4 wrap-break-word text-3xl text-foreground max-xs:text-xl">
            Tools & Technologies
          </h2>
          <LoadingSkeleton
            count={4}
            width="10em"
            className="mb-2 h-[1.5em] max-w-full rounded-full!"
            containerClassName="flex min-w-0 flex-wrap justify-center gap-3 [&>br]:hidden"
          />
        </div>
        <div className="mb-12">
          <h2 className="my-8 wrap-break-word text-3xl text-foreground max-xs:text-xl">
            Project Gallery
          </h2>
          <LoadingGallery />
        </div>
      </div>
    </>
  );
};

export default ProjectSkeleton;
