import { RingLoader } from "react-spinners";

function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-accent-light-beige"
      role="status"
      aria-label="Loading page"
    >
      <RingLoader
        color="currentColor"
        cssOverride={{ color: "var(--color-secondary-foreground)" }}
      />
    </div>
  );
}

export default Loading;
