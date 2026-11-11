import LoadingSkeleton from "@/features/global/Skeletons/LoadingSkeleton";
import LoadingSpinner from "@/features/global/Skeletons/LoadingSpinner";

const ProjectSkeleton = () => {
  return (
    <>
      {" "}
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-8 pb-0 pt-4">
        <LoadingSkeleton
          height="3em"
          width="100%"
          className="mt-8 block max-w-[24em]"
        />
        <div className="my-8 w-full min-w-0">
          <LoadingSkeleton
            height="1.3em"
            width="100%"
            className="block max-w-[30em]"
            containerClassName="block w-full min-w-0 text-lg lg:text-xl"
          />
        </div>
        <button
          className="inline-flex items-center justify-center gap-4 rounded-lg p-4 py-2 font-medium no-underline min-w-10 my-8 mt-0 cursor-not-allowed bg-muted text-muted-foreground opacity-70 w-47"
          type="button"
          disabled
          aria-disabled="true"
        >
          <LoadingSpinner color="var(--muted-foreground)" size={10} />
          <span>Loading...</span>
        </button>
      </div>
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-8 pt-0 sm:px-8">
        <LoadingSkeleton className="my-6 mt-0 block aspect-video w-full max-w-full rounded-lg!" />
        <div className="my-8 mt-2 min-w-0">
          <h2 className="mb-6 text-secondary-foreground py-0 text-3xl">
            About This Project
          </h2>
          <p className="m-0 min-w-0 px-2 text-lg leading-relaxed text-muted-foreground sm:px-8">
            <LoadingSkeleton
              width="100%"
              count={4}
              className="block max-w-full"
              containerClassName="block w-full min-w-0"
            />
          </p>
        </div>
        <div className="my-6 min-w-0">
          <h2 className="text-3xl mb-4 text-secondary-foreground">
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
          <h2 className="text-3xl text-secondary-foreground my-8">
            Project Gallery
          </h2>
          <div className="mt-4 grid min-w-0 grid-cols-2 gap-3 sm:gap-6">
            <LoadingSkeleton
              count={4}
              width="100%"
              className="block h-64 max-w-full rounded-lg!"
              containerClassName="contents [&>br]:hidden"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectSkeleton;
