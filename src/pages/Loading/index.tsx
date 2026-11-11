import LoadingSpinner from "@/features/global/Skeletons/LoadingSpinner";

function Loading() {
  return (
    <>
      <title>Loading...</title>
      <main
        className="flex min-h-screen items-center justify-center bg-black/20"
        role="status"
        aria-label="Loading page"
      >
        <LoadingSpinner />
      </main>
    </>
  );
}

export default Loading;
