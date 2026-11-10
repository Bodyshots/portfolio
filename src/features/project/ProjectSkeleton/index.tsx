import LoadingSkeleton from "@/features/global/Skeletons/LoadingSkeleton";
import LoadingSpinner from "@/features/global/Skeletons/LoadingSpinner";

const ProjectSkeleton = () => {
  return (
    <>
      {" "}
      <div className="max-w-6xl px-4 py-8 pb-0 pt-4 mx-auto">
        <LoadingSkeleton height="3em" width="24em" className="mt-8" />
        <div className="my-8">
          <LoadingSkeleton
            height="1.3em"
            width={"30em"}
            containerClassName="text-lg lg:text-xl"
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
      <div className="max-w-6xl mx-auto px-8 py-8 pt-0">
        <LoadingSkeleton className="aspect-video my-7 mt-0 rounded-lg!" />
        <div className="my-8 mt-2">
          <h2 className="mb-6 text-secondary-foreground py-0 text-3xl">
            About This Project
          </h2>
          <p
            className={`px-8 text-lg leading-relaxed text-muted-foreground m-0`}
          >
            <LoadingSkeleton width="52.5em" count={4} />
          </p>
        </div>
        <div className="my-6">
          <h2 className="text-3xl mb-4 text-secondary-foreground">
            Tools & Technologies
          </h2>
          <LoadingSkeleton
            count={4}
            containerClassName="flex flex-row flex-1 justify-center gap-3"
            className="mb-2 rounded-full! h-[1.5em] max-w-[10em]"
          />
        </div>
        <div className="mb-12">
          <h2 className="text-3xl text-secondary-foreground my-8">
            Project Gallery
          </h2>
          <LoadingSkeleton
            count={4}
            containerClassName="mt-4 grid w-full grid-cols-2 gap-6 [&>br]:hidden"
            className="h-64 w-full"
          />
        </div>
      </div>
    </>
  );
};

export default ProjectSkeleton;
