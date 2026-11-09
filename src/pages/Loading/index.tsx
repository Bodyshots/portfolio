import LoadingSpinner from "@/features/global/LoadingSpinner";

function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-black/20"
      role="status"
      aria-label="Loading page"
    >
      <LoadingSpinner />
    </div>
  );
}

export default Loading;
